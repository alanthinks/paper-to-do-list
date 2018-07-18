import React, { Component } from "react";
import "./css/main.css";

class TaskLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      taskDone: false,
      textDoneStyle: "item-text",
      checkBoxStyle: "check-box",
      taskInput: this.props.taskValue,
      taskIndex: this.props.index
    };

    this.selectedInput = React.createRef();

    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.save = this.save.bind(this);
    this.editRender = this.editRender.bind(this);
    this.initialRender = this.initialRender.bind(this);
    this.checkBox = this.checkBox.bind(this);
    this.inputBlur = this.inputBlur.bind(this);
  }

  componentDidUpdate() {
    if (this.state.taskInput) {
      let currentInput;
      if (this.state.editing) {
        currentInput = this.selectedInput.current;
        currentInput.focus();
      }
    }
  }

  edit() {
    this.setState({
      editing: true
    });
  }

  delete() {
    this.props.onDelete(this.state.taskIndex);
    this.setState({ taskInput: "" });
  }

  save(e) {
    e.preventDefault();
    this.props.onUpdate(this.state.taskInput, this.state.taskIndex);
    this.setState({
      editing: false
    });
  }

  checkBox() {
    if (this.state.taskDone) {
      this.setState({
        checkBoxStyle: "check-box",
        textDoneStyle: "item-text",
        taskDone: false,
        editing: false
      });
    } else {
      this.setState({
        checkBoxStyle: "check-box complete",
        textDoneStyle: "item-text done",
        taskDone: true,
        editing: false
      });
    }
  }

  inputBlur() {
    this.save();
  }

  editRender() {
    if (!this.state.editing) this.setState({ editing: true });
    if (this.state.taskInput) {
      return (
        <div className="item-box">
          <div className={this.state.checkBoxStyle} onClick={this.checkBox}>
            <i className="fas fa-check" />
          </div>
          <form className="item-box-edit" onSubmit={this.save}>
            <input
              ref={this.selectedInput}
              onChange={e => this.setState({ taskInput: e.target.value })}
              value={this.state.taskInput}
              onBlur={this.save}
            />
          </form>
          <div className="btn-delete" onClick={this.delete}>
            <i className="far fa-trash-alt" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="item-box">
          <form className="item-box-blank initial" onSubmit={this.save}>
            <input
              ref={this.selectedInput}
              onChange={e => this.setState({ taskInput: e.target.value })}
              value={this.state.taskInput}
            />
          </form>
        </div>
      );
    }
  }

  initialRender() {
    return (
      <div className="item-box">
        <div className={this.state.checkBoxStyle} onClick={this.checkBox}>
          <i className="fas fa-check" />
        </div>
        <div className={this.state.textDoneStyle} onClick={this.edit}>
          {this.state.taskInput}
        </div>
        <div className="btn-delete" onClick={this.delete}>
          <i className="far fa-trash-alt" />
        </div>
      </div>
    );
  }
  render() {
    return this.state.editing || !this.state.taskInput
      ? this.editRender()
      : this.initialRender();
  }
}

export default TaskLineItem;

import React, { Component } from "react";
import "./css/main.css";

class TaskLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      taskDone: false,
      textDoneStyle: "item-text",
      checkMarkStyle: "checkmark",
      taskInput: this.props.taskValue,
      taskIndex: this.props.index,
      ateCookies: false
    };

    this.selectedInput = React.createRef();

    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.save = this.save.bind(this);
    this.editRender = this.editRender.bind(this);
    this.initialRender = this.initialRender.bind(this);
    this.checkMark = this.checkMark.bind(this);
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
    this.checkMark();
  }

  save(e) {
    e.preventDefault();
    this.props.onUpdate(this.state.taskInput, this.state.taskIndex);
    this.setState({
      editing: false
    });
  }

  checkMark() {
    if (this.state.taskDone) {
      this.setState({
        checkMarkStyle: "checkmark",
        textDoneStyle: "item-text",
        taskDone: false,
        editing: false
      });
    } else {
      this.setState({
        checkMarkStyle: "checkmark complete",
        textDoneStyle: "item-text done",
        taskDone: true,
        editing: false
      });
    }
    if (
      this.state.taskInput.toLowerCase().includes("eat cookies") &&
      !this.state.ateCookies
    ) {
      this.setState({ ateCookies: true });
      this.props.eatCookies(true);
    } else if (
      this.state.taskInput.toLowerCase().includes("eat cookies") &&
      this.state.ateCookies
    ) {
      this.setState({ ateCookies: false });
      this.props.eatCookies(false);
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
          <div className={this.state.checkMarkStyle} onClick={this.checkMark}>
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
        <div className={this.state.checkMarkStyle} onClick={this.checkMark}>
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

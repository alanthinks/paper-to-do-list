import React, { Component } from "react";
import "./css/main.css";

class TaskLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      taskDone: false,
      textDoneStyle: "item-text",
      checkBoxStyle: "check-box"
    };

    this.selectedInput = React.createRef();

    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.save = this.save.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.checkBox = this.checkBox.bind(this);
  }

  componentDidUpdate() {
    let currentInput;
    if (this.state.editing) {
      currentInput = this.selectedInput.current;
      currentInput.focus();
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     this.props.children !== nextProps.children || this.state !== nextState
  //   );
  // }

  edit() {
    this.setState({
      editing: true
    });
  }

  delete() {
    this.props.onDelete(this.props.index);
  }

  save(e) {
    e.preventDefault();
    this.props.onUpdate(this._newText.value, this.props.index);
    this.setState({
      editing: false
    });
  }

  checkBox() {
    if (this.state.taskDone) {
      console.log("task now not done");
      this.setState({
        checkBoxStyle: "check-box",
        textDoneStyle: "item-text",
        taskDone: false,
        editing: false
      });
    } else {
      console.log("task now done");

      this.setState({
        checkBoxStyle: "check-box complete",
        textDoneStyle: "item-text done",
        taskDone: true,
        editing: false
      });
    }
  }

  renderEdit() {
    return (
      <div className="item-box">
        <div className={this.state.checkBoxStyle} onClick={this.checkBox}>
          <i className="fas fa-check" />
        </div>
        <form className="item-box-edit" onSubmit={this.save}>
          <input defaultValue={this.props.taskValue} ref={this.selectedInput} />
        </form>
        <div className="btn-delete" onClick={this.delete}>
          <i className="far fa-trash-alt" />
        </div>
      </div>
    );
  }

  renderItem() {
    if (this.props.taskValue) {
      return (
        <div className="item-box">
          <div className={this.state.checkBoxStyle} onClick={this.checkBox}>
            <i className="fas fa-check" />
          </div>
          <div className={this.state.textDoneStyle} onClick={this.edit}>
            {this.props.taskValue}
          </div>
          <div className="btn-delete" onClick={this.delete}>
            <i className="far fa-trash-alt" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="item-box">
          <div className={this.state.textDoneStyle} onClick={this.edit}>
            {this.props.taskValue}
          </div>
        </div>
      );
    }
  }
  render() {
    return this.state.editing ? this.renderEdit() : this.renderItem();
  }
}

export default TaskLineItem;

import React, { Component } from "react";
import "./css/main.css";

class TaskLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };

    this.btnDeleteRef = React.createRef();

    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.save = this.save.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.trashHover = this.trashHover.bind(this);
  }

  componentDidUpdate() {
    // var textArea;
    // if (this.state.editing) {
    //   textArea = this._newText;
    //   textArea.focus();
    //   textArea.select();
    // }
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

  trashHover() {
    this.btnDeleteRef.current.focus();
  }

  renderEdit() {
    return (
      <div className="item-box">
        <form className="item-box-edit" onSubmit={this.save}>
          <input defaultValue={this.props.taskValue} />
        </form>
        <div className="btn-delete" onClick={this.delete}>
          <i className="far fa-trash-alt" />
        </div>
      </div>
    );
  }

  renderItem() {
    console.log("rendering");

    return (
      <div className="item-box" onMouseOver={this.trashHover}>
        <div className={"item-text"} onClick={this.edit}>
          {this.props.taskValue}
        </div>
        <div
          ref={this.btnDeleteRef}
          className="btn-delete"
          onClick={this.delete}
        >
          <i className="far fa-trash-alt" />
        </div>
      </div>
    );
  }
  render() {
    return this.state.editing ? this.renderEdit() : this.renderItem();
  }
}

export default TaskLineItem;

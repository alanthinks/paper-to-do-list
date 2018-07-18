import React, { Component } from "react";
import "./css/main.css";
import TaskLineItem from "./TaskLineItem";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksList: [
        {
          id: 0,
          task: "Eat Cookies"
        },
        {
          id: 1,
          task: "Run"
        },
        {
          id: 2,
          task: "Make a Millie"
        },
        {
          id: 3,
          task: "Make a Billie 😎"
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ]
    };

    this.eachTaskItem = this.eachTaskItem.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
  componentDidUpdate() {}

  update(updatedTask, i) {
    console.log(updatedTask, i);
    let tasksArray = this.state.tasksList;
    tasksArray[i].task = updatedTask;
    this.setState({ tasksList: tasksArray });
  }

  // delete(i) {
  //   console.log("delete() called");
  //   console.log("state.tasks.tasksList before splice", this.state.tasksList);

  //   this.state.tasksList.splice(i, 1);
  //   this.state.tasksList.push({});
  //   this.setState({ tasksList: this.state.tasksList });
  //   console.log(
  //     "state.tasks.tasksList AFTER splice & setState",
  //     this.state.tasksList
  //   );
  // }
  delete(i) {
    console.log("delete() called");
    console.log("state.tasks.tasksList before splice", this.state.tasksList);

    let currentTaskList = this.state.tasksList;
    currentTaskList[i] = {};

    this.setState({ tasksList: currentTaskList });
    console.log(
      "state.tasks.tasksList AFTER splice & setState",
      this.state.tasksList
    );
  }

  eachTaskItem(taskObject, i) {
    return (
      <TaskLineItem
        index={i}
        key={i}
        onUpdate={this.update}
        onDelete={this.delete}
        taskValue={taskObject.task}
      />
    );
  }
  render() {
    return (
      <div className="main-bg container-flex">
        <div className="sticky-note">
          <div className="row">
            <div className="col-8">
              <p>Current Tasks:</p>
              <p>Completed:</p>
              <p>Deleted:</p>
            </div>
            <div className="col">
              <p>22</p>
              <p>3</p>
              <p>12</p>
            </div>
          </div>
        </div>
        <div className="paper-container row">
          <div className="paper-left-section col-1" />
          <div className="paper-right-section col">
            <div className="paper-top-section">
              <div className="paper-title">
                <h1>A React To-Do-List</h1>
                <h2>By @AlanThinks</h2>
              </div>
            </div>
            <div className="list-of-to-do">
              {this.state.tasksList.map(this.eachTaskItem)}
            </div>
          </div>
          <div className="paper-footer" />
        </div>
      </div>
    );
  }
}

export default App;

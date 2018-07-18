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
          task: "run"
        },
        {
          id: 1,
          task: "wash dishes"
        },
        {
          id: 2,
          task: "make a millie"
        },
        {
          id: 3,
          task: "make a billie"
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

  delete(i) {
    console.log("removing task at", i);
    this.setState(prevState => ({
      tasksList: prevState.tasksList.filter(task => task.key !== i)
    }));
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

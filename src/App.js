import React, { Component } from "react";
import "./css/main.css";
import TaskLineItem from "./TaskLineItem";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksList: [
        {
          id: 1,
          task: "run"
        },
        {
          id: 2,
          task: "wash dishes"
        },
        {
          id: 3,
          task: "make a millie"
        },
        {
          id: 4,
          task: "make a billie"
        },
        {
          id: 5,
          task: "smile"
        },
        {
          id: 5,
          task: "a very super long item that's awesome"
        }
      ]
    };

    this.eachTaskItem = this.eachTaskItem.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  update(newText, i) {
    console.log("updating item at index", i, newText);
    this.setState(prevState => ({
      notes: prevState.notes.map(
        note => (note.id !== i ? note : { ...note, note: newText })
      )
    }));
  }

  delete(id) {
    console.log("removing item at", id);
    this.setState(prevState => ({
      tasksList: prevState.tasksList.filter(task => task.id !== id)
    }));
  }

  eachTaskItem(taskObject, i) {
    return (
      <TaskLineItem
        key={taskObject.id}
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

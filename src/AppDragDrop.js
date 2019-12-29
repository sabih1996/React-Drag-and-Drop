import React, { Component } from 'react';
import './App.css';

export default class AppDragDropDemo extends Component {

/*created some tasks here to simulate a simple application.What we intend to do is to drag and drop these tasks into
different categories like wip, complete etc.State Object here is used to store these tasks */

    state = {
        tasks: [
                {name:"Learn Angular",category:"wip", bgcolor: "yellow"},
                {name:"React", category:"wip", bgcolor:"pink"},
                {name:"Vue", category:"complete", bgcolor:"skyblue"}
                ]
            }
//When drag an element it is dragged via its id from one list to other
    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }
    //drag over event handler
    onDragOver = (ev) => {
        ev.preventDefault();
    }

/*In the onDrop event handler, we grab the task being dragged by using getData method on the event’s dataTransfer object.We then create a new tasks array by using the filter method,
and change the category of the task being dragged.setState() will trigger render, and the tasks will be rendered in the right areas.*/

    onDrop = (ev, cat) => {
       //grab source element(task container that is going to transfer)
        let id = ev.dataTransfer.getData("id");
        //code to create new task with updated category
        let tasks = this.state.tasks.filter((task) => {
        if (task.name == id) {
               task.category = cat;
           }
           return task;
       });
       this.setState({
           ...this.state,
           tasks
       });
    }
/*implemented the below code in the render method,to group tasks into their respective categories.
wip[] contains all tasks in the wip category and complete[] contains all the completed tasks*/
    
    render() {
                var tasks = {
                    wip: [],
                    complete: []
        }
/*Here we are looping through all tasks and creating a div for every task item and storing it in the respective categories.
After that added an eventhandler ondragstart and pass the id/name or any information you need to persist while the drag/drop is happening.
I am using name as a unique value to identify the task.Id can also be used as a unique value.*/
        
        this.state.tasks.forEach ((t) => {
            
            tasks[t.category].push(
                <div key={t.name} 
                  
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable"
                    style = {{backgroundColor: t.bgcolor}}
                
                >
                    {t.name}
                </div>
            );
        });
    //Here added drop handlers to implement drop from complete to wip
        return (
            
        <div className="container-drag">
                <h2 className="header">DRAG & DROP DEMO</h2>
                <div className="wip"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "wip")}}>
                    <span className="task-header">WIP</span>
                    {tasks.wip}
                </div>
                
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "complete")}>
                     <span className="task-header">COMPLETED</span>
                     {tasks.complete}
                </div>


            </div>
        );
    }
}
import React, { Component } from 'react'
import axios from '../config/axios'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'


class Todos extends Component {

    state = {
        tasks : [],
    }

    componentDidMount() {
        this.getData()
    }
    
    getData = () => { 
        axios.get(`/tasks/${this.props.id_source}`)
        .then((res) => {
            this.setState({tasks : res.data})
            // console.log(res.data)
        }).catch(err => console.log(err))
    }

    addTask = () => {
        
        axios.post(`/tasks/${this.props.id_source}`,
        {
            description : this.do.value
        })
        .then(res => this.getData())
        .catch(err => console.log(err))
    }

    editTask = (taskId, completed) => {
        
        axios.patch(`/tasks/${taskId}`,
        {
            completed : !completed
        }).then(res => this.getData())
        .catch(err => console.log(err))
        
    } 

    deleteTask = (taskId) => {
        axios.delete(`/task/${taskId}`)
        .then(res => this.getData())
        .catch(err => console.log(err))
    }

    renderList = () => {
        return this.state.tasks.map((task) => {
            // console.log(task)
            if(task.completed == false) {
                return (
                    <tr className="border-bottom" key = {task._id}>
                        <td  className="col-11" onDoubleClick={() => {this.deleteTask(task._id)}} >{task.description}</td>
                        <td  className="col-1">
                            <button onClick= {() => {this.editTask(task._id, task.completed)}} className="btn btn-outline-primary btn-block">Done</button>
                        </td>
                    </tr>
                )
            }
            return (
                <tr className="border-bottom" key = {task._id}>
                    <td  className="col-11" onDoubleClick={() => {this.deleteTask(task._id)}} ><del>{task.description}</del></td>
                    <td  className="col-1">
                        <button onClick= {() => {this.editTask(task._id, task.completed)}} className="btn btn-outline-danger btn-block">Cancel</button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        if(this.props.id_source){
            return (
                <div className="container">
                    <h1 className="display-4 text-center">Todo List</h1>
                    <table className="table table-hover mb-5">
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                    <input ref={(input) => {this.do = input}} type="text" className="form-control" placeholder="What do you want to do ?"/>
                    <button className = "btn btn-primary btn-block mt-3" onClick= {this.addTask}>Up!</button>
                </div>
            )
        }
        return <Redirect to="/login"/>
    }
}

let mapStateToProps = (state) => {
    return {
        id_source : state.auth.id
    }
}

export default connect(mapStateToProps)(Todos)






// renderList = () => {
//     return this.state.todos.map(todo => {
//        if(todo.completed){
//           return(
//              <li onDoubleClick={() => this.deleteTodo(todo._id) } className="list-group-item d-flex justify-content-between">
//                 <span>
//                    <del>{todo.description}</del>
//                 </span>
 
//                 <span>
//                    <input onClick={() => { this.toggleTodo(todo._id, todo.completed) }} className="btn btn-danger" type="button" value="Cancel"/>
//                 </span>
//              </li>
//           )
//        }

//        return(
//           <li onDoubleClick={() => this.deleteTodo(todo._id) } className="list-group-item d-flex justify-content-between">
//              <span>
//                 {todo.description}
//              </span>

//              <span>
//                 <input onClick={() => { this.toggleTodo(todo._id, todo.completed) }} className="btn btn-primary" type="button" value="Done"/>
//              </span>
//           </li>
//        )
//     })
//  }

//  render() { 
//     return (
//        <div className="container">
//           <h1 className="display-4 text-center animated bounce delay-1s">Todo List</h1>
//           <ul className="list-group list-group-flush mb-5">
//              {this.renderList()}
//           </ul>
//           <form onSubmit={this.addTodo} className="form-group mt-5">
//              <input type="text" className="form-control" placeholder="What do you want to do ?" ref={input => this.todo = input}/>
//              <input className="btn btn-block btn-primary mt-3" type="submit" value="Up!"/>
//           </form>
//        </div>
//     );
//  }
// }

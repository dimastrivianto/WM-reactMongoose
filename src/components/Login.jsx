import React, { Component } from 'react'
import axios from '../config/axios'
import Swal from 'sweetalert2'
import {connect} from 'react-redux'
import {onLoginUser} from '../actions/index'
import {Redirect} from 'react-router-dom'



class Login extends Component {

    loginUser = (e) =>{
        e.preventDefault()
        let email = this.email.value
        let password = this.password.value

        axios.post('/user/login', {email, password})
        .then((res)=>{
            if(res.data.err_message){
                return Swal.fire({
                    icon: 'error',
                    title: `Email or password is wrong`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            Swal.fire({
                icon: 'success',
                title: `Welcome ${res.data.name}`,
                showConfirmButton: false,
                timer: 1000
            })
            this.props.onLoginUser(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }
    
    render() {
        if(!this.props.username){
            return (
                <div className="container-fluid">
                    <div className="row background">
                        <div className=" col-5 mx-auto my-auto card">
                            <div className="card-body">
                                <div className="border-bottom border-secondary card-title text-center">
                                    <h1>LOGIN</h1>
                                </div>
        
                                <form className="form-group" onSubmit={this.loginUser}>
                                    <div className="card-title ">
                                        <h4>Email</h4>
                                    </div>
                                    <input ref={(input) => {this.email = input}} type='text' className='form-control' required/>
    
                                    <div className="card-title ">
                                        <h4>Password</h4>
                                    </div>
                                    <input ref={(input) => {this.password = input}} type='password' className='form-control'/>
                                    <input type="submit" value="login" className="mt-3 btn btn-primary"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return <Redirect to="/todos"/>
    }
}

let mapStateToProps = (state) => {
    return {
        username : state.auth.username
    }
}

export default connect(mapStateToProps,{onLoginUser})(Login)

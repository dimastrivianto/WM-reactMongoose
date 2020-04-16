import React, { Component } from 'react';
import axios from '../config/axios';
import Swal from 'sweetalert2'


class Register extends Component {

    registerUser = (e) => {
        e.preventDefault()
        let username = this.username.value
        let name = this.name.value
        let age = this.age.value
        let email = this.email.value
        let password = this.password.value

        axios.post('/users', {username, name, age, email, password})
        .then((res) => {
            //berhasil: res
            if(res.data.errmsg){
                return alert(res.data.errmsg)
            }
            Swal.fire({
                icon: 'success',
                title: 'Your registration has been successful',
                showConfirmButton: false,
                timer: 1500
            })            
            console.log(res.data)
        
        })
        .catch(err => console.log({gagal: err}))
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row background">
                    <div className=" col-5 mx-auto my-autogit card register">
                        <div className="card-body">
                            <div className="border-bottom border-secondary card-title text-center">
                                <h1>Register</h1>
                            </div>

                            <form className="form-group" onSubmit={this.registerUser}>
                                <div className="card-title ">
                                    <h4>Username</h4>
                                </div>
                                <input ref={(input) => {this.username = input}} type='text' className='form-control' required/>

                                <div className="card-title">
                                    <h4>name</h4>
                                </div>
                                <input ref={(input)=>{this.name=input}} type="text"/>
                
                                <div className="card-title">
                                    <h4>age</h4>
                                </div>
                                <input ref={(input)=>{this.age=input}} type="text"/>
                
                                <div className="card-title ">
                                    <h4>Email</h4>
                                </div>
                                <input ref={(input) => {this.email = input}} type='email' className='form-control'/>

                                <div className="card-title ">
                                    <h4>Password</h4>
                                </div>
                                <input ref={(input) => {this.password = input}} type='password' className='form-control'/>
                                <input type="submit" value="register" className="mt-3 btn btn-primary" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;

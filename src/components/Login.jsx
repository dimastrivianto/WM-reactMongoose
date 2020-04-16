import React, { Component } from 'react'
import axios from '../config/axios'
import Swal from 'sweetalert2'



class Login extends Component {

    loginUser = (e) =>{
        e.preventDefault()
        let email = this.email.value
        let password = this.password.value

        axios.post('/user/login', {email, password})
        .then((res)=>{
            // console.log(res.data)
            Swal.fire({
                icon: 'success',
                title: `Welcome ${res.data.name}`,
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch(err => console.log(err))
    }
    
    render() {
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
}

export default Login

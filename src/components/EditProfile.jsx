import React, { Component } from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class EditProfile extends Component {

    state = {
        user : {},
        photo : null
    }

    componentDidMount(){
        axios.get(`/findbyid/${this.props._id}`)
        .then(res => this.setState({user: res.data.user}))
        .catch(err => console.log(err))
    }

    update = () => {
        const data = new FormData()

        let image = this.image.files[0]
        let name = this.name.value
        let email = this.email.value
        let password = this.password.value
        let age = this.age.value
        
        // gambar dan data lain (name, email,password, age) yang sudah berhasil di ambil, akan 'dimasukkan' ke formData 
        // sama dengan d api di bagian upload avatar
        data.append("avatar", image)
        data.append("email", email)
        data.append("password", password)
        data.append("name", name)
        data.append("age", age)
        // data.append("username", username)
        // data.append("name", name)

        axios.patch(`/user/${this.props._id}`, data)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    changeImage = (e) => {
        this.setState({photo: URL.createObjectURL(e.target.files[0])})
    }

    render() {
        let {name,email,age} = this.state.user

        if(this.props._id){
            return (
                <div className="container">
                    <h1>Edit Profile</h1>
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control" ref={input => this.name = input} type="text" defaultValue= {name}/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input className="form-control" ref={input => this.email = input} type="email" defaultValue= {email} />
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input className="form-control" ref={input => this.age = input} type="number" defaultValue= {age}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input className="form-control" ref={input => this.password = input} type="password" />
                        </div>
    
                        <div className="figure-img">
                            <img width="200" onChange={this.changeImage} src={this.state.photo}/>
                        </div>
                        <div className="form-group">
                            <input className="custom-file" type="file" ref={input => this.image = input}/>
                        </div>
                        
                        <input onClick={this.update} className="btn btn-outline-primary" type="button" value="Update!"/>
                    </form>   
                    
                    
                </div>
            )
        }
        return <Redirect to="/login"/>
    }
}

let mapStateToProps = state =>{
    return {
        _id :state.auth.id
    }
}

export default connect(mapStateToProps)(EditProfile)

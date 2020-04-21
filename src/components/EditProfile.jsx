import React, { Component } from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'

class EditProfile extends Component {

    state = {
        photo : ''
    }

    componentDidMount(){
        axios.get(`/findbyid/${this.props._id}`)
        .then(res => this.setState({user: res.data.user, photo: res.data.photo}))
        .catch(err => console.log(err))
    }

    upload = () => {
        const data = new FormData()

        let image = this.image.files[0]
        let username = this.username.value
        let name = this.name.value
        
        // gambar dan data lain yang sudah berhasil di ambil, akan 'dimasukkan' ke formData 
        // sama dengan d api di bagian upload avatar
        data.append("avatar", image)
        // data.append("username", username)
        // data.append("name", name)

        axios.post(`/users/avatar/${this.props._id}`, data)
        .then(res => alert(res.data))
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="container">
                <h1>Edit Profile</h1>
                <form>
                    <img src={this.state.photo} alt="" />
                    <input className="custom-file" type="file" ref={input => this.image = input}/>
                    <input className="form-control" ref={input => this.username = input} type="text" />
                    <input className="form-control" ref={input => this.name = input} type="text" />
                    <input onClick={this.upload} className="btn btn-outline-primary" type="button" value="save"/>
                </form>   
                
                
            </div>
        )
    }
}

let mapStateToProps = state =>{
    return {
        _id :state.auth.id
    }
}

export default connect(mapStateToProps)(EditProfile)

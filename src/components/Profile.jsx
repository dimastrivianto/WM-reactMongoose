import React, { Component } from 'react'
import {Jumbotron} from 'reactstrap'
import { connect } from 'react-redux'
import axios from '../config/axios'
import {Redirect} from 'react-router-dom'


class Profile extends Component {

    state = {
        user: {},
        photo : ""
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        axios.get(`/findbyid/${this.props._id}`)
        .then(res => this.setState({user: res.data.user, photo: res.data.photo}))
        .catch(err => console.log(err))
    }
    

    render() {
        let {_id, username, name, email, age} = this.state.user

        if(this.props._id){
            return (
                <div className="container">
                    <Jumbotron>
                        <img src={this.state.photo} alt={name}></img>
                        <h1>Hello,{name}</h1>
                        <p>{name} | {age} | {email}</p>
                    </Jumbotron>
                </div>
            );
        }
        return <Redirect to="/login"/>
    }
}

let mapStateToProps = (state) => {
    return {
        _id: state.auth.id
    }
}
export default connect(mapStateToProps)(Profile)

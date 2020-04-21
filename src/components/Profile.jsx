import React, { Component } from 'react'
import {Jumbotron} from 'reactstrap'
import { connect } from 'react-redux'
import axios from '../config/axios'

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
}

let mapStateToProps = (state) => {
    return {
        _id: state.auth.id
    }
}
export default connect(mapStateToProps)(Profile)

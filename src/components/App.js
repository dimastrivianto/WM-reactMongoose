import React, { Component } from 'react';
import {Route,  BrowserRouter, Switch} from 'react-router-dom'

import Register from './Register'
import Login from './Login'
import Header from './Header'
import Todos from './Todos'
import Profile from './Profile'
import EditProfile from './EditProfile'
import NotFound from './NotFound'

import {onLoginUser} from '../actions/index'
import {connect} from 'react-redux'

class App extends Component {
    
    state = {
        check : false
    }

    componentDidMount(){
        
        let user = JSON.parse(localStorage.getItem('userData'))

        if(user) {
            this.props.onLoginUser(user)
        }
        this.setState({check : true})
    }

    render() {
        if(this.state.check){
            return (
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/todos" component={Todos} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/editprofile" component={EditProfile} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            )
        }
        return <h1>Loading</h1>
    }
}

export default connect(null, {onLoginUser})(App)

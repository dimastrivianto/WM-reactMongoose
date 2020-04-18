import React, { Component } from 'react';
import {Route,  BrowserRouter} from 'react-router-dom'

import Register from './Register'
import Login from './Login'
import Header from './Header'
import Todos from './Todos'
// import {connect} from 'react-redux'

class App extends Component {
    
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Route path="/" exact component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/todos" component={Todos} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App

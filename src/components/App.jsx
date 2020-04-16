import React, { Component } from 'react';
import {Route,  BrowserRouter} from 'react-router-dom'

import Register from './Register'
import Login from './Login'

class App extends Component {
    
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/register" component={Register} />
                    <Route path="/Login" component={Login} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App

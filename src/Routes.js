import React from 'react'
import { Switch, Route } from 'react-router-dom'              
import Home from './pages/Home'
import About from './pages/About'
import Error from './pages/Error'


export default function Routes() {
    return (                                                            
        <Switch> 
            <Route exact path="/" component={Home} />            
            <Route path="/about" component={About} />
            <Route path="*" component={Error} /> 
        </Switch>
    )
}



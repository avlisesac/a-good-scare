import React from 'react'
import './index.css'
import NavbarComponent from '../NavbarComponent'
import Home from '../HomeComponent'
import MoviePage from '../MoviePageComponent'
import AboutPage from '../AboutPageComponent'

import {
    Switch,
    Redirect,
    Route,
} from 'react-router-dom'

const MainComponent = () => {
    return(
        <>
        <NavbarComponent />
        <Switch>
            <Route path ="/home" component={ Home } />
            <Route path ="/movie/:id" component={() => <MoviePage />} />
            <Route exact path="/about" component={ AboutPage } />
            <Redirect to="/home" />
        </Switch>
        </>
    )
}

export default MainComponent
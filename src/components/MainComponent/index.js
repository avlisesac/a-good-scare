import React from 'react'
import './index.css'
import NavbarComponent from '../NavbarComponent'
import MovieCardComponent from '../MovieCardComponent'

//Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardDeck from 'react-bootstrap/CardDeck'

const MainComponent = () => {
    return(
        <>
        <NavbarComponent />
        <Container className="p-2">
            <Jumbotron fluid>
                <Container>
                    <h1 className="creepster">A Good Scare</h1>
                    <h4>A website for and by horror fans.</h4>
                    <p>Start by letting us know if you've seen any of the movies below.</p>
                </Container>
            </Jumbotron>

            <Row>
                <MovieCardComponent id="377"/>
                <MovieCardComponent id="348" />
                <MovieCardComponent id="250574" />
            </Row>
        </Container>
        </>
    )
}

export default MainComponent
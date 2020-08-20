import React from 'react'

import MovieCardComponent from '../MovieCardComponent'

//Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const HomeComponent = () => {
    const movieIds = ["377", "348", "250574"]
    const movieCards = movieIds.map(id => {
        return(
            <MovieCardComponent id={id} />
        )
    })

    return(
        <Container className="p-2">
            <Jumbotron fluid>
                <Container>
                    <h1 className="creepster">A Good Scare</h1>
                    <h4>A website for and by horror fans.</h4>
                    <p>Start by letting us know if you've seen any of the movies below.</p>
                </Container>
            </Jumbotron>

            <Row>
                { movieCards }
            </Row>
        </Container>
    )
}

export default HomeComponent
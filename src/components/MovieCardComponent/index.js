import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

import './index.css'

//Bootstrap
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'


const descr = "Teenagers in a small town are dropping like flies, apparently in the grip of mass hysteria causing their suicides. A cop's daughter, Nancy Thompson, traces the cause to child molester Fred Krueger, who was burned alive by angry parents many years before. Krueger has now come back in the dreams of his killers' children, claiming their lives as his revenge. Nancy and her boyfriend, Glen, must devise a plan to lure the monster out of the realm of nightmares and into the real world..."
const shortDescr = descr.substr(0, 139) + '...'
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY

const constructRequest = (movieId) => {
    const request = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + TMDB_API_KEY
    return request
}

const shortenDesc = (originalString) => {
    return originalString.substr(0, 100) + '...'
}

const MovieCardComponent = ({ id }) => {
    const [loadingStatus, setLoadingStatus] = useState('idle')
    const [error, setError] = useState(null)
    const [movieData, setMovieData] = useState('')

    const fetchMovieData = (requestString) => {
        console.log('Starting Axios request for:', requestString)
        setLoadingStatus('loading')
        Axios.get(requestString)
            .then(response => {
                const movieData = response.data
                console.log('Axios response data received: ', movieData)
                setMovieData(
                    {
                        title: movieData.title,
                        descr: movieData.overview,
                        tagline: movieData.tagline,
                        poster: 'https://image.tmdb.org/t/p/w300/' + movieData.poster_path,
                    }
                )
                setLoadingStatus('succeeded')
            })
            .catch(error => {
                console.error('Axios error: ', error)
                setLoadingStatus('failed')
                setError(error)
            })
    }

    useEffect(() => {
        fetchMovieData(constructRequest(id));
    }, [])

    if(loadingStatus==='idle'){
        return(
            null
        )
    }

    if(loadingStatus==='loading'){
        return(
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className='sr-only'>Loading...</span>
                    </Spinner>
                </Row>
            </Container>
        )
    }

    if(loadingStatus==='error'){
        return(
            <Alert variant="warning">
                Error loading movie! { error }
            </Alert>
        )
    }

    if(loadingStatus==='succeeded'){
        return(
            <Col xs={12} md={6} lg={4} className="mb-2" align="center">
                <Card bg="dark" text="white" className="h-100  movieCard">
                    <Card.Img src={movieData.poster} />
                    <Card.Body>
                        <Card.Title>{ movieData.title }</Card.Title>
                        <Card.Text align="justify">
                            { shortenDesc(movieData.descr) }
                        </Card.Text>
                        <Link to={`/movie/${id}`}>
                            <Button variant="danger" >View</Button>
                        </Link>
                    </Card.Body>
                    <Card.Footer>
                        Movie Id: { id }
                    </Card.Footer>
                </Card>
    
            </Col>
        )
    }
}

export default MovieCardComponent
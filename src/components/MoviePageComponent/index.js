import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

import './index.css'

import RatingButton from './RatingButtonComponent'
import WatchedItButton from './WatchedItButton'
import WatchListButton from './WatchListButton'

//Bootstrap
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY

const MoviePageComponent = () => {
    const { id } = useParams()

    const [movieLoadingStatus, setMovieLoadingStatus] = useState('idle')
    const [userLoadingStatus, setUserLoadingStatus] = useState('idle')

    const [movieData, setMovieData] = useState('')
    const [userData, setUserData] = useState('')

    const [error, setError] = useState(null)

    //Load from TMDB
    const fetchMovieData = (requestString) => {
        console.log('Starting Axios request for:', requestString)
        setMovieLoadingStatus('loading')
        Axios.get(requestString)
            .then(response => {
                const movieData = response.data
                console.log('Axios response data received: ', movieData)
                setMovieData(
                    {
                        title: movieData.title,
                        descr: movieData.overview,
                        tagline: movieData.tagline,
                        releaseDate: movieData.release_date.substr(0, 4),
                        poster: 'https://image.tmdb.org/t/p/w500/' + movieData.poster_path,
                    }
                )
                setMovieLoadingStatus('succeeded')
            })
            .catch(error => {
                console.error('Axios error: ', error)
                setMovieLoadingStatus('failed')
                setError(error)
            })
    }

    const constructRequest = (movieId) => {
        const request = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + TMDB_API_KEY
        return request
    }

    useEffect(() => {
        fetchMovieData(constructRequest(id));
    }, [])

    //Load users data

    if(movieLoadingStatus==='idle'){
        return(
            null
        )
    }

    if(movieLoadingStatus==='loading'){
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

    if(movieLoadingStatus==='error'){
        return(
            <Alert variant="danger">
                <h3>Error loading movie! { error }</h3>
                <p>If you typed the movie number, double check to make sure it exists. Otherwise, this is a bug, please report it.</p>
            </Alert>
        )
    }

    return(
        <Container className="mt-2 mb-2">
            <Row>
                <Col md={4}>
                    <MoviePageImage imgURL={movieData.poster}/>
                </Col>
                <Col md={8} className="mt-2 mt-md-0">
                    <MovieDetails movieData={movieData}/>
                </Col>
            </Row>
            <Row>
                <Col className="mt-2">
                    <CommentsComponent />
                </Col>
            </Row>
        </Container>
    )
}

const MoviePageImage = ({imgURL}) => {
    return(
        <Image src={imgURL} fluid/>
    )
}

const MovieDetails = ({movieData}) => {
    const [userSeenMovie, setUserSeenMovie] = useState(null)
    const [inUserWatchList, setInUserWatchList] = useState(false)
    const [userRecommended, setUserRecommended] = useState(null)
    const [userGenre, setUserGenre] = useState('')
    const [userComment, setUserComment] = useState('')
    const [commentLength, setCommentLength] = useState(0)

    const handleGenreChange = (event) => {
        setUserGenre(event.target.value)
    }

    const handleCommentChange = (event) => {
        const value = event.target.value

        setUserComment(value)
        setCommentLength(value.length)
    }

    const handleSubmitComment = (event) => {
        console.log('Submitted comment')
        event.preventDefault()
    }

    return(
        <Card bg="light" text="dark">
            <Card.Body>
                <Card.Title>{ movieData.title }</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{ movieData.releaseDate }</Card.Subtitle>
                <Card.Text>
                    { movieData.descr }
                </Card.Text>
                <hr />
                <Form >
                    <Form.Group>
                        <Form.Label>Your Lists</Form.Label>
                        <div>
                            <WatchedItButton userSeenMovie={userSeenMovie} setUserSeenMovie={setUserSeenMovie} inUserWatchList={inUserWatchList} setInUserWatchList={setInUserWatchList}/>
                            <WatchListButton inUserWatchList={inUserWatchList} setInUserWatchList={setInUserWatchList} />
                        </div>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Your Rating</Form.Label>
                        <div>
                            <RatingButton 
                                recommend={true} 
                                userRecommended={userRecommended} 
                                setUserRecommended={setUserRecommended} 
                                userSeenMovie={userSeenMovie}
                            />
                            <RatingButton 
                                recommend={false} 
                                userRecommended={userRecommended} 
                                setUserRecommended={setUserRecommended} 
                                userSeenMovie={userSeenMovie}
                            />
                        </div>                
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Genre</Form.Label>
                        <Form.Control as="select" value={userGenre} onChange={handleGenreChange} disabled={!userSeenMovie}>
                            <option value=''></option>
                            <option value="BodyHorror">Body Horror</option>
                            <option value="ComedyHorror">Comedy Horror</option>
                            <option value="FolkHorror">Folk Horror</option>
                            <option value="FoundFootage">Found Footage</option>
                            <option value="GothichHorror">Gothic Horror</option>
                            <option value="HolidayHorror">Holiday Horror</option>
                            <option value="NaturalHorror">Natural Horror</option>
                            <option value="PsychologicalHorror">Psychological Horror</option>
                            <option value="ScienceFictionHorror">Science Fiction Horror</option>
                            <option value="Slasher">Slasher</option>
                            <option value="SupernaturalHorror">Supernatural Horror</option>
                            <option value="TeenHorror">Teen Horror</option>
                            <option value="ZombieFilm">Zombie Film</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Your Comment</Form.Label>
                        <Form.Control as="textarea" rows="2" value={userComment} onChange={handleCommentChange} disabled={!userSeenMovie}/>
                        <Form.Text className={ commentLength > 140 ? 'red' : ''}>{commentLength} / 140 chars.</Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={!userSeenMovie || commentLength > 140} onClick={handleSubmitComment}>
                        Submit Comment
                    </Button>

                </Form>
            </Card.Body>  
        </Card>
    )
}

const CommentsComponent = (props) => {
    return(
        <Container>
            <h2>Comments</h2>
            <CommentCard
                comment = "I have a lot to say about this movie. And this is it."
                userName = "user420"
                date = "04/20/2020"
            />
            <CommentCard 
                comment = "Oh Hamlet, Hamlet, Hamlet, Hamlet, Hamlet. The vampire army has taken the city!"
                userName = "t.moore"
                date = "69/69/6969"
            />
        </Container>
    )
}

const CommentCard = ({comment, userName, date}) => {
    return(
        <Card bg="dark" text="white" className="mt-2">
            <Card.Body>
                <Card.Text>{comment}</Card.Text>
            </Card.Body>
            <Card.Footer><i className="fas fa-skull"></i> - {userName} on {date}</Card.Footer>
        </Card>
    )
}

export default MoviePageComponent
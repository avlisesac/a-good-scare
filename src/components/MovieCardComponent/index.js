import React from 'react'

//Bootstrap
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

const descr = "Teenagers in a small town are dropping like flies, apparently in the grip of mass hysteria causing their suicides. A cop's daughter, Nancy Thompson, traces the cause to child molester Fred Krueger, who was burned alive by angry parents many years before. Krueger has now come back in the dreams of his killers' children, claiming their lives as his revenge. Nancy and her boyfriend, Glen, must devise a plan to lure the monster out of the realm of nightmares and into the real world..."
const shortDescr = descr.substr(0, 100) + '...'

const MovieCardComponent = ({ id }) => {
    return(
        <Col xs={12} md={6} lg={4}>
            <Card bg="dark" text="white">
                <Card.Img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/wGTpGGRMZmyFCcrY2YoxVTIBlli.jpg" />
                <Card.Body>
                    <Card.Title>A Nightmare on Elm Street</Card.Title>
                    <Card.Text>
                        { shortDescr }
                    </Card.Text>
                    <Button variant="danger">View</Button>
                </Card.Body>
                <Card.Footer>
                    Movie Id: { id }
                </Card.Footer>
            </Card>

        </Col>
    )
}

export default MovieCardComponent
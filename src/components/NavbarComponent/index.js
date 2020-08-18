import React from 'react'

//Bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const NavbarComponent = () => {
    return(
        <Navbar bg="dark" variant="dark" expand='md'>
            <Navbar.Brand href="#home" className="creepster">AGS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Find a movie..." />
                    <Button variant="outline-danger" className="ml-2 mt-2 mt-sm-0">Search</Button>
                    <Button variant="outline-primary" className="ml-2 mt-2 mt-sm-0">Sign in</Button>
                </Form>
                <Nav className="ml-2">
                    
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarComponent
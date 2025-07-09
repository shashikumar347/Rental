import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Navbar1 = () => {
  return (
    <div> <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex justify-content-center gap-3">
            <Link to='/Expenses'>Expenses</Link>
            <Link to='/Tickettracker'>TicketTracker</Link>
            <Link to='/Employee'>Employee</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar></div>
  )
}

export default Navbar1
import React from 'react'
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


function TopNavbar() {

  const myTodoCount = useSelector((state) => state.MyTodoLength.value)



  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className='ms-5'>My Todoapp!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/Todo" className='me-5'>
              Todo
              <Badge pill variant="danger" className='ms-1'>
                {myTodoCount}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default TopNavbar
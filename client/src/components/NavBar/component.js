import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap/lib';
import { Link } from 'react-router';

export default class NavBar extends Component {

  componentDidMount() {
    this.props.requestSession();
  }

  render() {
    const { username, requestLogout } = this.props;
    return (
      <div>
        <div>
          <Navbar inverse collapseOnSelect id="navbar">
            <Navbar.Header>
              <Navbar.Brand>
                <Link to={{ pathname: '/' }}>
                  Fresh Air
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <IndexLinkContainer to={{ pathname: '/service' }}>
                  <NavItem eventKey={1}>Services</NavItem>
                </IndexLinkContainer>
                <LinkContainer to={{ pathname: '/about' }}>
                  <NavItem eventKey={2}>About Us</NavItem>
                </LinkContainer>
                {
                  username 
                  ? (
                      <NavItem onClick={requestLogout} eventKey={3}>Logout</NavItem>
                    )
                  : (
                      <LinkContainer to={{ pathname: '/login' }}>
                        <NavItem eventKey={3}><i className="fa fa-user" aria-hidden="true" id="user-icon"></i>  Login/Sign Up</NavItem>
                      </LinkContainer>
                    )
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        {
          this.props.children
        }
      </div>
    );
  }
}
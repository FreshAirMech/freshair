import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap/lib';
import { Link } from 'react-router';
import $ from 'jquery';

export default class NavBar extends Component {

  componentDidMount() {
    document.getElementById('navbar-container').style.height = $('#navbar').height() + 20 + 'px';
    window.addEventListener('resize', e => {
      document.getElementById('navbar-container').style.height = $('#navbar').height() + 20 + 'px';
    });
    
    this.props.requestSession();
  }


  render() {
    const { firstName, username, photoURL, requestLogout } = this.props;
    return (
      <div>
        <div id="navbar-container">
          <Navbar inverse collapseOnSelect id="navbar" fixedTop={true}>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to={{ pathname: '/' }}>
                  <img id="navbar-logo" src={require('lib/images/logo.png')} alt="Fresh Aire"></img>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <IndexLinkContainer className="nav-li" to={{ pathname: '/service' }}>
                  <NavItem eventKey={1}>Services</NavItem>
                </IndexLinkContainer>
                <LinkContainer className="nav-li" to={{ pathname: '/about' }}>
                  <NavItem eventKey={2}>About/Contact</NavItem>
                </LinkContainer>
                {
                  username 
                  ? (
                      <NavDropdown
                        className="nav-li"
                        eventKey={3}
                        title={
                                <span>
                                  {firstName || username} {photoURL && <img id="navbar-img" src={photoURL} />}
                                </span>
                              } 
                        id="basic-nav-dropdown">
                        <LinkContainer to={{ pathname: '/account' }}>
                          <MenuItem eventKey={3.1}>Account</MenuItem>
                        </LinkContainer>
                        <LinkContainer to={{ pathname: '/settings' }}>
                          <MenuItem eventKey={3.2}>Settings</MenuItem>
                        </LinkContainer>
                        <MenuItem divider />
                        <MenuItem onClick={requestLogout} eventKey={3.3}>Logout</MenuItem>
                      </NavDropdown>
                    )
                  : (
                      <LinkContainer className="nav-li" to={{ pathname: '/login' }}>
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
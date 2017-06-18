import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap/lib';
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';
import Footer from '../Footer';
import Scroll from 'react-scroll';

var { scroller } = Scroll;


export default class NavBar extends Component {

  componentDidMount() {
    this.props.requestSession();
    document.getElementById('navbar-container').style.height = $('#navbar').height() + 20 + 'px';
    window.addEventListener('resize', e => {
      document.getElementById('navbar-container').style.height = $('#navbar').height() + 20 + 'px';
      // Make the navbar's collapse menu have a decently high opacity so that the user can still
      // see the navbar (on lower resolutions)
      if (window.innerWidth < 768) {
        document.getElementsByClassName('navbar-collapse')[0].style['background-color'] = 'rgba(255,255,255,0.8)';
      }
      // On higher resolutions, make the navbar's collapse section have 0 opacity so that it matches
      // the container's/parent's opacity
      else {
        document.getElementsByClassName('navbar-collapse')[0].style['background-color'] = 'rgba(255,255,255,0)';
      }
    });
  }

  goToServices() {
    let navbarHeight = document.getElementById('navbar-container').offsetHeight;
    let options = {
      offset: -navbarHeight, 
      smooth: true,
      duration: 500
    };
    // if currently on main landing page, immediately go to services-div
    if (this.props.location.pathname === '/')
      scroller.scrollTo('services-div', options);
    // otherwise wait for landing page to mount
    else {
      window.setTimeout(() => {
        scroller.scrollTo('services-div', options);
      }, 200);
    }
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
                <LinkContainer className="nav-li" to={{ pathname: '/' }}>
                  <NavItem eventKey={1} onClick={this.goToServices.bind(this)}>
                    <p className="navbar-text">Services</p>
                    <i className="glyphicon glyphicon-triangle-top"/>
                  </NavItem>
                </LinkContainer>
                <LinkContainer className="nav-li" to={{ pathname: '/request' }}>
                  <NavItem eventKey={2}>
                    <p className="navbar-text">Request Appt.</p>
                    <i className="glyphicon glyphicon-triangle-top"/>
                  </NavItem>
                </LinkContainer>
                <LinkContainer className="nav-li" to={{ pathname: '/about' }}>
                  <NavItem eventKey={3}>
                    <p className="navbar-text">About/Contact</p>
                    <i className="glyphicon glyphicon-triangle-top"/>
                  </NavItem>
                </LinkContainer>
                {
                  username 
                  ? (
                      <NavDropdown
                        className="nav-li open"
                        eventKey={4}
                        title={
                                <div>
                                  <p className="navbar-text">
                                    {firstName || username}
                                  </p>
                                  {photoURL && <img id="navbar-img" src={photoURL} />}
                                  <i className="glyphicon glyphicon-triangle-top"/>
                                </div>
                              } 
                        id="basic-nav-dropdown">
                        <LinkContainer to={{ pathname: '/account' }} disabled>
                          <MenuItem eventKey={4.1}>
                            <i className="glyphicon glyphicon-triangle-right"/>
                            Account
                          </MenuItem>
                        </LinkContainer>
                        <LinkContainer to={{ pathname: '/settings' }}>
                          <MenuItem eventKey={4.2}>
                            <i className="glyphicon glyphicon-triangle-right"/>
                            Settings
                          </MenuItem>
                        </LinkContainer>
                        <MenuItem divider />
                        <MenuItem onClick={requestLogout} eventKey={4.3}>
                          <i className="glyphicon glyphicon-triangle-right"/>
                          Logout
                        </MenuItem>
                      </NavDropdown>
                    )
                  : (
                      <LinkContainer className="nav-li" to={{ pathname: '/login' }}>
                        <NavItem eventKey={4}>
                          <p className="navbar-text">
                            <i className="fa fa-user" aria-hidden="true" id="user-icon"></i> Login/Sign Up
                          </p>
                          <i className="glyphicon glyphicon-triangle-top"/>
                        </NavItem>
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
        <Footer goToServices={this.goToServices.bind(this)} />
      </div>
    );
  }
}
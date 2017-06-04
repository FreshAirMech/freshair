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
    $('.nav-li.dropdown').addClass('open');
    $('.navbar-collapse.collapse.in').hover(
      function () {
        console.log('hovering')
        $(this).addClass('open');
      },
      function () {
        console.log('exit hovering')
        $(this).removeClass('open');
      }
    );

    this.changeBasedOnResize();
    window.addEventListener('resize', this.changeBasedOnResize);

    this.props.requestSession();
  }

  changeBasedOnResize() {
    // on resizing window, don't display navbar's collapse menu if 'collapsed' class isn't added (if collapse isn't open)
    // if (document.getElementsByClassName('navbar-collapse')[0] && window.innerWidth < 990
    //     && !document.getElementsByClassName('navbar-toggle collapsed')[0]) {
    //   document.getElementsByClassName('navbar-collapse')[0].style['display'] = 'none';
    // }
  }

  displayCollapse() {
    // document.getElementsByClassName('navbar-collapse')[0].style['display'] = 'none' ? 'block' : 'none';
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
            <Navbar.Collapse onClick={this.displayCollapse}>
              <Nav pullRight>
                <LinkContainer className="nav-li" to={{ pathname: '/service' }}>
                  <NavItem eventKey={1}>
                    Services
                    <i className="glyphicon glyphicon-triangle-top"/>
                  </NavItem>
                </LinkContainer>
                <LinkContainer className="nav-li" to={{ pathname: '/request' }}>
                  <NavItem eventKey={2}>
                    Request Appointment
                    <i className="glyphicon glyphicon-triangle-top"/>
                  </NavItem>
                </LinkContainer>
                <LinkContainer className="nav-li" to={{ pathname: '/about' }}>
                  <NavItem eventKey={3}>
                    About/Contact
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
                                <span>
                                  {firstName || username} {photoURL && <img id="navbar-img" src={photoURL} />}
                                  <i className="glyphicon glyphicon-triangle-top"/>
                                </span>
                              } 
                        id="basic-nav-dropdown">
                        <LinkContainer to={{ pathname: '/account' }}>
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
                        <NavItem eventKey={4}><i className="fa fa-user" aria-hidden="true" id="user-icon"></i>  Login/Sign Up
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
      </div>
    );
  }
}
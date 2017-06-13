import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap/lib';
import Scroll from 'react-scroll';
import $ from 'jquery';
import { Link } from 'react-router';
import PartnerSlider from 'lib/Slider';
import overviews from 'lib/objects/overviews';
import why from 'lib/objects/why';
import services from 'lib/objects/services';

var { Element, Events, scrollSpy, scroller } = Scroll;
var scroll = Scroll.animateScroll;

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offsetHeight: 0
    };
    this.goToNextDiv = this.goToNextDiv.bind(this);
    this.changeBasedOnResize = this.changeBasedOnResize.bind(this);
  }

  changeBasedOnScrollPos(e) {
    let top = window.pageYOffset || document.documentElement.scrollTop;
    // slowly change the opacity of the navbar based on scroll position
    if (document.getElementById('banner-div')) {
      let opacityValue = 0.2 + top/200;
      opacityValue = opacityValue > 0.9 ? 0.9 : opacityValue;
      document.getElementById('navbar-container').style["background-color"] = "rgba(255,255,255," + opacityValue + ")";
      if (document.getElementsByClassName('navbar-collapse collapse')[0] && window.innerWidth < 768) {
        document.getElementsByClassName('navbar-collapse collapse')[0].style["background-color"] = "rgba(255,255,255,0.8)";
      }
      else {
        document.getElementsByClassName('navbar-collapse')[0].style["background-color"] = "rgba(255,255,255,0)";
      }
    }
    // if landing picture is being shown or at bottom of page, hide 'request appointment' button, and vice versa
    if (document.body.offsetHeight - (window.pageYOffset + window.innerHeight) < 120 ||
        window.pageYOffset < $('#banner-div').height() / 2) {
      $('.schedule-apt').addClass('hideBtn').removeClass('showBtn');
      $('.schedule-apt').addClass('hideBtnText').removeClass('showBtnText');
    }
    else {
      $('.schedule-apt').removeClass('hideBtn').addClass('showBtn');
    }

    // if at the bottom of the page, display 'scroll to top' instead of the arrow button
    if (document.getElementsByClassName('arrowButton')[0]) {
      if (document.body.offsetHeight - (window.pageYOffset + window.innerHeight) < 80) {
        document.getElementsByClassName('arrowButton')[0].style["display"] = "none";
      }
      else {
        document.getElementsByClassName('arrowButton')[0].style["display"] = "block";
      }
    }
  }

  changeBasedOnResize() {
    let aptButton = document.getElementsByClassName('schedule-apt')[0];
    if (!aptButton) return;
    if (window.innerWidth < 400) {
      aptButton.style.width = '50px';
      aptButton.style.height = '50px';
      aptButton.style.padding = '0 13px';
      aptButton.style.top = '90%';
      aptButton.getElementsByTagName('p')[0].style['font-size'] = '13px';
      $('.schedule-apt').find('i').removeClass('fa-lg').addClass('fa-md');
    }
    else {
      aptButton.style.width = '70px';
      aptButton.style.height = '70px';
      aptButton.style.padding = '0 19px';
      aptButton.style.top = '50%';
      aptButton.getElementsByTagName('p')[0].style['font-size'] = '15px';
      $('.schedule-apt').find('i').removeClass('fa-md').addClass('fa-lg');
    }
    if (document.getElementsByClassName('navbar-collapse')[0] && window.innerWidth < 768) {
      document.getElementsByClassName('navbar-collapse')[0].style['background-color'] = 'rgba(255,255,255,0.8)';
    }
    else {
      document.getElementsByClassName('navbar-collapse')[0].style['background-color'] = 'rgba(255,255,255,0)';
    }
  }

  initializeNavbarOpacity() {
    let top = window.pageYOffset || document.documentElement.scrollTop;
    if (top === 0) {
      document.getElementById('navbar-container').style['background-color'] = 'rgba(255,255,255,0.2)';
    }
  }

  componentDidMount() {
    this.initializeNavbarOpacity();
    scroll.scrollToTop({duration: 1});

    window.addEventListener('scroll', this.changeBasedOnScrollPos);
    window.addEventListener('resize', this.changeBasedOnResize);

    // If user is on mobile, move 'request apt' button to bottom of the page
    this.changeBasedOnResize();

    // Change state variable 'animating' so that the user cannot spam click the arrow button
    let thisComponent = this;
    Events.scrollEvent.register('begin', function(to, element) {
      thisComponent.setState({animating: true})
    });
    Events.scrollEvent.register('end', function(to, element) {
      thisComponent.setState({animating: false})
    });

    // Add and remove classes for the 'Request an Appointment' button depending on scroll position
    // Hide the button at the top (b/c it shows the banner) and at the bottom (b/c it conflicts with the carousel's buttons)
    if (document.body.offsetHeight - (window.pageYOffset + window.innerHeight) < 80 ||
        window.pageYOffset < $('#banner-div').height() / 2) {
      $('.schedule-apt').addClass('hideBtn').addClass('hideBtnText');
    }
    else {
      $('.schedule-apt').addClass('showBtn').addClass('hideBtnText');
    }

    // Add and remove classes for the 'Request an Appointment' button's text depending on hover state
    $('.schedule-apt').hover(
      function () {
        $(this).removeClass('hideBtnText').addClass('showBtnText');
      },
      function () {
        $(this).removeClass('showBtnText').addClass('hideBtnText');
      }
    );

    // When hovering over a service, make all other services dim
    $('#services .col-sm-6').hover(
      function() {
        $(this).siblings('.col-sm-6').children('div').addClass('makeDim').removeClass('makeBright');
        if ($(this).children('div').hasClass('makeDim')) {
          $(this).children('div').addClass('makeBright').removeClass('makeDim');
        }
      },
      function() {
        $(this).children('div').removeClass('makeBright');
      }
    );

    $('#services .row').hover(
      function() {
      },
      function() {
        if ($(this).children('.col-sm-6').children('div').hasClass('makeDim')) {
          $(this).children('.col-sm-6').children('div').addClass('makeBright');
        }
        $(this).children('.col-sm-6').children('div').removeClass('makeDim');
      }
    );

    scrollSpy.update();
  }

  componentWillUnmount() {
    // Reset opacity for other component views
    document.getElementById('navbar-container').style["background-color"] = "rgba(255,255,255,0.9)";
    document.getElementsByClassName('navbar-collapse')[0].style["background-color"] = "rgba(255,255,255,0)";
    window.removeEventListener('scroll', this.changeNavbarOnScroll);
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  goToNextDiv() {
    let { currentDiv, animating } = this.state;
    if (animating) return;
    let navbarHeight = $('#navbar-container').height();
    let options = {
      offset: -navbarHeight, 
      smooth: true,
      duration: 500
    };

    if (document.getElementById('overview').getBoundingClientRect().top - navbarHeight > 1) {
      scroller.scrollTo('overview-div', options);
    }
    else if (document.getElementById('services-element').getBoundingClientRect().top - navbarHeight > 1) {
      scroller.scrollTo('services-div', options);
    }
    else if (document.getElementById('partners').getBoundingClientRect().top - navbarHeight > 1) {
      scroller.scrollTo('partners-div', options);
    }
    else {
      scroll.scrollToBottom({duration: 500, smooth: true});
    }
  }

  goToTop() {
    scroll.scrollToTop({duration: 500, smooth: true});
  }

  render() {
    let { offsetHeight } = this.state;
    return (
      <div>
        <Link to={{ pathname: '/request' }}>
          <button type="button" className="btn btn-default btn-circle btn-xl schedule-apt">
            <p>Request an Appointment</p>
            <i className="fa fa-calendar fa-lg"></i>
          </button>
        </Link>
        <a onClick={this.goToNextDiv} className="arrowButton">
          <img id="scrollImage" src={require('lib/images/arrows.png')} alt="SCROLL DOWN" />
        </a>
        <Row className="picture-div" id="banner-div">
          <div id="banner-background"></div>
          <img id="landing-left" className="landing-triangles" src={require('lib/images/landing_left.png')} />
          <img id="landing-right" className="landing-triangles" src={require('lib/images/landing_right.png')} />
          <img id="landing1" className="landingImages" src={require('lib/images/landing1.png')} />
        </Row>
        <Row id="overview" className="standard-div">
          <Element name="overview-div" className="element" id="overview-element">
            <Row>
              {
                Object.keys(overviews).map((key, index) => {
                  let overview = overviews[key];
                  let id = "overview" + (index + 1);
                  return (
                    <Col sm={4} id={id}>
                      <div>
                        <h4>{overview.title}</h4>
                        <p className="subtitle">{overview.subtitle}</p>
                        <p className="description">{overview.description}</p>
                      </div>
                    </Col>
                  );
                })
              }
            </Row>
          </Element>
        </Row>
        <Row id="why" className="standard-div">
          <Row>
            <h1>Serving New York since 1989</h1>
            <hr></hr>
          </Row>
          {
            Object.keys(why).map((key, index) => {
              let reason = why[key];
              let id = "icon" + (index + 1);
              let className = "fa fa-lg " + reason.icon;
              return (
                <Col sm={4}>
                  <i id={id} className={className} aria-hidden="true" />
                  <h4>{reason.title}</h4>
                  <p className="subtitle">{reason.subtitle}</p>
                  <p>{reason.description}</p>
                </Col>
              );
            })
          }
        </Row>
        <Element id="services-element" name="services-div" className="element picture-div">
          <h1>Comprehensive Services</h1>
        </Element>
        <Row id="services" className="standard-div">
          <Row>
            {
              Object.keys(services).map((key, index) => {
                let service = services[key]
                let id = "service" + (index + 1);
                return (
                  <Col sm={6} id={id}>
                    <div>
                      <h2>{service}</h2>
                    </div>
                  </Col>
                );
              })
            }
          </Row>
        </Row>
        <Row id="partners" className="standard-div">
          <Element name="partners-div" className="element">
            <Row>
              <h1>Our Partners</h1>
              <hr></hr>
            </Row>
            <Row>
              <PartnerSlider />
            </Row>
          </Element>
        </Row>
        <div id="scroll-top">
          <a onClick={this.goToTop}>GO TO TOP</a>
        </div>
      </div>  
    );
  }
}
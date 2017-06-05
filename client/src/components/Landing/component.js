import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap/lib';
import Scroll from 'react-scroll';
import $ from 'jquery';
import { Link } from 'react-router';

var Carousel = require('nuka-carousel');
var { Element, Events, scrollSpy, scroller } = Scroll;
var scroll = Scroll.animateScroll;

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offsetHeight: 0
    };
    this.goToNextDiv = this.goToNextDiv.bind(this);
  }

  changeBasedOnScrollPos(e) {
    let top = window.pageYOffset || document.documentElement.scrollTop;
    // slowly change the opacity of the navbar based on scroll position
    if (document.getElementById('banner-div')) {
      let opacityValue = 0.2 + top/200;
      opacityValue = opacityValue > 0.9 ? 0.9 : opacityValue;
      document.getElementById('navbar-container').style["background-color"] = "rgba(255,255,255," + opacityValue + ")";
      if (document.getElementsByClassName('navbar-collapse collapse')[0] && window.innerWidth < 990)
        document.getElementsByClassName('navbar-collapse collapse')[0].style["background-color"] = "rgba(255,255,255,0.8)";
      else
        document.getElementsByClassName('navbar-collapse')[0].style["background-color"] = "rgba(255,255,255,0)";
    }
    // if landing picture is being shown or at bottom of page, hide 'request appointment' button, and vice versa
    if (document.body.offsetHeight - (window.pageYOffset + window.innerHeight) < 80 ||
        window.pageYOffset < $('#banner-div').height() / 2) {
      $('.schedule-apt').removeClass('showBtn').addClass('hideBtn');
      $('.schedule-apt').removeClass('showBtnText').removeClass('hideBtnText');
    }
    else
      $('.schedule-apt').removeClass('hideBtn').addClass('showBtn');

    // if at the bottom of the page, display 'scroll to top' instead of the arrow button
    if (document.getElementsByClassName('arrowButton')[0]) {
      if (document.body.offsetHeight - (window.pageYOffset + window.innerHeight) < 80)
        document.getElementsByClassName('arrowButton')[0].style["display"] = "none";
      else
        document.getElementsByClassName('arrowButton')[0].style["display"] = "block";
    }
  }

  changeBasedOnResize() {
    let aptButton = document.getElementsByClassName('schedule-apt')[0];
    if (!aptButton) return;
    if (window.innerWidth < 400) {
      aptButton.style['width'] = '50px';
      aptButton.style['height'] = '50px';
      aptButton.style['padding'] = '0 13px';
      aptButton.style['top'] = '90%';
      aptButton.getElementsByTagName('p')[0].style['font-size'] = '13px';
      $('.schedule-apt').find('i').removeClass('fa-lg').addClass('fa-md');
    }
    else {
      aptButton.style['width'] = '70px';
      aptButton.style['height'] = '70px';
      aptButton.style['padding'] = '0 19px';
      aptButton.style['top'] = '50%';
      aptButton.getElementsByTagName('p')[0].style['font-size'] = '15px';
      $('.schedule-apt').find('i').removeClass('fa-md').addClass('fa-lg');
    }
    if (document.getElementsByClassName('navbar-collapse')[0] && window.innerWidth < 990)
      document.getElementsByClassName('navbar-collapse')[0].style['background-color'] = 'rgba(255,255,255,0.8)';
    else
      document.getElementsByClassName('navbar-collapse')[0].style['background-color'] = 'rgba(255,255,255,0)';
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

    if (document.body.offsetHeight - (window.pageYOffset + window.innerHeight) < 80 ||
        window.pageYOffset < $('#banner-div').height() / 2) {
      $('.schedule-apt').addClass('hideBtn');
    }
    else {
      $('.schedule-apt').addClass('showBtn');
    }

    // Add and remove classes for the 'Request an Appointment' button depending on hover state
    $('.schedule-apt').hover(
      function () {
        $(this).removeClass('hideBtnText').addClass('showBtnText');
      },
      function () {
        $(this).removeClass('showBtnText').addClass('hideBtnText');
      }
    );

    // Change carousel's 'prev' and 'next' buttons to arrow icons
    // Need to use javascript because currently using a carousel library
    document.getElementsByClassName('slider-decorator-0')[0].getElementsByTagName('button').value = 
    '<span className="glyphicon glyphicon-chevron-left" />';
    document.getElementsByClassName('slider-decorator-1')[0].getElementsByTagName('button').value = 
    '<span className="glyphicon glyphicon-chevron-right" />';
    this.forceUpdate();

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

    if (document.getElementById('why').getBoundingClientRect().top - navbarHeight > 1) {
      scroller.scrollTo('why-div', options);
    }
    else if (document.getElementById('picture1-element').getBoundingClientRect().top - navbarHeight > 1) {
      scroller.scrollTo('services-div', options);
    }
    else if (document.getElementById('clients').getBoundingClientRect().top - navbarHeight > 1) {
      scroller.scrollTo('clients-div', options);
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
        <Row id="why" className="standard-div">
          <Element name="why-div" className="element">
            <Row>
              <h1>Serving New York since 1989</h1>
              <hr></hr>
            </Row>
            <Col sm={4}>
              <i id="icon1" className="fa fa-check-square-o fa-lg" aria-hidden="true" />
              <h4>No Uncertainties</h4>
              <p className="subtitle">KNOWN FOR RELIABILITY</p>
              <p>Once a deal is confirmed, customers can rest easy knowing that the job will be done correctly.</p>
            </Col>
            <Col sm={4}>
              <i className="fa fa-flash fa-lg" aria-hidden="true" />
              <h4>Proficiency with Efficiency</h4>
              <p className="subtitle">ESTIMATES ARE GIVEN</p>
              <p>Requests for installation and maintenance are fulfilled as quickly and efficiently as possible.</p>
            </Col>
            <Col sm={4}>
              <i className="fa fa-user-o fa-lg" aria-hidden="true" />
              <h4>Thoughtful Customer Service</h4>
              <p className="subtitle">BEYOND STANDARD OFFICE HOURS</p>
              <p>We ensure caring and thoughtful customer service so that no issue is overlooked.</p>
            </Col>
          </Element>
        </Row>
        <Element id="picture1-element" name="services-div" className="element picture-div">>
          <h1>Comprehensive Services</h1>
        </Element>
        <Row id="services" className="standard-div">
          <Row>
            <Col sm={4} id="service1">
              <div>
                <h4>HVAC & Refrigeration</h4>
                <p className="subtitle">INSTALLATION & MAINTENANCE</p>
                <p className="description">...for supermarkets, commercial buildings and industrial businesses</p>
              </div>
            </Col>
            <Col sm={4} id="service2">
              <div>
                <h4>Design Considerations</h4>
                <p className="subtitle">LOAD, NOISE & SPACE</p>
                <p className="description">...avoid future problems through smart design</p>
              </div>
            </Col>
            <Col sm={4} id="service3">
              <div>
                <h4>Troubleshooting</h4>
                <p className="subtitle">BEFORE AND AFTER</p>
                <p className="description">...troubleshooting for systems installed either by us or a different company</p>
              </div>
            </Col>
          </Row>
        </Row>
        <Row id="clients" className="standard-div">
          <Element name="clients-div" className="element">
            <Row>
              <h1>Our Partners</h1>
              <hr></hr>
            </Row>
            <Row>
              <Carousel autoplay={true} autoplayInterval={4000}
                        framePadding="50px 0" initialSlideHeight={100}
                        slidesToShow={3} wrapAround={true}
                        slidesToScroll="auto" slideWidth="250px">
                <img src="https://pbs.twimg.com/profile_images/629038880142921728/uFLEH2d5.jpg" />
                <img src="http://hvacspider.com/media/k2/items/cache/36fdb1a35cd2f54f95cf2119fb5bc7ed_XL.jpg" />
                <img src="http://mehvac.com/images/logo.png" />
                <img src="http://static.wixstatic.com/media/edf714_a8177bc6df634641bae452cf3bc90e8f.jpg" />
                <img src="http://gp-partsdirect.com/media/aitmanufacturers/1494_Tyler_Refrigeration.png" />
                <img src="https://climatecontroltt.com/media/wysiwyg/York/yorklogo.jpg" />
                <img src="https://i.ytimg.com/vi/pSjKU1XA0ps/maxresdefault.jpg" />
              </Carousel>
            </Row>
          </Element>
        </Row>
        <div id="scroll-top">
          <a onClick={this.goToTop}>GO TO TOP</a>
        </div>
        <Row id="copyright" className="standard-div">
          Copyright © 2017, Fresh Air Mechanical Co.
        </Row>
      </div>  
    );
  }
}
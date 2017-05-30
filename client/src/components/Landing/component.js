import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap/lib';
import Scroll from 'react-scroll';
import $ from 'jquery';

var { Link, Element, Events, scrollSpy, scroller } = Scroll;
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
      document.getElementById('navbar-container').style["background-color"] = "rgba(255,255,255," + (0.2 + top/200) + ")";
      document.getElementsByClassName('navbar-collapse')[0].style["background-color"] = "rgba(255,255,255," + ((top/200 < 0.9) ? (top/1000) : 0.5) + ")";
    }
    // if at the bottom of the page, hide arrow Button
    if (document.getElementsByClassName('arrowButton')[0]) {
      if (document.body.offsetHeight - (window.pageYOffset + window.innerHeight) < 80)
        document.getElementsByClassName('arrowButton')[0].style["display"] = "none";
      else
        document.getElementsByClassName('arrowButton')[0].style["display"] = "block";
    }
  }

  initializeNavbarOpacity() {
    let top = window.pageYOffset || document.documentElement.scrollTop;
    if (top === 0) {
      document.getElementById('navbar-container').style["background-color"] = "rgba(255,255,255,0.2)";
      document.getElementsByClassName('navbar-collapse')[0].style["background-color"] = "rgba(255,255,255,0)";
    }
  }

  centerImages() {
    document.getElementById
  }

  componentDidMount() {
    this.initializeNavbarOpacity();
    scroll.scrollToTop({duration: 1});

    window.addEventListener('scroll', this.changeBasedOnScrollPos);

    // Change state variable 'animating' so that the user cannot spam click the arrow button
    let thisComponent = this;
    Events.scrollEvent.register('begin', function(to, element) {
      thisComponent.setState({animating: true})
    });
    Events.scrollEvent.register('end', function(to, element) {
      thisComponent.setState({animating: false})
    });

    this.centerImages();

    scrollSpy.update();
  }

  componentWillUnmount() {
    // Reset opacity for other component views
    document.getElementById('navbar-container').style["background-color"] = "rgba(255,255,255,1)";
    document.getElementsByClassName('navbar-collapse')[0].style["background-color"] = "rgba(255,255,255,1)";
    window.removeEventListener('scroll', this.changeNavbarOnScroll);
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  goToNextDiv() {
    let { currentDiv, animating } = this.state;
    if (animating) return;
    let options = {
      offset: -130, 
      spy: true,
      smooth: true,
      duration: 500
    };

    let navbarHeight = $('#navbar-container').height();
    if (document.getElementById('why').getBoundingClientRect().top - navbarHeight > 0) {
      scroller.scrollTo('why-div', options);
    }
    else if (document.getElementById('services').getBoundingClientRect().top - navbarHeight > 0) {
      scroller.scrollTo('services-div', options);
    }
    else {
      if (document.getElementById('clients').getBoundingClientRect().top - navbarHeight > 0)
        scroller.scrollTo('clients-div', options);
      let arrowButtonStyle = document.getElementsByClassName('arrowButton')[0].style;
      arrowButtonStyle.display = 'none';
    }
  }

  render() {
    let { offsetHeight } = this.state;
    return (
      <div>
        <a onClick={this.goToNextDiv} className="arrowButton">
          <img id="scrollImage" src={require('lib/images/arrows.png')} alt="SCROLL DOWN" />
        </a>
        <Row className="picture-div" id="banner-div">
          <img id="landing-left" className="landing-triangles" src={require('lib/images/landing_left.png')} />
          <img id="landing-right" className="landing-triangles" src={require('lib/images/landing_right.png')} />
          <img id="landing1" className="landingImages" src={require('lib/images/landing1.png')} />
        </Row>
        <Row id="why" className="standard-div">
          <Element name="why-div" className="element">
            <Row>
              <h1>450+ Clients since 1989</h1>
              <hr></hr>
            </Row>
            <Col sm={4}>
              <i id="icon1" className="fa fa-check-square-o fa-lg" aria-hidden="true" />
              <h4>No Uncertainties</h4>
              <p className="description">KNOWN FOR RELIABILITY</p>
              <p>Once a deal is confirmed, customers can rest easy knowing that the job will be done correctly.</p>
            </Col>
            <Col sm={4}>
              <i className="fa fa-flash fa-lg" aria-hidden="true" />
              <h4>Proficiency with Efficiency</h4>
              <p className="description">ESTIMATES ARE GIVEN</p>
              <p>Requests for installation and maintenance are fulfilled as quickly and efficiently as possible.</p>
            </Col>
            <Col sm={4}>
              <i className="fa fa-user-o fa-lg" aria-hidden="true" />
              <h4>Thoughtful Customer Service</h4>
              <p className="description">BEYOND STANDARD OFFICE HOURS</p>
              <p>We ensure caring and thoughtful customer service so that no issue is overlooked.</p>
            </Col>
          </Element>
        </Row>
        <Row id="services" className="picture-div" id="picture1-div">
          <h1>Examples of Services</h1>
        </Row>
        <Row className="standard-div">
          <Element name="services-div" className="element">
            <Row>
              <ul>
                <li>HVAC Installation and Maintenance for personal homes, commercial buildings, and industrial businesses</li>
                <li>Design Considerations that calculate load, noise and space to prevent any future problems </li>
                <li>Troubleshooting for systems installed either by us or a different company</li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </Row>
          </Element>
        </Row>
        <Row id="clients" className="standard-div">
          <Element name="clients-div" className="element">
            <Row>
              <h1>Some of Our Clients</h1>
              <hr></hr>
            </Row>
            <Row>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Duane_Reade_Logo.svg/849px-Duane_Reade_Logo.svg.png" />
                    </td>
                    <td>
                      <img src="https://keyfood.com/wp-content/uploads/2015/03/55-Fulton-Market-300x151.jpg" />
                    </td>
                    <td>
                      <img src="https://res.cloudinary.com/grubhub/image/upload/w_400,h_300,f_auto,fl_lossy,q_80,c_fit/u7i8y6yoyawurbjoemlz" />
                    </td>
                    <td>
                      <img src="http://www.parisbaguettefamily.com/wp-content/uploads/2017/01/Banner-Logo.png" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Denny%27s_logo.svg/1280px-Denny%27s_logo.svg.png" />
                    </td>
                    <td>
                      <img src="http://static1.squarespace.com/static/562945abe4b085cd47b1544a/t/58c082535016e17d84d2d9e3/1493142648920/?format=1000w" />
                    </td>
                    <td>
                      <img src="https://pbs.twimg.com/profile_images/3410282975/e2f70ac63fdeb89952b8a367af4fb6f0_400x400.jpeg" />
                    </td>
                    <td>
                      <img src="https://static.wixstatic.com/media/675c78_0bdb26979548483bb1d31c799f9f94a2.png_srz_382_130_85_22_0.50_1.20_0.00_png_srz" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Row>
          </Element>
        </Row>
        <Row id="copyright" className="standard-div">
          Copyright © 2017, Fresh Air Mechanical Co.
        </Row>
      </div>  
    );
  }
}
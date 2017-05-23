import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap/lib';
import Scroll from 'react-scroll';

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

  changeOpacityOnScroll(e) {
    let top = window.pageYOffset || document.documentElement.scrollTop;
    document.getElementById('navbar-container').style["background-color"] = "rgba(255,255,255," + top/200 + ")";
    document.getElementsByClassName('navbar-collapse')[0].style["background-color"] = "rgba(255,255,255," + ((top/200 < 0.9) ? (top/1000) : 0.5) + ")";
  }

  initializeNavbarOpacity() {
    let top = window.pageYOffset || document.documentElement.scrollTop;
    if (top === 0) {
      document.getElementById('navbar-container').style["background-color"] = "rgba(255,255,255,0)";
      document.getElementsByClassName('navbar-collapse')[0].style["background-color"] = "rgba(255,255,255,0)";
    }
  }

  componentDidMount() {
    let bodyTop = document.body.getBoundingClientRect().top
    this.setState({
      whyDivOffset: document.getElementById('why').getBoundingClientRect().top - bodyTop,
      servicesDivOffset: document.getElementById('services').getBoundingClientRect().top - bodyTop,
      clientsDivOffset: document.getElementById('clients').getBoundingClientRect().top - bodyTop
    })

    this.initializeNavbarOpacity();
    scroll.scrollToTop({duration: 300});

    window.addEventListener('resize', e => {
      this.setState({offsetHeight: document.getElementById('navbar-container').offsetHeight});
    })
    window.addEventListener('scroll', this.changeOpacityOnScroll);

    // Change state variable 'animating' so that the user cannot spam click the arrow button
    let thisComponent = this;
    Events.scrollEvent.register('begin', function(to, element) {
      thisComponent.setState({animating: true})
    });
    Events.scrollEvent.register('end', function(to, element) {
      thisComponent.setState({animating: false})
    });

    scrollSpy.update();
  }

  componentWillUnmount() {
    // Reset opacity for other component views
    document.getElementById('navbar-container').style["background-color"] = "rgba(255,255,255,1)";
    document.getElementsByClassName('navbar-collapse')[0].style["background-color"] = "rgba(255,255,255,1)";
    window.removeEventListener('scroll', this.changeOpacityOnScroll);
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  goToNextDiv() {
    let { currentDiv, animating, whyDivOffset, servicesDivOffset, clientsDivOffset } = this.state;
    if (animating) return;
    let options = {
      offset: -130, 
      spy: true,
      smooth: true,
      duration: 500
    };

    console.log(window.pageYOffset, whyDivOffset, servicesDivOffset, clientsDivOffset)

    if (window.pageYOffset + 75 * window.innerWidth / 900 < whyDivOffset) {
      scroller.scrollTo('why-div', options);
    }
    else if (window.pageYOffset + 75 * window.innerWidth / 900 < servicesDivOffset) {
      scroller.scrollTo('services-div', options);
    }
    else {
      if (window.pageYOffset + 75 * window.innerWidth / 900 < clientsDivOffset)
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
        <Row id="banner-div">
        </Row>
        <Row id="why" className="standard-div">
          <Element name="why-div" className="element">
            <Row>
              <h1>Why FRESH AIRE</h1>
              <hr></hr>
            </Row>
            <Col sm={4}>
              <h2><i className="fa fa-check-square-o fa-lg" aria-hidden="true"></i>Reliability</h2>
              <p>Once a deal is confirmed, customers can rest easy knowing that the job will be done correctly.</p>
            </Col>
            <Col sm={4}>
              <h2><i className="fa fa-flash fa-lg" aria-hidden="true"></i>Efficiency</h2>
              <p>Requests for installation and maintenance are fulfilled as quickly and efficiently as possible.</p>
            </Col>
            <Col sm={4}>
              <h2><i className="fa fa-user-o fa-lg" aria-hidden="true"></i>Serviceability</h2>
              <p>We ensure caring and thoughtful customer service so that no issue is overlooked.</p>
            </Col>
          </Element>
        </Row>
        <Row id="services" className="standard-div">
          <Element name="services-div" className="element">
            <Row>
              <h1>Examples of Services</h1>
              <hr></hr>
            </Row>
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
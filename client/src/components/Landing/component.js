import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap/lib';
import Scroll from 'react-scroll';
import PartnerSlider from 'lib/Slider';
import ApptBtn from 'lib/ApptBtn';
import overviews from 'lib/objects/overviews';
import why from 'lib/objects/why';
import services from 'lib/objects/services';
import objectFitImages from 'object-fit-images';

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
    this.changeBasedOnScrollPos = this.changeBasedOnScrollPos.bind(this);
    this.listeningNavBarFontColors = this.listeningNavBarFontColors.bind(this);
  }

  changeBasedOnScrollPos(e) {
    let top = window.pageYOffset || document.documentElement.scrollTop;
    // slowly change the opacity of the navbar based on scroll position
    if (document.getElementById('banner-div')) {
      let opacityValue = 0.2 + top/200;
      opacityValue = opacityValue > 0.9 ? 0.9 : opacityValue;
      document.getElementById('navbar-container').style['background-color'] = "rgba(255,255,255," + opacityValue + ")";
      if (document.getElementsByClassName('navbar-collapse collapse')[0] && window.innerWidth < 768) {
        document.getElementsByClassName('navbar-collapse collapse')[0].style['background-color'] = "rgba(255,255,255,0.8)";
      }
      else {
        document.getElementsByClassName('navbar-collapse')[0].style['background-color'] = "rgba(255,255,255,0)";
      }
    }
    let aptButton = document.getElementsByClassName('schedule-apt')[0];
    if (!aptButton) return;
    // if landing picture is being shown or at bottom of page, hide 'request appointment' button, and vice versa
    if (document.body.offsetHeight - (window.pageYOffset + window.innerHeight) < 120 ||
        window.pageYOffset < document.getElementById('navbar-container').offsetHeight / 2) {
      aptButton.classList.add('hideBtn');
      aptButton.classList.remove('showBtn');
      aptButton.classList.add('hideBtnText');
      aptButton.classList.remove('showBtnText');
    }
    else {
      aptButton.classList.remove('hideBtn');
      aptButton.classList.add('showBtn');
    }

    // if at the bottom of the page, hide the arrow button
    let arrowButton = document.getElementsByClassName('arrowButton')[0];
    if (arrowButton) {
      if (document.body.offsetHeight - (window.pageYOffset + window.innerHeight) < 80) {
        arrowButton.style["display"] = "none";
      }
      else {
        arrowButton.style["display"] = "block";
      }
    }
  }

  // Function that runs when the window changes size
  changeBasedOnResize() {
    let aptButton = document.getElementsByClassName('schedule-apt')[0];
    if (!aptButton) return;
    if (window.innerWidth < 400) {
      aptButton.style.width = '50px';
      aptButton.style.height = '50px';
      aptButton.style.padding = '0 13px';
      aptButton.style.top = '90%';
      aptButton.getElementsByTagName('p')[0].style['font-size'] = '13px';
      aptButton.getElementsByTagName('i')[0].classList.remove('fa-lg');
      aptButton.getElementsByTagName('i')[0].classList.add('fa-md');
    }
    else {
      aptButton.style.width = '70px';
      aptButton.style.height = '70px';
      aptButton.style.padding = '0 19px';
      aptButton.style.top = '50%';
      aptButton.getElementsByTagName('p')[0].style['font-size'] = '15px';
      aptButton.getElementsByTagName('i')[0].classList.remove('fa-md');
      aptButton.getElementsByTagName('i')[0].classList.add('fa-lg');
    }
  }

  initializeNavbarOpacity() {
    let top = window.pageYOffset || document.documentElement.scrollTop;
    if (top === 0) {
      document.getElementById('navbar-container').style['background-color'] = 'rgba(255,255,255,0.2)';
    }
  }

  changeNavBarFontColors(unmounting) {
    // Invert font color based on scroll position.
    // At the top, white.
    // Otherwise, black.
    let top = window.pageYOffset || document.documentElement.scrollTop;
    let links = document.getElementsByClassName('navbar-text');
    Array.from(links).forEach(link => {
      if (unmounting || top >= 29) {
        link.style["color"] = "black";
      }
      else {
        link.style["color"] = "white";
      }
    });
  }

  // This function is purely to remove the event listener
  // when the landing page unmounts, so that other pages won't 
  // let the navbar's font color change based on scroll position.
  listeningNavBarFontColors() {
    this.changeNavBarFontColors(false);
  }

  componentDidMount() {
    objectFitImages();
    this.initializeNavbarOpacity();
    scroll.scrollToTop({duration: 1});
    // Set a timeout before updating colors so that the font can change
    // after the session logs in the user. Without the timeout,
    // the text for the user's first name/username would remain black.
    // If there is no session, then the font becomes white normally.
    window.setTimeout(() => {
      this.changeNavBarFontColors(false);
    }, 400);

    window.addEventListener('scroll', this.changeBasedOnScrollPos);
    window.addEventListener('scroll', this.listeningNavBarFontColors);
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

    let aptButton = document.getElementsByClassName('schedule-apt')[0];

    // This is a repeat from a part of changeBasedOnScrollPos, need to repeat to remove
    // buggy behavior where button displays its text at the wrong position, even when not hovered, when the component
    // mounts (on refresh of the page).
    // Add and remove classes for the 'Request an Appointment' button depending on scroll position
    // Hide the button at the top (b/c it shows the banner) and at the bottom (b/c it conflicts with the carousel's buttons)
    if (document.body.offsetHeight - (window.pageYOffset + window.innerHeight) < 80 ||
        window.pageYOffset < document.getElementById('navbar-container').offsetHeight / 2) {
      aptButton.classList.add('hideBtn');
      aptButton.classList.add('hideBtnText');
    }
    else {
      aptButton.classList.add('showBtn');
      aptButton.classList.add('hideBtnText');
    }

    // Add and remove classes for the 'Request an Appointment' button's text depending on hover state
    aptButton.addEventListener('mouseover', () => {
      aptButton.classList.remove('hideBtnText');
      aptButton.classList.add('showBtnText');
    });
    aptButton.addEventListener('mouseout', () => {
      aptButton.classList.remove('showBtnText');
      aptButton.classList.add('hideBtnText');
    });

    // When hovering over a service, make all other services dim
    let serviceCols = document.getElementById('services').getElementsByClassName('col-sm-6');
    Array.from(serviceCols).forEach(hoveredCol => {
      hoveredCol.addEventListener('mouseover', () => {
        let myClasses = hoveredCol.getElementsByTagName('div')[0].classList;
        // Check if the classList contains makeDim first so that the makeBright
        // animation doesn't run when you first hover over a service
        if (myClasses.contains('makeDim')) {
          myClasses.add('makeBright');
        }
        myClasses.remove('makeDim');
        Array.from(serviceCols).forEach(sibling => {
          if (hoveredCol === sibling) return;
          let siblingClasses = sibling.getElementsByTagName('div')[0].classList;
          siblingClasses.add('makeDim');
          siblingClasses.remove('makeBright');
        });
      });
      hoveredCol.addEventListener('mouseout', () => {
        hoveredCol.getElementsByTagName('div')[0].classList.remove('makeBright');
      });
    });

    // After hovering over the 'services' section and leaving, make all services bright again
    let serviceRow = document.getElementById('services').getElementsByClassName('row')[0];
    serviceRow.addEventListener('mouseout', () => {
      let cols = serviceRow.getElementsByClassName('col-sm-6');
      Array.from(cols).forEach(col => {
        let colClasses = col.getElementsByTagName('div')[0].classList;
        if (colClasses.contains('makeDim')) {
          colClasses.add('makeBright');
        }
        colClasses.remove('makeDim');
      });
    });

    scrollSpy.update();
  }

  componentDidUpdate() {
    // This is so that when the user logs out while on the landing page with the scroll position
    // at the very top, make the 'Login/Sign Up' button appear white as well
    this.changeNavBarFontColors(false);
  }

  componentWillUnmount() {
    // Reset the navbar's opacity for other component views, since the landing page
    // is the only view that makes the navbar opacity change
    this.changeNavBarFontColors(true);
    document.getElementById('navbar-container').style['background-color'] = "rgba(255,255,255,0.9)";
    if (window.innerWidth >= 768) {
      document.getElementsByClassName('navbar-collapse')[0].style['background-color'] = "rgba(255,255,255,0)";
    }
    else {
      document.getElementsByClassName('navbar-collapse')[0].style['background-color'] = "rgba(255,255,255,0.9)";
    }
    window.removeEventListener('scroll', this.listeningNavBarFontColors);
    window.removeEventListener('scroll', this.changeNavbarOnScroll);
    window.removeEventListener('resize', this.changeBasedOnResize);
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  // Function runs when the arrow button at the bottom of the page is clicked
  //    Go to the next section based on the browser's current scroll position
  goToNextDiv() {
    let { currentDiv, animating } = this.state;
    if (animating) return;
    let navbarHeight = document.getElementById('navbar-container').offsetHeight;
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
        <ApptBtn />
        <a onClick={this.goToNextDiv} className="arrowButton">
          <img id="scrollImage" src='https://res.cloudinary.com/fresh-aire-mechanical-co/image/upload/v1505364359/arrows_c4rxxj.png' alt="SCROLL DOWN" />
        </a>
        <Row className="picture-div" id="banner-div">
          <div id="banner-background"></div>
          <img id="landing-left" className="landing-triangles" src={require('lib/images/landing_left.png')} />
          <img id="landing-right" className="landing-triangles" src={require('lib/images/landing_right.png')} />
          <img id="landing1" className="landing-images" src={require('lib/images/landing1.png')} />
        </Row>
        <Row id="overview" className="standard-div">
          <Element name="overview-div" className="element" id="overview-element">
            <Row>
              {
                Object.keys(overviews).map((key, index) => {
                  let overview = overviews[key];
                  let id = "overview" + (index + 1);
                  return (
                    <Col sm={4} id={id} key={id}>
                      <div className='overview-text'>
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
                <Col sm={4} key={id}>
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
                  <Col sm={6} id={id} key={id}>
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
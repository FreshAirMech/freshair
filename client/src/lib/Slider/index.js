import React, { Component } from 'react';
import Slider from 'react-slick';
import './index.css';

class PrevNavButton extends React.Component {
  render() {
    return <button onClick={this.props.onClick} className='fa fa-chevron-circle-left fa-3x' />
  }
}

class NextNavButton extends React.Component {
  render() {
    return <button onClick={this.props.onClick} className='fa fa-chevron-circle-right fa-3x' />
  }
}

export default class PartnerSlider extends Component {
	constructor(props) {
		super(props);
    this.state = {
    };
	}

  componentDidMount() {
    let numSlides = Math.floor(window.innerWidth / 260);
    this.setState({ numSlides });
    window.addEventListener('resize', () => {
      let numSlides = Math.floor(window.innerWidth / 260);
      this.setState({ numSlides });
    });
  }

  render() {
    var settings = {
    	dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: this.state.numSlides,
      slidesToScroll: this.state.numSlides,
      autoplay: true,
      autoplaySpeed: 4000,
      prevArrow: <PrevNavButton/>,
      nextArrow: <NextNavButton/>
    };
    return (
      <Slider {...settings}>
        <div className="partner"><img src={require('lib/images/abco.jpg')} /></div>
        <div className="partner"><img src="http://hvacspider.com/media/k2/items/cache/36fdb1a35cd2f54f95cf2119fb5bc7ed_XL.jpg" /></div>
        <div className="partner"><img src="http://mehvac.com/images/logo.png" /></div>
        <div className="partner"><img src="http://static.wixstatic.com/media/edf714_a8177bc6df634641bae452cf3bc90e8f.jpg" /></div>
        <div className="partner"><img src="http://gp-partsdirect.com/media/aitmanufacturers/1494_Tyler_Refrigeration.png" /></div>
        <div className="partner"><img src="https://climatecontroltt.com/media/wysiwyg/York/yorklogo.jpg" /></div>
        <div className="partner"><img src="https://i.ytimg.com/vi/pSjKU1XA0ps/maxresdefault.jpg" /></div>
      </Slider>
    );
  }
}
import React, { Component } from 'react';
import Slider from 'react-slick';
import './index.scss';

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
    this.changeNumSlides = this.changeNumSlides.bind(this);
	}

  changeNumSlides() {
    let numSlides = Math.floor(window.innerWidth / 260);
    this.setState({ numSlides });
  }

  componentWillMount() {
    this.changeNumSlides();
    window.addEventListener('resize', this.changeNumSlides);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeNumSlides);
  }

  render() {
    var settings = {
      infinite: true,
      speed: 500,
      slidesToShow: this.state.numSlides,
      slidesToScroll: this.state.numSlides,
      autoplay: true,
      autoplaySpeed: 5000,
      prevArrow: <PrevNavButton/>,
      nextArrow: <NextNavButton/>
    };
    return (
      <Slider {...settings}>
        <div className="partner"><img src={require('lib/images/abco.jpg')} /></div>
        <div className="partner"><img src="https://www.edissonelectric.com/wp-content/uploads/2015/09/Sporlan-2.png" /></div>
        <div className="partner"><img src="https://mehvac.com/images/logo.png" /></div>
        <div className="partner"><img src="https://static.wixstatic.com/media/edf714_a8177bc6df634641bae452cf3bc90e8f.jpg" /></div>
        <div className="partner"><img src="https://gp-partsdirect.com/media/aitmanufacturers/1494_Tyler_Refrigeration.png" /></div>
        <div className="partner"><img src="https://climatecontroltt.com/media/wysiwyg/York/yorklogo.jpg" /></div>
        <div className="partner"><img src="https://i.ytimg.com/vi/pSjKU1XA0ps/maxresdefault.jpg" /></div>
        <div className="partner"><img src="https://www.knuthrefrigeration.com/wp-content/uploads/2016/03/logo_NEW_kysor_warren.jpg" /></div>
      </Slider>
    );
  }
}
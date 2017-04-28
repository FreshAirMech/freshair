import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap/lib';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Row>
          <img id="banner" src={require('../../lib/images/landing.png')} alt="FRESH AIR" />
        </Row>
        <Row id="why" className="landing-div">
          <Row>
            <h1>Why Others Choose FRESH AIR</h1>
            <hr></hr>
          </Row>
          <Col sm={4}>
            <h2><i className="fa fa-check-square-o fa-lg" aria-hidden="true"></i>  Reliability</h2>
            <p>Once a deal is confirmed, customers can rest easy knowing that the job will be done correctly.</p>
          </Col>
          <Col sm={4}>
            <h2><i className="fa fa-flash fa-lg" aria-hidden="true"></i>  Efficiency</h2>
            <p>Requests for installation and maintenance are fulfilled as quickly and efficiently as possible.</p>
          </Col>
          <Col sm={4}>
            <h2><i className="fa fa-user-o fa-lg" aria-hidden="true"></i>  Serviceability</h2>
            <p>We ensure caring and thoughtful customer service so that no issue is overlooked.</p>
          </Col>
        </Row>
        <Row id="services" className="landing-div">
          <Row>
            <h1>Examples of Services</h1>
            <hr></hr>
          </Row>
          <Row>
            <ul>
              <li>Air Conditioning and Refrigeration Installation and Maintenance</li>
              <li>Design Considerations that calculate load, noise and space to prevent any future problems </li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </Row>
        </Row>
        <Row id="clients" className="landing-div">
          <Row>
            <h1>Some of Our Clients</h1>
            <hr></hr>
          </Row>
          <Row>
            <table>
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
                  <img src="http://static1.squarespace.com/static/562945abe4b085cd47b1544a/t/58c082535016e17d84d2d9e3/1493142648920/?format=1000w" />
                </td>
                <td>

                </td>
              </tr>
            </table>
            
          </Row>
        </Row>
      </div>  
    );
  }
}
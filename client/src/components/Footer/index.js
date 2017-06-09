import React, { Component } from 'react';
import { Row } from 'react-bootstrap/lib';
import { Link } from 'react-router';
import './index.css';

export default (props) => {
	return (
		<Row id="copyright" className="standard-div">
		  <h4>
		    <Link to={{ pathname: '/' }}>HOME</Link>
		    <Link to={{ pathname: '/' }} onClick={props.goToServices}>SERVICES</Link>
		    <Link to={{ pathname: '/request' }}>REQUEST APPT.</Link>
		    <Link to={{ pathname: '/about' }}>ABOUT/CONTACT</Link>
		  </h4>
		  Copyright © 2017, Fresh Air Mechanical Co.
		</Row>
	);
}
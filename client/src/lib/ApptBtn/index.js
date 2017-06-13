import React from 'react';
import { Link } from 'react-router';
import './index.css';

export default () => {
  return (
    <Link to={{ pathname: '/request' }}>
      <button type="button" className="btn btn-default btn-circle btn-xl schedule-apt">
        <p>Request an Appointment</p>
        <i className="fa fa-calendar fa-lg"></i>
      </button>
    </Link>
  );
}
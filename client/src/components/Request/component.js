import React, { Component } from 'react';
import { Col, Row, Panel, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';
import { isPhoneNumber } from 'lib/functions/authentication';
import Scroll from 'react-scroll';
var scroll = Scroll.animateScroll;

export default class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      message: '',
      sentEmail: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitRequestForm = this.submitRequestForm.bind(this);
    this.checkFormIsValid = this.checkFormIsValid.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      sentEmail: false
    });
  }

  submitRequestForm(e) {
    const { name, email, phone, address, message } = this.state;
    const { requestSendEmail } = this.props;

    e.preventDefault();

    this.setState({
      sentEmail: true,
      isFetching: true
    });

    requestSendEmail({
      name,
      email,
      phone,
      address,
      message
    });
  }

  checkFormIsValid() {
    const { name, email, phone, address, message } = this.state;

    return (isPhoneNumber(phone) && phone || !phone) && name && email && address && message;
  }

  fillOutForm() {
    if (!this.state.firstName && this.props.firstName) {
      this.setState({
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        name: (this.props.firstName + ' ' + this.props.lastName) || '', 
        email: this.props.email,
        phone: this.props.phone,
        address: '',
        message: '',
        sentEmail: false
      });
    }
  }

  componentDidUpdate() {
    this.fillOutForm.bind(this)();
  }

  componentWillMount() {
    this.fillOutForm.bind(this)();
  }

  componentDidMount() {
    scroll.scrollToTop({duration: 1});
    this.changeFormPadding();
    window.addEventListener('resize', this.changeFormPadding);
  }

  changeFormPadding() {
    let cols = document.getElementsByClassName('col-sm-4');
    for (let i = 0; i < cols.length; i++) {
      if (window.innerWidth < 768)
        cols[i].style.padding = '0';
      else
        cols[i].style.padding = '4%';
    }
  }

  render() {
    let { name, email, phone, message, sentEmail, address } = this.state;
    const { isFetching, error } = this.props;
    const { submitRequestForm, handleChange, checkFormIsValid } = this;
    return (
      <Form onSubmit={submitRequestForm} id="request-form">
        <h3>Request an Appointment</h3>
        <p>Schedule an appointment with us here. We will contact you as soon as possible.</p>
        <Col sm={4} id="request-form-left">
          <FormGroup>
            <ControlLabel>Name *</ControlLabel>
            <FormControl
              name="name"
              type="text"
              value={ name }
              onChange={handleChange}
              placeholder="e.g. John Doe"
            />
          </FormGroup>
        </Col>
        <Col sm={4} id="request-form-middle">
          <FormGroup>
            <ControlLabel>Email *</ControlLabel>
            <FormControl
              name="email"
              type="email"
              value={ email }
              onChange={handleChange}
              placeholder="e.g. johndoe123@gmail.com"
            />
          </FormGroup>
        </Col>
        <Col sm={4} id="request-form-right">
          <FormGroup>
            <ControlLabel>Phone</ControlLabel>
            <FormControl
              name="phone"
              type="text"
              value={ phone }
              onChange={handleChange}
              placeholder="e.g. (123) 456-7890"
            />
          </FormGroup>
        </Col>
        <FormGroup>
          <ControlLabel>Address *</ControlLabel>
          <FormControl
            name="address"
            type="text"
            value={ address }
            onChange={handleChange}
            placeholder="Street Address"
          />
        </FormGroup>
        <Col id="request-form-message">
          <FormGroup>
            <ControlLabel>Message *</ControlLabel>
            <FormControl
              name="message"
              componentClass="textarea"
              value={ message }
              onChange={handleChange}
              placeholder="How can we help?"
            />
          </FormGroup>
        </Col>
        <FormGroup validationState="error" className="auth-form-error request-form-error">
          <Button className="button-green" id="request-form-button" type="submit" disabled={ !checkFormIsValid() } bsStyle="success">
            { isFetching ? <Spinner /> : 'Send Appointment Request' }
          </Button>
          {
            (sentEmail && !isFetching && !error) && <ControlLabel className="request-form-response auth-form-message-success">Sent!</ControlLabel>
          }
          {
            (!isFetching && error) && <ControlLabel className="auth-form-message-error request-form-response">{ error.message }</ControlLabel>
          }
          <p id="request-form-required">*Required fields</p>
        </FormGroup>
      </Form>
    );
  }
}
import React, { Component } from 'react';
import { Col, Row, Panel, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';
import { isPhoneNumber } from 'lib/functions/authentication';

export default class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      subject: '',
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
    const { name, email, phone, subject, message } = this.state;
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
      subject,
      message
    });
  }

  checkFormIsValid() {
    const { name, email, phone, subject, message } = this.state;

    return (isPhoneNumber(phone) && phone || !phone) && name && email && subject && message;
  }

  fillOutForm() {
    if (!this.state.firstName && this.props.firstName) {
      this.setState({
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        name: (this.props.firstName + ' ' + this.props.lastName) || '', 
        email: this.props.email,
        phone: this.props.phone,
        subject: '',
        message: '',
        address: '',
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

  render() {
    let { name, email, phone, subject, message, sentEmail, address } = this.state;
    const { isFetching, error } = this.props;
    const { submitRequestForm, handleChange, checkFormIsValid } = this;
    return (
      <Form onSubmit={submitRequestForm} id="request-form">
        <h1>Request an Appointment</h1>
        <Col sm={4} id="request-form-left">
          <FormGroup>
            <ControlLabel>Name *</ControlLabel>
            <FormControl
              name="name"
              type="text"
              value={ name }
              onChange={handleChange}
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
          />
        </FormGroup>
        <Col sm={4} id="request-form-left">
          <FormGroup>
            <ControlLabel>City *</ControlLabel>
            <FormControl
              name="name"
              type="text"
              value={ name }
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col sm={4} id="request-form-middle">
          <FormGroup>
            <ControlLabel>State *</ControlLabel>
            <FormControl
              name="email"
              type="email"
              value={ email }
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col sm={4} id="request-form-right">
          <FormGroup>
            <ControlLabel>Zip Code</ControlLabel>
            <FormControl
              name="phone"
              type="text"
              value={ phone }
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col id="request-form-message">
          <FormGroup>
            <ControlLabel>Message *</ControlLabel>
            <FormControl
              name="message"
              componentClass="textarea"
              value={ message }
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <FormGroup validationState="error" className="auth-form-error request-form-error">
          <Button id="request-form-button" type="submit" disabled={ !checkFormIsValid() } bsStyle="success">
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
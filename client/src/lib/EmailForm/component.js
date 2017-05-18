import React, { Component } from 'react';
import { Panel, Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';
import { isPhoneNumber } from 'lib/functions/authentication';
import { Col } from 'react-bootstrap/lib';

export default class EmailForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sentEmail: false
		};
		this.handleChange = this.handleChange.bind(this);
    this.submitEmailForm = this.submitEmailForm.bind(this);
		this.checkFormIsValid = this.checkFormIsValid.bind(this);
	}

	handleChange(e) {
		this.setState({
      [e.target.name]: e.target.value,
      sentEmail: false
    });
	}

	submitEmailForm(e) {
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
  	if (!this.state.email && this.props.email) {
	  	this.setState({
				firstName: this.props.firstName,
				lastName: this.props.lastName,
				name: (this.props.firstName + ' ' + this.props.lastName) || '', 
				email: this.props.email,
				phone: this.props.phone,
				subject: '',
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

	render() {
		let { name, email, phone, subject, message, sentEmail } = this.state;
		const { isFetching, error } = this.props;
		const { submitEmailForm, handleChange, checkFormIsValid } = this;
		return (
			<Form onSubmit={submitEmailForm}>
				<Col sm={4} id="emailForm-name">
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
				<Col sm={4} id="emailForm-email">
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
				<Col sm={4} id="emailForm-phone">
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
			    <ControlLabel>Subject *</ControlLabel>
			    <FormControl
			      name="subject"
			      type="text"
			      value={ subject }
			      onChange={handleChange}
			    />
			  </FormGroup>
			  <Col id="emailForm-message">
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
			  <FormGroup validationState="error" className="auth-form-error">
			  	<p id="emailForm-required">*Required fields</p>
			    <Button id="emailForm-button" type="submit" disabled={ !checkFormIsValid() } bsStyle="success">
			      { isFetching ? <Spinner /> : 'Send Email Message' }
			    </Button>
			    {
			      (sentEmail && !isFetching && !error) && <ControlLabel className="auth-form-message-success">Sent!</ControlLabel>
			    }
			    {
			      (!isFetching && error) && <ControlLabel className="auth-form-message-error">{ error.message }</ControlLabel>
			    }
			  </FormGroup>
			</Form>
		);
	}
}
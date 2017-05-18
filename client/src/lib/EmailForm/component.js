import React, { Component } from 'react';
import { Panel, Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';
import { isPhoneNumber } from 'lib/functions/authentication';
import { Col } from 'react-bootstrap/lib';

export default class EmailForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: props.firstName,
			lastName: props.lastName,
			name: (props.firstName + ' ' + props.lastName) || '', 
			email: props.email,
			phone: props.phone,
			subject: '',
			message: '',
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
    	isFetchingMessage: true
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

	render() {
		let { name, email, phone, subject, message, sentEmail } = this.state;
		const { isFetchingMessage, errorMessage } = this.props;
		const { submitEmailForm, handleChange, checkFormIsValid } = this;
		return (
			<Form onSubmit={submitEmailForm}>
			  <FormGroup>
			    <ControlLabel>Name</ControlLabel>
			    <FormControl
			      name="name"
			      type="text"
			      value={ name }
			      onChange={handleChange}
			    />
			  </FormGroup>

			  <FormGroup>
			    <ControlLabel>Email</ControlLabel>
			    <FormControl
			      name="email"
			      type="email"
			      value={ email }
			      onChange={handleChange}
			    />
			  </FormGroup>

			  <FormGroup>
			    <ControlLabel>Phone</ControlLabel>
			    <FormControl
			      name="phone"
			      type="text"
			      value={ phone }
			      onChange={handleChange}
			    />
			  </FormGroup>

			  <FormGroup>
			    <ControlLabel>Subject</ControlLabel>
			    <FormControl
			      name="subject"
			      type="text"
			      value={ subject }
			      onChange={handleChange}
			    />
			  </FormGroup>

			  <FormGroup>
			    <ControlLabel>Message</ControlLabel>
			    <FormControl
			      name="message"
			      type="text"
			      value={ message }
			      onChange={handleChange}
			    />
			  </FormGroup>

			  <FormGroup validationState="error" className="auth-form-error">
			    <Button type="submit" disabled={ !checkFormIsValid() } bsStyle="success">
			      { isFetchingMessage ? <Spinner /> : 'Send Email Message' }
			    </Button>
			    {
			      (sentEmail && !isFetchingMessage && !errorMessage) && <ControlLabel className="auth-form-message-success">Sent!</ControlLabel>
			    }
			    {
			      (!isFetchingMessage && errorMessage) && <ControlLabel className="auth-form-message-error">{ errorMessage.message }</ControlLabel>
			    }
			  </FormGroup>
			</Form>
		);
	}
}
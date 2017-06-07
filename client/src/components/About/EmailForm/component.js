import React, { Component } from 'react';
import { Col, Panel, Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';
import { isPhoneNumber } from 'lib/functions/authentication';

export default class EmailForm extends Component {
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
  	if (!this.state.firstName && this.props.firstName) {
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

  componentDidMount() {
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
		let { name, email, phone, subject, message, sentEmail } = this.state;
		const { isFetching, error } = this.props;
		const { submitEmailForm, handleChange, checkFormIsValid } = this;
		return (
			<Form onSubmit={submitEmailForm}>
				<Col sm={4} id="email-form-name">
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
				<Col sm={4} id="email-form-email">
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
				<Col sm={4} id="email-form-phone">
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
			  <Col id="email-form-message">
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
			    <Button className="button button-green" id="email-form-button" type="submit" disabled={ !checkFormIsValid() } bsStyle="success">
			      { isFetching ? <Spinner /> : 'Send Email Message' }
			    </Button>
			    {
			      (sentEmail && !isFetching && !error) && <ControlLabel className="email-form-response auth-form-message-success">Sent!</ControlLabel>
			    }
			    {
			      (!isFetching && error) && <ControlLabel className="auth-form-message-error email-form-response">{ error.message }</ControlLabel>
			    }
			  	<p id="email-form-required">*Required fields</p>
			  </FormGroup>
			</Form>
		);
	}
}
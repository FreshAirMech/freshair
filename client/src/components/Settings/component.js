import React, { Component } from 'react';
import { Col, Row, Panel, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap/lib';
import Spinner from 'lib/Spinner';
import { isPasswordValid, isPhoneNumber } from 'lib/functions/authentication';
import request from 'superagent';
import PhotoSettings from './Photo';
import PasswordSettings from './Password';
import PhoneSettings from './Phone';
import EmailSettings from './Email';
import Scroll from 'react-scroll';
var scroll = Scroll.animateScroll;

var CLOUDINARY_UPLOAD_PRESET = 'hstdvlir';
var CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/fresh-aire-mechanical-co/upload';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFileCloudinaryUrl: this.props.photoURL || '',
      newEmail: '',
      reenterNewEmail: '',
      reenterEmailDirty: false,
      oldPassword: '',
      newPassword: '',
      reenterNewPassword: '',
      reenterPasswordDirty: false,
      newPhone: '',
      phoneFormDirty: false,
      savedPassword: false,
      savedPhone: false,
      savedEmail: false,
      deletedPhoto: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.submitPasswordForm = this.submitPasswordForm.bind(this);
    this.submitPhoneForm = this.submitPhoneForm.bind(this);
    this.submitEmailForm = this.submitEmailForm.bind(this);
    this.checkFormIsValid = this.checkFormIsValid.bind(this);
  }

  handleChange(e) {
    if (e.target.name === 'reenterNewPassword' && !this.state.reenterPasswordDirty) {
      this.setState({
        reenterPasswordDirty: true,
        savedPassword: false
      });
    }
    if (e.target.name === 'newPassword' || e.target.name === 'oldPassword') {
      this.setState({
        savedPassword: false
      });
    }
    if (e.target.name === 'reenterNewEmail' && !this.state.reenterEmailDirty) {
      this.setState({
        reenterEmailDirty: true,
        savedEmail: false
      });
    }
    if (e.target.name === 'newEmail') {
      this.setState({
        savedEmail: false
      });
    }
    if (e.target.name === 'newPhone') {
      this.setState({
        phoneFormDirty: true,
        savedPhone: false
      })
    }

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    })

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);
    const { requestChangeInfo, username } = this.props;
    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      let photoURL = response.body.secure_url;
      if (photoURL && photoURL !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: photoURL
        });
        requestChangeInfo({
          username,
          photoURL
        });
      }
    });
  }

  deletePhoto() {
    const { requestChangeInfo, username } = this.props;
    this.setState({
      uploadedFileCloudinaryUrl: '',
      deletedPhoto: true
    });
    requestChangeInfo({
      username,
      photoURL: ''
    });
  }

  submitPasswordForm(e) {
    const { oldPassword, newPassword, reenterNewPassword } = this.state;
    const { requestChangeInfo, username } = this.props;

    e.preventDefault();

    this.setState({
      oldPassword: '',
      newPassword: '',
      reenterNewPassword: '',
      savedPassword: true
    })

    requestChangeInfo({
      username,
      oldPassword,
      newPassword,
      reenterNewPassword
    });
  }

  submitPhoneForm(e) {
    const { newPhone } = this.state;
    const { requestChangeInfo, username } = this.props;

    e.preventDefault();

    this.setState({
      savedPhone: true
    })

    requestChangeInfo({
      username,
      newPhone
    });
  }

  submitEmailForm(e) {
    const { newEmail, reenterNewEmail } = this.state;
    const { requestChangeInfo, username } = this.props;

    e.preventDefault();

    this.setState({
      newEmail: '',
      reenterNewEmail: '',
      savedEmail: true
    })

    requestChangeInfo({
      username,
      newEmail,
      reenterNewEmail
    });
  }

  checkValidationState(form) {
    const { newEmail, reenterNewEmail, newPassword, reenterNewPassword,
            reenterEmailDirty, reenterPasswordDirty } = this.state;
    const { email } = this.props;

    if (form === 'password' && reenterNewPassword === '') return null;
    if (form === 'email' && reenterNewEmail === '') return null;
    if (reenterEmailDirty || reenterPasswordDirty) {
      if (form === 'email' && newEmail === reenterNewEmail ||
          form === 'password' && newPassword === reenterNewPassword) 
        return 'success';
      return 'error';
    }
  }

  checkFormIsValid(form) {
    const { newEmail, reenterNewEmail, oldPassword, newPassword, reenterNewPassword } = this.state;
    const { email } = this.props;
    
    if (form === 'email')
      return newEmail && reenterNewEmail && newEmail === reenterNewEmail && newEmail !== email;
    if (form === 'password') {
      return oldPassword && newPassword && reenterNewPassword && newPassword === reenterNewPassword
      && isPasswordValid(newPassword) && this.checkValidationState('password');
    }
  }

  componentDidUpdate() {
    if (this.state.uploadedFileCloudinaryUrl !== this.props.photoURL) {
      if (this.state.deletedPhoto) {
        this.setState({
          deletedPhoto: false
        });
      }
      else {
        this.setState({
          uploadedFileCloudinaryUrl: this.props.photoURL
        });
      }
    }
  }

  componentDidMount() {
    scroll.scrollToTop({duration: 1});
  }

  render() {
    const { email, phone, photoURL,
            isFetchingEmail, errorEmail,
            isFetchingPhone, errorPhone,
            isFetchingPassword, errorPassword } = this.props;
    const { oldPassword, newPassword, reenterNewPassword,
            newEmail, reenterNewEmail, newPhone, phoneFormDirty,
            savedPassword, savedEmail, savedPhone,
            uploadedFileCloudinaryUrl, uploadedFile } = this.state;
    let validPassword = isPasswordValid(newPassword),
        doPasswordsMatch = this.checkValidationState('password'),
        doEmailsMatch = this.checkValidationState('email');
    return (
      <div className="settings">
        <Row id="settings-header" className="settings-row">
          <h1>Settings</h1>
        </Row>
        <Row className="settings-row">
          <Col sm={6}>
            <PhotoSettings
              onImageDrop={this.onImageDrop}
              uploadedFileCloudinaryUrl={uploadedFileCloudinaryUrl}
              uploadedFile={uploadedFile}
              deletePhoto={this.deletePhoto}
            />
          </Col>
          <Col sm={6}>
            <PasswordSettings 
              isFetchingPassword={isFetchingPassword}
              errorPassword={errorPassword}
              oldPassword={oldPassword}
              newPassword={newPassword}
              reenterNewPassword={reenterNewPassword}
              doPasswordsMatch={doPasswordsMatch}
              validPassword={validPassword}
              submitPasswordForm={this.submitPasswordForm}
              handleChange={this.handleChange}
              checkFormIsValid={this.checkFormIsValid}
              savedPassword={savedPassword}
            />
          </Col>
        </Row>
        <Row className="settings-row">
          <Col sm={6} id="phone-col">
            <PhoneSettings
              submitPhoneForm={this.submitPhoneForm}
              handleChange={this.handleChange}
              newPhone={newPhone}
              phone={phone}
              phoneFormDirty={phoneFormDirty}
              isFetchingPhone={isFetchingPhone}
              errorPhone={errorPhone}
              savedPhone={savedPhone}
            />
          </Col>
          <Col sm={6}>
            <EmailSettings
              submitEmailForm={this.submitEmailForm}
              handleChange={this.handleChange}
              checkFormIsValid={this.checkFormIsValid}
              email={email}
              newEmail={newEmail}
              reenterNewEmail={reenterNewEmail}
              doEmailsMatch={doEmailsMatch}
              isFetchingEmail={isFetchingEmail}
              errorEmail={errorEmail}
              savedEmail={savedEmail}
            />
          </Col>
        </Row>
      </div>  
    );
  }
}
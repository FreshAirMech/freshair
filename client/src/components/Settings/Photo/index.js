import React, { Component } from 'react';
import { Col, Row, Panel, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap/lib';
import Dropzone from 'react-dropzone';
import './index.css';

export default (props) => {
	const { onImageDrop, uploadedFileCloudinaryUrl, uploadedFile } = props;
	return (
		<Panel>
		  <h3>Update Photo</h3>
	  	<div>
	  	{
	  		(!uploadedFileCloudinaryUrl || uploadedFileCloudinaryUrl === '') ? 
		  	<Dropzone
		  		className="dropzone"
		  		multiple={false}
		  		accept="image/*"
		  		onDrop={onImageDrop}>
		  		<p>Drop an image or click to select a file to upload.</p>
		  	</Dropzone>
			  :
			  <div className="img-div">
	      	<img id="uploadedImg" src={uploadedFileCloudinaryUrl} />
	      </div>
  		}
	  	</div>
		</Panel>
	);
}
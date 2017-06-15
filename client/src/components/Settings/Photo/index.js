import React, { Component } from 'react';
import { Col, Row, Panel, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap/lib';
import Dropzone from 'react-dropzone';
import './index.scss';

export default (props) => {
	const { onImageDrop, uploadedFileCloudinaryUrl, uploadedFile, deletePhoto } = props;
	return (
		<Panel>
		  <h3>Update Photo</h3>
	  	<div>
		  	<Dropzone
		  		className="dropzone"
		  		multiple={false}
		  		accept="image/*"
		  		onDrop={onImageDrop}>
	  			{
	  				(!uploadedFileCloudinaryUrl || uploadedFileCloudinaryUrl === '') ? 
		  			<p>Drop an image or click to select a file to upload.</p>
					  :
					  <div className="img-div">
			      	<img id="uploadedImg" src={uploadedFileCloudinaryUrl} />
			      </div>
			    }
		  	</Dropzone>
		  	{
		  		uploadedFileCloudinaryUrl &&
			  	<div id="delete-photo">
		      	<Button className="button button-red" bsStyle="danger" onClick={deletePhoto}>
		      		Delete Photo
		    		</Button>
		    	</div>
	    	}
	  	</div>
		</Panel>
	);
}
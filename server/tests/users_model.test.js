var expect = require('chai').expect;
var db = require('../db/_db');
var User = require('../db/models/user')(db);


describe('Users', () => {
	/**
   * First we clear the database and recreate the tables before beginning each run
   */
  before(function () {
    return db.sync({force: true});
  });

  var standardUser = {
		firstName: 'Jonathan',
		lastName: 'Rim',
		username: 'RimBap'
	};

  it('has mandatory firstName, lastName, and username fields that cannot be null or empty', () => {
  	let user = User.build({
  	});

  	return user.validate().then(result => {
  		let expectedMessage = 'notNull Violation: firstName cannot be null,\nnotNull Violation: lastName cannot be null,\nnotNull Violation: username cannot be null';
      expect(result.message).to.equal(expectedMessage);
      return User.build({
      	firstName: '',
      	lastName: '',
      	username: ''
      }).validate();
  	})
  	.then(result => {
  		let message = 'Validation error: Validation notEmpty failed,';
  		message = message + '\n' + message + '\n' + message;
  		message = message.slice(0,-1);
  		expect(result.message).to.equal(message);
  	});
  });

  it('has firstName, lastName, and username fields of type String', () => {
  	return User.create(standardUser)
  	.then(savedUser => {
  		expect(savedUser.firstName).to.equal('Jonathan');
  		expect(savedUser.lastName).to.equal('Rim');
  		expect(savedUser.username).to.equal('RimBap');
  	});
  });

  it ('has an email field in the proper format', () => {
  	var userWithEmail = standardUser;
  	userWithEmail.email = 'incorrectEmailFormat@hello';
  	let user = User.build(userWithEmail);
  	return user.validate().then(result => {
      expect(result.message).to.equal('Validation error: Validation isEmail failed');
      userWithEmail.email = 'correctEmail@gmail.com';
      return User.build(userWithEmail).validate();
  	})
  	.then(result => {
  		expect(result).to.equal(null);
  	});
  });

});
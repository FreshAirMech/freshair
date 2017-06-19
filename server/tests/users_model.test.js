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

  it('has mandatory firstName, lastName, and username fields that cannot be null', () => {
  	let user = User.build({
  	});

  	return user.validate().then(savedUser => {
  		console.log(savedUser.message)
  		let expectedMessage = 'notNull Violation: firstName cannot be null,\nnotNull Violation: lastName cannot be null,\nnotNull Violation: username cannot be null';
      expect(savedUser.message).to.equal(expectedMessage);
  	});
  });

  it('has firstName, lastName, and username fields of type String', () => {
  	return User.create({
  		firstName: 'Jonathan',
  		lastName: 'Rim',
  		username: 'RimBap'
  	}).then(savedUser => {
  		expect(savedUser.firstName).to.equal('Jonathan');
  		expect(savedUser.lastName).to.equal('Rim');
  		expect(savedUser.username).to.equal('RimBap');

  	});
  });
});
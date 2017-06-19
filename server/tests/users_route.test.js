'use strict';

var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server');
var agent = request.agent(app);
var db = require('../db/_db');
var User = require('../db/models/user')(db);

describe('Users Route:', () => {
	/**
   * First we clear the database and recreate the tables before beginning each run
   */
  before(function () {
    return db.sync({force: true});
  });

  describe('GET /users', () => {
		it('responds with a server error because of authentication (not admin)', () => {
			return agent
				.get('/users')
        .expect(500)
		});
  });
});
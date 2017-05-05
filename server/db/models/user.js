'use strict';
const crypto = require('crypto');
const _ = require('lodash');
const Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('user', {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            }
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        phone: {
            type: Sequelize.STRING,
            validate: {
                isNumeric: true
            }
        },
        photoURL: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING
        },
    }, {
        instanceMethods: {
            sanitize: function () {
                return _.omit(this.toJSON(), ['password', 'salt']);
            },
            correctPassword: function (candidatePassword) {
                return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
            }
        },
        classMethods: {
            generateSalt: function () {
                return crypto.randomBytes(16).toString('base64');
            },
            encryptPassword: function (plainText, salt) {
                const hash = crypto.createHash('sha1');
                hash.update(plainText);
                hash.update(salt);
                return hash.digest('hex');
            }
        },
        hooks: {
            beforeCreate: function (user) {
                if (user.changed('password')) {
                    user.salt = user.Model.generateSalt();
                    user.password = user.Model.encryptPassword(user.password, user.salt);
                }
            },
            beforeUpdate: function (user) {
                if (user.changed('password')) {
                    user.salt = user.Model.generateSalt();
                    user.password = user.Model.encryptPassword(user.password, user.salt);
                }
            }
        }
    });



};
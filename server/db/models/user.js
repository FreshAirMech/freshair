'use strict';
const crypto = require('crypto');
const Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('user', {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
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
            type: Sequelize.STRING
        },
        photoURL: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        salt: {
            type: Sequelize.STRING
        },
    }, {
        instanceMethods: {
            correctPassword: function (candidatePassword) {
                return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
            }
        },
        classMethods: {
            generateSalt: function () {
                return crypto.randomBytes(16).toString('base64');
            },
            encryptPassword: function (plainText, salt) {
                const hash = crypto.createHash('sha256');
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
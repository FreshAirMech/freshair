'use strict';
var router = require('express').Router();
var db = require('../db');
var User = db.model('user');
var Auth = require('../configure/auth-middleware');

// router.get('/', Auth.assertAdmin, function (req, res) {
router.get('/', function(req, res) {
  User.all()
  .then(users => {
    res.json(users);
  });
});


router.put('/changeInfo', function(req, res, next) {
  if (req.body.photoURL) {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(user => {
      return user.update({photoURL: req.body.photoURL})
    })
    .then(user => {
      res.json({photoURL: req.body.photoURL})
    })
    .catch(next);
  }
  if (req.body.newEmail !== req.body.reenterNewEmail) {
    const error = new Error('You reentered your new email incorrectly.');
    error.status = 400;
    next(error);
    return;
  }
  if (req.body.newPassword !== req.body.reenterNewPassword) {
    const error = new Error('You reentered your new password incorrectly.');
    error.status = 400;
    next(error);
    return;
  }
  if (req.body.newPhone) {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(user => {
      return user.update({phone: req.body.newPhone})
    })
    .then(user => {
      res.json({newPhone: req.body.newPhone});
    })
    .catch(next);
  }
  if (req.body.newPassword) {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(user => {
      if (user.correctPassword(req.body.oldPassword))
        return user.update({password: req.body.newPassword})
      else {
        const error = new Error('You entered your old password incorrectly.');
        error.status = 400;
        throw error;
      }
    })
    .then(user => {
      res.json({newPassword: req.body.newPassword});
    })
    .catch(next);
  }
  if (req.body.newEmail) {
    User.findOne({
      where: {
        email: req.body.newEmail
      }
    })
    .then(user => {
      if (user) {
        const error = new Error('New email already in use.');
        error.status = 400;
        throw error;
      }
      return User.findOne({
        where: {
          username: req.body.username
        }
      });
    })
    .then(user => {
      return user.update({email: req.body.newEmail})
    })
    .then(user => {
      res.json({newEmail: req.body.newEmail});
    })
    .catch(next);
  }
});

router.param('userId', function(req, res, next, userId) {
  User.findById(userId)
  .then(user => {
    if (!user) {
      res.status(404);
      throw next(new Error('User not found.'));
    }
    else {
      req.requestedUser = user;
      next();
    }
  })
  .catch(next);
});

router.get('/:userId', function(req, res) {
  res.json(req.requestedUser);
});

router.put('/:userId', function(req, res, next) {
  req.requestedUser.update(req.body)
  .then(function(user) {
    res.send(user);
  })
  .catch(next);
});

router.delete('/:userId', function(req, res, next) {
  req.requestedUser.destroy()
  .then(function() {
    res.sendStatus(204)
  })
  .catch(next);
})

module.exports = router;
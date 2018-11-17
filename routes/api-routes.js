const db = require('../models');

module.exports = function (app) {

  // Get all existing users by their id
  app.get('/api/users', function (req, res) {
    db.User.find({}, 'username _id')
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Get all kudos and each of their title, body, and to and from id
  app.get('/api/kudos', function (req, res) {
    db.Kudos.find({}, 'title body fromUserId toUserId').populate("fromUserId").populate("toUserId").then(function (kudos, err) {
      if (!err && kudos.length > 0) {
        res.json(kudos);
      } else {
        console.log("No Kudos Found");
        res.json({});
      }
    });
  });


  // Attempt to sign up user if username does not already exist
  app.get('/api/signup/:uname', function (req, res) {
    db.User.find({ username: req.params.uname }, 'username', function (err, users) {
      if (!err && users.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    });
  });


  // Login user based on username and password
  app.get('/api/login/:uname&:psw', function (req, res) {
    db.User.find({ username: req.params.uname, password: req.params.psw }, 'username password _id', function (err, users) {
      if (!err && users.length > 0) {
        res.json({ success: true, _id: users[0]._id });
      } else {
        res.json({ success: false });
      }
    });
  });

  // Post a user to the database 
  app.post('/api/user/:uname&:psw', function (req, res) {
    db.User.create({ username: req.params.uname, password: req.params.psw })
      .then(function (data) {
        res.json({ success: true });
      })
      .catch(function (err) {
        res.json({ success: false });
      });
  });

  // Post a kudo to the database
  app.post('/api/kudos/:title&:body&:fromUserId&:toUserId', function (req, res) {
    db.Kudos.create({ title: req.params.title, body: req.params.body, fromUserId: req.params.fromUserId, toUserId: req.params.toUserId })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
}

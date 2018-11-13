const db = require('../models');

module.exports = function (app) {

  app.get('/api/users', function (req, res) {
    db.User.find({}, 'username _id')
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.get('/api/kudos', function (req, res) {
    db.Kudos.find({}, 'title body fromUserId toUserId').populate("fromUserId").populate("toUserId").then(function (kudos, err) {
      if (!err && kudos.length > 0) {
        console.log(kudos);
        res.json(kudos);
      } else {
        console.log("No Kudos Found");
        res.json({});
      }
    });
  });


  app.get('/api/signup/:uname', function (req, res) {
    db.User.find({ username: req.params.uname }, 'username', function (err, users) {
      if (!err && users.length > 0) {
        console.log("User Exists");
        res.json({ success: true });
      } else {
        console.log("User Does not Exist");
        res.json({ success: false });
      }
    });
  });



  app.get('/api/login/:uname&:psw', function (req, res) {
    db.User.find({ username: req.params.uname, password: req.params.psw }, 'username password _id', function (err, users) {
      if (!err && users.length > 0) {
        res.json({ success: true, _id: users[0]._id });
      } else {
        res.json({ success: false });
      }
    });
  });


  app.post('/api/user/:uname&:psw', function (req, res) {
    console.log('Getting ready to add user');
    console.log(req.params.uname);
    console.log(req.params.psw);
    db.User.create({ username: req.params.uname, password: req.params.psw })
      .then(function (data) {
        console.log(data);
        res.json({ success: true });
      })
      .catch(function (err) {
        res.json({ success: false });
      });
  });

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

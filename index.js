"use strict";

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const configs = require('./configs');
const notification = require('./models/notification');
const moment = require('moment');
const PORT = 8000 || process.ENV.PORT;

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
mongoose.connect(`mongodb://${configs.db_username}:${configs.db_password}@ds145193.mlab.com:45193/wingify-challenge`);

app.get('/', (req, res) => {
  let allNotifications = [];
  let unreadNotifications = [];
  notification.find({}, (err, allnotifications) => {
    if (err) console.error(err);
    unreadNotifications = allnotifications.filter((notification) => {
      if (!notification.read) {
        return notification;
      }
    });
    allNotifications = allnotifications;
    res.render('home', { allNotifications: allNotifications, unreadNotifications: unreadNotifications });
  });
});

app.post('/', (req, res) => {
  let newNotification = new notification();
  newNotification.message = req.body.message;
  newNotification.timestamp = moment().format("ddd, hA");

  newNotification.save((err, noti) => {
    if (err) throw err;
    console.log(noti);
  });
  res.redirect('/');
});

app.get('/markRead', (req, res) => {
  notification.find({ read: false }, (err, unreadNotifications) => {
    if (err) console.error(err);
    unreadNotifications.forEach(unreadNotification => {
      unreadNotification.read = true;
      unreadNotification.save((err, readNotification) => {
        console.log(`marked ${unreadNotification.message} as read`);
      });
    });
  });
});

app.listen(PORT, () => {
  console.log('App running on port', PORT);
});

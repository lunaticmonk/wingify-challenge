"use strict";

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const configs = require('./configs');
const notification = require('./models/notification');
const moment = require('moment');
const sample_messages = require('./sample-message');
const PORT = 8000 || process.env.PORT;

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

app.get('/markRead', (req, res) => {
  notification.find({ read: false }, (err, unreadNotifications) => {
    if (err) console.error(err);
    unreadNotifications.forEach(unreadNotification => {
      unreadNotification.read = true;
      unreadNotification.save((err, readNotification) => {
      });
    });
  });
});

app.get('/generate', (req, res) => {
  let  count = 0;
  const autogenerate = setInterval(() => {
    let newNotification = new notification();
    newNotification.message = sample_messages["samples"][Math.floor(Math.random()*sample_messages["samples"].length)];
    newNotification.timestamp = moment().format("ddd, hA");

    newNotification.save((err, noti) => {
      if (err) throw err;
    });
    if (++count == 2) {
      clearInterval(autogenerate);
    }
  }, 5000);
  res.send('Two notifications will be sent in 10 seconds. Please refresh your page after 10 seconds');
});

app.get('/delete', (req, res) => {
  notification.find({}, (err, notifications) => {
    notifications.forEach(notification => {
      notification.remove();
    });
  });
  res.send('Dropdown cleared. Please refresh the page to see.');
});

app.listen(PORT, () => {
  console.log('App running on port', PORT);
});

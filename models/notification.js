"use strict";

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let notification = new Schema({
  message   : String,
  read      : { type: Boolean, default: false },
  timestamp : String
});

let newNotification = mongoose.model('notification', notification);
module.exports = newNotification;

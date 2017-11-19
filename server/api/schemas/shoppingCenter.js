'use strict';

var mongoose = require('mongoose');

exports.ShoppingCenterSchema = new mongoose.Schema({
  address: String,
  centerNumber: Number,
  updatedBy: String,
  name: String,
  status: String
}, { timestamps: true });

exports.ShoppingCenter = mongoose.model('ShoppingCenter', exports.ShoppingCenterSchema);

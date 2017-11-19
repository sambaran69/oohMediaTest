'use strict';

var mongoose = require('mongoose');

exports.AssetSchema = new mongoose.Schema({
  associatedCenter: Number,
  dimension: String,
  updatedBy: String,
  location: String,
  name: String,
  status: String
}, { timestamps: true });

exports.Asset = mongoose.model('Asset', exports.AssetSchema);

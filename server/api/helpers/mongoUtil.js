'use strict';

exports.cleanUpData = function(model) {
  var data = JSON.parse(JSON.stringify(model));
  if (data.hasOwnProperty('_id')) {
    delete data._id;
  }
  if (data.hasOwnProperty('updatedAt')) {
    delete data.updatedAt;
  }
  if (data.hasOwnProperty('createdAt')) {
    delete data.createdAt;
  }
  return data;
};

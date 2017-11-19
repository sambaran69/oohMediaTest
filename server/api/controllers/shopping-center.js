var shoppingCenter = require('../schemas/shoppingCenter');
var mongoUtil = require('../helpers/mongoUtil');

exports.fetchCenters = function (args, res, next) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  return shoppingCenter.ShoppingCenter.find({}).lean().then((results) => {
    return res.end(JSON.stringify(results));
  });
};

exports.createCenter = function (args, res, next) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  var data = mongoUtil.cleanUpData(args.body);
  return new shoppingCenter.ShoppingCenter(data).save().then((result) => {
    return res.end(JSON.stringify(result));
  });
};

exports.updateCenter = function (args, res, next) {
  var centerId = args.swagger.params.centerId.value;
  var data = mongoUtil.cleanUpData(args.body);
  return shoppingCenter.ShoppingCenter.findByIdAndUpdate(centerId, { $set: data }, { new: true }, (err, result) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Id Not found for Shopping Center' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(result));
    }
  });
};

exports.deleteCenter = function (args, res, next) {
  var centerId = args.swagger.params.centerId.value;
  return shoppingCenter.ShoppingCenter.findByIdAndRemove(centerId, (err, result) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Id Not found for Shopping Center' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(result));
    }
  });
};

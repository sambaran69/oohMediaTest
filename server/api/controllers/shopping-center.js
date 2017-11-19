var shoppingCenter = require('../schemas/shoppingCenter');

exports.fetchCenters = function (args, res, next) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  return shoppingCenter.ShoppingCenter.find({}).lean().then((results) => {
    return res.end(JSON.stringify(results));
  });
};

exports.createCenter = function (args, res, next) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  return new shoppingCenter.ShoppingCenter(args.body).save().then((result) => {
    return res.end(JSON.stringify(result));
  });
};

exports.updateCenter = function (args, res, next) {
  var centerId = args.swagger.params.centerId.value;
  return shoppingCenter.ShoppingCenter.findByIdAndUpdate(centerId, { $set: args.body }, { new: true }, (err, result) => {
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

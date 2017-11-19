var asset = require('../schemas/asset');
var mongoUtil = require('../helpers/mongoUtil');

exports.fetchAssetsByCenterNumber = function (args, res, next) {
  var centerNumber = args.swagger.params.centerNumber.value;
  var query = { associatedCenter: centerNumber };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  asset.Asset.find(query).lean().then((results) => {
    return res.end(JSON.stringify(results));
  });
};

exports.createAsset = function (args, res, next) {
  var data = mongoUtil.cleanUpData(args.body);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  return new asset.Asset(data).save().then((result) => {
    return res.end(JSON.stringify(result));
  });
};

exports.updateAsset = function (args, res, next) {
  var assetId = args.swagger.params.assetId.value;
  var data = mongoUtil.cleanUpData(args.body);
  return asset.Asset.findByIdAndUpdate(assetId, { $set: data }, { new: true }, (err, result) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Id Not found for Asset' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(result));
    }
  });
};

exports.deleteAsset = function (args, res, next) {
  var assetId = args.swagger.params.assetId.value;
  return asset.Asset.findByIdAndRemove(assetId, (err, result) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Id Not found for Asset' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(result));
    }
  });
};

var asset = require('../schemas/asset');

exports.fetchAssetsByCenterNumber = function (args, res, next) {
  var centerNumber = args.swagger.params.centerNumber.value;
  var query = { associatedCenter: centerNumber };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  asset.Asset.find(query).lean().then((results) => {
    return res.end(JSON.stringify(results));
  });
};

exports.createAsset = function (args, res, next) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  return new asset.Asset(args.body).save().then((result) => {
    return res.end(JSON.stringify(result));
  });
};

exports.updateAsset = function (args, res, next) {
  var assetId = args.swagger.params.assetId.value;

  return asset.Asset.findByIdAndUpdate(assetId, { $set: args.body }, { new: true }, (err, result) => {
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

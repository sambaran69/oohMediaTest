var auth = require('../helpers/auth');

exports.unprotectedGet = function (args, res, next) {
  var response = { message: 'My unprotected resource!' };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify(response));
};

exports.loginPost = function (args, res, next) {
  var role = args.swagger.params.role.value;
  var username = args.body.username;
  var password = args.body.password;
  var response = {};

  if (role !== 'user' && role !== 'admin') {
    response = { message: 'Error: Role must be either "admin" or "user"' };
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(response));
  }

  if (username === 'username' && password === 'password' && role) {
    var tokenString = auth.issueToken(username, role);
    response = { token: tokenString };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(response));
  } else {
    response = { message: 'Error: Credentials incorrect' };
    res.writeHead(403, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(response));
  }
};

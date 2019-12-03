'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _auth0Js = require('auth0-js');

var _auth0Js2 = _interopRequireDefault(_auth0Js);

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth = function () {
  function Auth() {
    _classCallCheck(this, Auth);

    this.auth0 = new _auth0Js2.default.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      redirectUri: process.env.AUTH0_REDIRECT_URI,
      responseType: process.env.AUTH0_RESPONSE_TYPE,
      scope: process.env.AUTH0_SCOPE,
      audience: process.env.AUTH0_API_AUDIENCE
    });
    this.user = null;
    this.expiresAt = null;
    this.accessToken = null;
    this.idToken = null;
    this.scope = null;

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.decodeIdToken = this.decodeIdToken.bind(this);
    this.setUser = this.setUser.bind(this);
    this.sendToDashboard = this.sendToDashboard.bind(this);
  }

  _createClass(Auth, [{
    key: 'handleAuthentication',
    value: function handleAuthentication(successRoute, failuireRoute) {
      var _this = this;

      this.auth0.parseHash(function (err, authResult) {
        if (err) {
          console.log(err);
          history.replace(failuireRoute); // TODO: This should use an environment variable
        } else {
          _this.setSession(authResult, successRoute);
        }
      });
    }
  }, {
    key: 'decodeIdToken',
    value: function decodeIdToken(token) {
      if (token) {
        return (0, _jwtDecode2.default)(token);
      } else {
        return (0, _jwtDecode2.default)(localStorage.getItem('idToken'));
      }
    }
  }, {
    key: 'setUser',
    value: function setUser(user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, {
    key: 'setSession',
    value: function setSession(authResult) {
      console.log(authResult.refreshToken);
      this.expiresAt = authResult.expiresIn + this.getCurrentTimestamp();
      this.accessToken = authResult.accessToken;
      this.idToken = authResult.idToken;
      this.scope = authResult.scope;
      this.role = (0, _jwtDecode2.default)(authResult.idToken)['https://rentbutter.com/roles'];

      console.log("++++++++++++++++++++++++++");
      console.log(this);
      console.log("++++++++++++++++++++++++++");

      this.sendToDashboard(this.role);
      //this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
      //  console.log(user)
      //  this.setUser(user);
      //  this.sendToDashboard(user['https://rentbutter.com/roles']);
      //});
    }
  }, {
    key: 'sendToDashboard',
    value: function sendToDashboard(role) {
      role === 'admin' ? history.push('/tool/admin/accounts') : history.push('/tool/account-overview');
    }

    // TODO: This code is not working. Look into at some point.

  }, {
    key: 'renewSession',
    value: function renewSession() {
      var _this2 = this;

      this.auth0.checkSession({}, function (err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          _this2.setSession(authResult);
        } else if (err) {
          _this2.logout();
        }
      });
    }

    // Consider expired if this timestamp will expire 600 seconds (10 minutes) from now.

  }, {
    key: 'isExpired',
    value: function isExpired() {
      return !(this.getCurrentTimestamp() + 600 < this.expiresAt);
    }
  }, {
    key: 'logout',
    value: function logout() {
      this.expiresAt = null;
      this.accessToken = null;
      this.idToken = null;
      this.scope = null;

      this.auth0.logout({ returnTo: process.env.LOGIN_URL });
    }
  }, {
    key: 'login',
    value: function login(username, password) {
      //this.auth0.authorize({redirectUri: process.env.AUTH0_CALLBACK_URL});
      this.auth0.login({
        realm: 'Username-Password-Authentication',
        username: username,
        password: password
      }, function (err, authResult) {
        console.log(authResult);
      });
    }
  }, {
    key: 'getCurrentTimestamp',
    value: function getCurrentTimestamp() {
      return new Date().getTime() / 1000;
    }
  }]);

  return Auth;
}();

exports.default = Auth;
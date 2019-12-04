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
      responseType: process.env.AUTH0_RESPONSE_TYPE,
      scope: process.env.AUTH0_SCOPE,
      audience: process.env.AUTH0_API_AUDIENCE
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setSession = this.setSession.bind(this);
  }

  _createClass(Auth, [{
    key: 'setSession',
    value: function setSession(authResult, callback) {
      sessionStorage.setItem('expiresAt', authResult.expiresIn + this.getCurrentTimestamp());
      sessionStorage.setItem('accessToken', authResult.accessToken);
      sessionStorage.setItem('idToken', authResult.idToken);
      sessionStorage.setItem('scope', authResult.scope);
      sessionStorage.setItem('role', (0, _jwtDecode2.default)(authResult.idToken)['https://rentbutter.com/roles']);
      sessionStorage.setItem('accountId', (0, _jwtDecode2.default)(authResult.idToken)['https://rentbutter.com/accountId']);

      if (callback) callback();
    }
  }, {
    key: 'logout',
    value: function logout() {
      sessionStorage.clear();
      this.auth0.logout({ returnTo: process.env.LOGIN_URL });
    }
  }, {
    key: 'login',
    value: function login(username, password, callback, errback) {
      var that = this;

      this.auth0.client.login({
        realm: 'Username-Password-Authentication',
        username: username,
        password: password
      }, function (err, authResult) {
        if (err) {
          errback(err);
        } else {
          that.setSession(authResult, callback);
        }
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
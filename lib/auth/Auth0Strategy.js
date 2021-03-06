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

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth0Strategy = function () {
  function Auth0Strategy() {
    _classCallCheck(this, Auth0Strategy);

    this.auth0 = new _auth0Js2.default.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      responseType: process.env.AUTH0_RESPONSE_TYPE,
      scope: process.env.AUTH0_SCOPE,
      audience: process.env.AUTH0_API_AUDIENCE,
      redirectUri: process.env.AUTH0_REDIRECT_URI
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setSession = this.setSession.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.clearSession = this.clearSession.bind(this);
  }

  _createClass(Auth0Strategy, [{
    key: 'clearSession',
    value: function clearSession() {
      localStorage.clear();
      sessionStorage.clear();
      _jsCookie2.default.remove('id_token', { domain: '' + (process.env.NODE_ENV === 'development' ? '127.0.0.1' : '.rentbutter.com') });
      _jsCookie2.default.remove('access_token', { domain: '' + (process.env.NODE_ENV === 'development' ? '127.0.0.1' : '.rentbutter.com') });
    }
  }, {
    key: 'setSession',
    value: function setSession(authResult, callback) {
      sessionStorage.setItem('expiresAt', authResult.expiresIn + this.getCurrentTimestamp());
      sessionStorage.setItem('accessToken', authResult.accessToken);
      sessionStorage.setItem('idToken', authResult.idToken);
      sessionStorage.setItem('scope', authResult.scope);
      sessionStorage.setItem('role', (0, _jwtDecode2.default)(authResult.idToken)['https://rentbutter.com/roles']);
      sessionStorage.setItem('accountId', (0, _jwtDecode2.default)(authResult.idToken)['https://rentbutter.com/accountId']);

      _jsCookie2.default.set('id_token', authResult.idToken);

      if (callback) callback();
    }
  }, {
    key: 'logout',
    value: function logout() {
      sessionStorage.clear();
      _jsCookie2.default.remove('id_token', { domain: '' + (process.env.NODE_ENV === 'development' ? '127.0.0.1' : '.rentbutter.com') });
      _jsCookie2.default.remove('access_token', { domain: '' + (process.env.NODE_ENV === 'development' ? '127.0.0.1' : '.rentbutter.com') });
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
  }, {
    key: 'refreshToken',
    value: function refreshToken(callback, errback) {
      this.auth0.checkSession({}, function (err, authResult) {
        if (err) {
          if (errback) errback(err);
        } else {
          that.setSession(authResult, callback);
        }
      });
    }
  }, {
    key: 'verifySession',
    value: function verifySession() {
      var user = void 0;

      try {
        var authedUser = this.getUser();
        var currentTimestamp = new Date().getTime() / 1000;
        var expiration = authedUser.exp - 600; // Expired if expiring within 10 mins
        var isExpired = currentTimestamp >= expiration;

        if (isExpired) {
          throw "User's session has expired";
        } else {
          // TODO: Write code to update the accessToken
          user = authedUser;
        }
      } catch (e) {
        console.log(e);
        this.logout();
      }

      return user;
    }
  }, {
    key: 'getUser',
    value: function getUser() {
      try {
        var token = sessionStorage.getItem('idToken') || _jsCookie2.default.get('id_token');
        return (0, _jwtDecode2.default)(token);
      } catch (e) {
        this.logout();
      }
    }
  }, {
    key: 'getAccessToken',
    value: function getAccessToken() {
      var token = sessionStorage.getItem('accessToken') || _jsCookie2.default.get('access_token');
      return token;
    }
  }, {
    key: 'changePassword',
    value: function changePassword(connection, email, callback) {
      this.auth0.changePassword({ connection: connection, email: email }, callback);
    }
  }]);

  return Auth0Strategy;
}();

exports.default = Auth0Strategy;
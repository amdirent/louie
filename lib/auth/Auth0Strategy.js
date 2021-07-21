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
      redirectUri: window.location.origin + process.env.AUTH0_REDIRECT_PATH
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setSession = this.setSession.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.clearSession = this.clearSession.bind(this);
    this.setDataItem = this.setDataItem.bind(this);
  }

  _createClass(Auth0Strategy, [{
    key: 'setDataItem',
    value: function setDataItem(key, value) {
      _jsCookie2.default.set(key, value);
    }
  }, {
    key: 'clearSession',
    value: function clearSession() {
      _jsCookie2.default.remove('idToken', { domain: window.location.hostname });
      _jsCookie2.default.remove('id_token', { domain: window.location.hostname });
      _jsCookie2.default.remove('accessToken', { domain: window.location.hostname });
      _jsCookie2.default.remove('access_token', { domain: window.location.hostname });
      _jsCookie2.default.remove('expiresAt', { domain: window.location.hostname });
      _jsCookie2.default.remove('scope', { domain: window.location.hostname });
      _jsCookie2.default.remove('role', { domain: window.location.hostname });
      _jsCookie2.default.remove('accountId', { domain: window.location.hostname });
    }
  }, {
    key: 'setSession',
    value: function setSession(authResult, callback) {
      this.clearSession();
      this.setDataItem('accessToken', authResult.accessToken);
      this.setDataItem('idToken', authResult.idToken);
      this.setDataItem('expiresAt', authResult.expiresIn + this.getCurrentTimestamp());
      this.setDataItem('scope', authResult.scope);
      this.setDataItem('role', (0, _jwtDecode2.default)(authResult.idToken)['https://rentbutter.com/roles']);
      this.setDataItem('accountId', (0, _jwtDecode2.default)(authResult.idToken)['https://rentbutter.com/accountId']);

      if (callback) callback();
    }
  }, {
    key: 'logout',
    value: function logout() {
      this.clearSession();
      this.auth0.logout({ returnTo: window.location.origin + process.env.LOGIN_ROUTE });
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

    //refreshToken() {
    //  const that = this;

    //  return new Promise((resolve, reject) => {
    //   that.auth0.checkSession(
    //    {
    //      //audience: process.env.AUTH0_API_AUDIENCE,
    //      //scope: process.env.AUTH0_SCOPE,
    //      //responseType: 'token',
    //      //redirectUri: window.location.origin + process.env.AUTH0_CALLBACK_PATH
    //    },
    //    function(err, authResult) {
    //      if (err)
    //        reject(err);

    //      //that.setSession(authResult, callback);
    //      resolve(authResult);
    //    }
    //  );
    //   
    //  });
    //}

  }, {
    key: 'isSessionExpired',
    value: function isSessionExpired() {
      var authedUser = this.getUser();
      var currentTimestamp = new Date().getTime() / 1000;
      var isExpiring = currentTimestamp >= authedUser.exp - 3600; // >= hour 
      var expired = currentTimestamp >= authedUser.exp;

      if (!authedUser || expired) {
        return true;
      }

      if (isExpiring) {
        this.refreshToken();
      }

      return false;
    }
  }, {
    key: 'getUser',
    value: function getUser() {
      try {
        var token = _jsCookie2.default.get('idToken');
        return (0, _jwtDecode2.default)(token);
      } catch (e) {
        return null;
      }
    }
  }, {
    key: 'getAccessToken',
    value: function getAccessToken() {
      var token = _jsCookie2.default.get('accessToken');
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
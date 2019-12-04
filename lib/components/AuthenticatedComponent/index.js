'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LoadingComponent2 = require('../LoadingComponent');

var _LoadingComponent3 = _interopRequireDefault(_LoadingComponent2);

var _Logout = require('../Logout');

var _Logout2 = _interopRequireDefault(_Logout);

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthenticatedComponent = function (_LoadingComponent) {
  _inherits(AuthenticatedComponent, _LoadingComponent);

  function AuthenticatedComponent(props) {
    _classCallCheck(this, AuthenticatedComponent);

    var _this = _possibleConstructorReturn(this, (AuthenticatedComponent.__proto__ || Object.getPrototypeOf(AuthenticatedComponent)).call(this, props));

    var user = void 0;
    try {
      var authedUser = (0, _jwtDecode2.default)(sessionStorage.getItem('idToken'));
      var currentTimestamp = new Date().getTime() / 1000;
      var expiration = authedUser.exp - 600; // Expired if expiring within 10 mins
      var isExpired = currentTimestamp >= expiration;

      if (isExpired) {
        throw "User's session has expired";
      } else {
        // TODO: Write code to update the accessToken
        //resolve({user: user});
        console.log("^^^^^^^^^^^^^^^ Authed ^^^^^^^^^^^^^^");
        user = authedUser;
      }
    } catch (e) {
      console.log(e);
      _Logout2.default.logout();
    }

    _this.state.user = user;
    return _this;
  }

  //componentDidMount(promises=[]) {
  //  const verifySession = new Promise(function(resolve) {
  //    try {
  //      const user = jwtDecode(sessionStorage.getItem('idToken'));
  //      const currentTimestamp = new Date().getTime() / 1000;
  //      const expiration = user.exp - 600; // Expired if expiring within 10 mins
  //      const isExpired = currentTimestamp >= expiration;

  //      if (isExpired) {
  //        throw "User's session has expired";
  //      } else {
  //        // TODO: Write code to update the accessToken
  //        resolve({user: user});
  //      }
  //    } catch(e) {
  //      console.log(e);
  //      Logout.logout();
  //    }
  //  });

  //  promises.push(verifySession);
  //  super.componentDidMount(promises);
  //}


  return AuthenticatedComponent;
}(_LoadingComponent3.default);

exports.default = AuthenticatedComponent;
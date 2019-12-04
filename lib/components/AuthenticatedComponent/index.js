'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

  function AuthenticatedComponent() {
    _classCallCheck(this, AuthenticatedComponent);

    return _possibleConstructorReturn(this, (AuthenticatedComponent.__proto__ || Object.getPrototypeOf(AuthenticatedComponent)).apply(this, arguments));
  }

  _createClass(AuthenticatedComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var promises = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var verifySession = new Promise(function (resolve) {
        try {
          var user = (0, _jwtDecode2.default)(sessionStorage.getItem('idToken'));
          var currentTimestamp = new Date().getTime() / 1000;
          var expiration = user.exp - 600;
          var isExpired = currentTimestamp >= expiration;

          if (isExpired) {
            throw "User's session has expired";
          } else {
            // Write code to update the accessToken
            resolve({ user: user });
          }
        } catch (e) {
          console.log(e);
          _Logout2.default.logout();
        }
      });

      promises.push(verifySession);
      _get(AuthenticatedComponent.prototype.__proto__ || Object.getPrototypeOf(AuthenticatedComponent.prototype), 'componentDidMount', this).call(this, promises);
    }
  }]);

  return AuthenticatedComponent;
}(_LoadingComponent3.default);

exports.default = AuthenticatedComponent;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import jwtDecode from 'jwt-decode';
//
//const verifyUser = () => {
//  let user;
//
//  try {
//    const authedUser = jwtDecode(sessionStorage.getItem('idToken'));
//    const currentTimestamp = new Date().getTime() / 1000;
//    const expiration = authedUser.exp - 600; // Expired if expiring within 10 mins
//    const isExpired = currentTimestamp >= expiration;
//
//    if (isExpired) {
//      throw "User's session has expired";
//    } else {
//      // TODO: Write code to update the accessToken
//      //resolve({user: user});
//      user = authedUser;
//    }
//  } catch(e) {
//    console.log(e);
//    Logout.logout();
//  }
//
//  return user;
//};

var AuthenticatedMixin = function AuthenticatedMixin(Base) {
  return function (_Base) {
    _inherits(_class2, _Base);

    function _class2() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, _class2);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class2.__proto__ || Object.getPrototypeOf(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.state = { user: 'Butter' }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return _class2;
  }(Base);
};

exports.default = AuthenticatedMixin;
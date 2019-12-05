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
    _inherits(_class, _Base);

    function _class(props) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

      _this.state.user = 'Chicken';
      return _this;
    }

    return _class;
  }(Base);
};

exports.default = AuthenticatedMixin;
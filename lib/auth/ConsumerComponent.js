'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AuthContext = require('./AuthContext.js');

var _AuthContext2 = _interopRequireDefault(_AuthContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthConsumerComponent = function AuthConsumerComponent(props) {
  return React.createElement(
    _AuthContext2.default.Consumer,
    null,
    function (value) {
      return React.cloneElement(props.children, { auth: value });
    }
  );
};

exports.default = AuthConsumerComponent;
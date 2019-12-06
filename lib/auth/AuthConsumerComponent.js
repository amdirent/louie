'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AuthContext = require('./AuthContext.js');

var _AuthContext2 = _interopRequireDefault(_AuthContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthConsumerComponent = function AuthConsumerComponent(props) {
  return _react2.default.createElement(
    _AuthContext2.default.Consumer,
    null,
    function (value) {
      return _react2.default.cloneElement(props.children, { auth: value });
    }
  );
};

exports.default = AuthConsumerComponent;
'use strict';

var _AuthContext = require('./AuthContext.js');

var _AuthContext2 = _interopRequireDefault(_AuthContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConsumerComponent = function ConsumerComponent(props) {
  return React.createElement(
    _AuthContext2.default.Consumer,
    null,
    function (value) {
      return React.cloneElement(props.children, { auth: value });
    }
  );
};
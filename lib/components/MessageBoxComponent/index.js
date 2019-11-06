'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageBoxComponent = function (_React$PureComponent) {
  _inherits(MessageBoxComponent, _React$PureComponent);

  function MessageBoxComponent() {
    _classCallCheck(this, MessageBoxComponent);

    return _possibleConstructorReturn(this, (MessageBoxComponent.__proto__ || Object.getPrototypeOf(MessageBoxComponent)).apply(this, arguments));
  }

  _createClass(MessageBoxComponent, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          message = _props.message,
          level = _props.level,
          _props$MessageCompone = _props.MessageComponent,
          MessageComponent = _props$MessageCompone === undefined ? null : _props$MessageCompone;

      var ml = void 0;

      switch (level) {
        case 'error':
          ml = { error: true };
          break;
        case 'success':
          ml = { success: true };
          break;
        case 'warning':
          ml = { warning: true };
          break;
        default:
          ml = { info: true };
      }

      if (!MessageComponent) MessageComponent = function MessageComponent(props) {
        return _react2.default.createElement(
          'div',
          { className: Object.keys(ml)[0] },
          _react2.default.createElement(
            'h2',
            null,
            message.header
          ),
          message.body && _react2.default.createElement(
            'p',
            null,
            message.body
          )
        );
      };

      return _react2.default.createElement(MessageComponent, { level: ml, message: message });
    }
  }]);

  return MessageBoxComponent;
}(_react2.default.PureComponent);

exports.default = MessageBoxComponent;
;
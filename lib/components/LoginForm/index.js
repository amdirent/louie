"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginForm = function (_React$PureComponent) {
  _inherits(LoginForm, _React$PureComponent);

  function LoginForm() {
    _classCallCheck(this, LoginForm);

    return _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).apply(this, arguments));
  }

  _createClass(LoginForm, [{
    key: "render",
    value: function render() {
      var Logo = this.props.logo;

      var submissionHandler = this.props.onSubmit || function (event) {
        if (event) event.preventDefault();
        console.log(this.refs.usernameInput.value);
        console.log(this.refs.passwordInput.value);
      };

      return _react2.default.createElement(
        "div",
        { className: "login-page" },
        this.props.logo && _react2.default.createElement(Logo, null),
        _react2.default.createElement(
          "div",
          { className: "form" },
          _react2.default.createElement(
            "form",
            { className: "login-form", onSubmit: this.props.onSubmit },
            _react2.default.createElement("input", { type: "text", placeholder: "username", ref: "usernameInput" }),
            _react2.default.createElement("input", { type: "password", placeholder: "password", ref: "passwordInput" }),
            _react2.default.createElement(
              "button",
              null,
              "login"
            ),
            _react2.default.createElement(
              "p",
              { className: "message" },
              "Forgot password? ",
              _react2.default.createElement(
                "a",
                { href: "#" },
                "Request a reset."
              )
            )
          )
        )
      );
    }
  }]);

  return LoginForm;
}(_react2.default.PureComponent);

exports.default = LoginForm;
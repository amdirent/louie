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

var ResetPasswordForm = function (_React$PureComponent) {
  _inherits(ResetPasswordForm, _React$PureComponent);

  function ResetPasswordForm(props) {
    _classCallCheck(this, ResetPasswordForm);

    var _this = _possibleConstructorReturn(this, (ResetPasswordForm.__proto__ || Object.getPrototypeOf(ResetPasswordForm)).call(this, props));

    _this.state = { error: null, buttonText: 'request reset' };
    _this.handleSubmission = _this.handleSubmission.bind(_this);
    _this.onFormSubmit = _this.onFormSubmit.bind(_this);
    return _this;
  }

  _createClass(ResetPasswordForm, [{
    key: 'handleSubmission',
    value: function handleSubmission(e) {
      var that = this;

      this.props.auth.changePassword('Username-Password-Authentication', this.refs.usernameInput.value, function (err, resp) {
        if (err) {
          that.setState({ error: err.description });
        } else {
          if (that.props.onResetRequestSent) that.props.onResetRequestSent(resp);
        }
      });
    }
  }, {
    key: 'onFormSubmit',
    value: function onFormSubmit(e) {
      if (e) e.preventDefault();

      var handler = this.props.onSubmit ? this.props.onSubmit : this.handleSubmission;

      this.setState({ buttonText: 'reset request sent' }, function () {
        handler(e);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var Logo = this.props.logo;

      return _react2.default.createElement(
        'div',
        { className: 'login-page' },
        this.props.logo && _react2.default.createElement(Logo, null),
        _react2.default.createElement(
          'div',
          { className: 'auth-form' },
          _react2.default.createElement(
            'form',
            { className: 'login-form', onSubmit: this.onFormSubmit },
            this.state.error && _react2.default.createElement(
              'div',
              { className: 'error' },
              this.state.error
            ),
            _react2.default.createElement('input', { type: 'text', placeholder: 'email', ref: 'usernameInput' }),
            _react2.default.createElement(
              'button',
              null,
              this.state.buttonText
            ),
            _react2.default.createElement(
              'p',
              { className: 'message' },
              'Ready to login? ',
              _react2.default.createElement(
                'a',
                { href: process.env.LOGIN_URL },
                'Login Page.'
              )
            )
          )
        )
      );
    }
  }]);

  return ResetPasswordForm;
}(_react2.default.PureComponent);

exports.default = ResetPasswordForm;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageBoxMixin = function MessageBoxMixin(Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    //state = {
    //  show_message: false,
    //  message_level: null,
    //  message: { header: null, body: null }
    //}

    function _class(props) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

      _this.state.show_message = false;
      _this.state.message_level = null;
      _this.state.message = { header: null, body: null };
      return _this;
    }

    _createClass(_class, [{
      key: 'clearMessage',


      //componentDidCatch(error, errorInfo) {
      //  // Send to external logs.
      //  console.log(error, errorInfo);
      //  this.showMessage('error', errorInfo);
      //  return null;
      //}

      value: function clearMessage() {
        var updatedState = (0, _immutabilityHelper2.default)(this.state, {
          show_message: { $set: false },
          message_level: { $set: null },
          message: { $set: { header: null, body: null } }
        });

        this.setState(updatedState);
      }
    }, {
      key: 'showMessage',
      value: function showMessage(level, msg) {
        var updatedState = (0, _immutabilityHelper2.default)(this.state, {
          show_message: { $set: true },
          message_level: { $set: level },
          message: { $set: msg }
        });

        this.setState(updatedState);
      }
    }], [{
      key: 'getDerivedStateFromError',
      value: function getDerivedStateFromError(error) {
        return {
          show_message: true,
          message_level: 'error',
          message: {
            header: "We've run into a problem.",
            body: error.message
          }
        };
      }
    }]);

    return _class;
  }(Base);
};

exports.default = MessageBoxMixin;
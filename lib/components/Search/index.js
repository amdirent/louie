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

var Search = function (_React$PureComponent) {
  _inherits(Search, _React$PureComponent);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _this.state = {
      onSearchResults: props.onSearchResults,
      masterList: props.masterList,
      resultSet: props.resultSet,
      deleting: false,
      conf: props.conf
    };
    return _this;
  }

  _createClass(Search, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          masterList = _state.masterList,
          resultSet = _state.resultSet,
          onSearchResults = _state.onSearchResults,
          deleting = _state.deleting,
          conf = _state.conf;
      var _props = this.props,
          style = _props.style,
          type = _props.type;


      var filterResults = function filterResults(query, useMaster) {
        var list = useMaster || query.length === 0 ? masterList : resultSet;
        var results = list.filter(function (q) {
          if (conf['fields']) {
            var matches = [];
            conf['fields'].forEach(function (f) {
              var value = q[f];
              matches.push(value && value.toUpperCase().includes(query.toUpperCase()) ? true : false);
            });

            return matches.includes(true);
          } else {
            return q.includes(query);
          }
        });

        return results;
      };

      return _react2.default.createElement('input', {
        type: type ? type : 'search',
        style: style,
        placeholder: 'Search...',
        onKeyDown: function onKeyDown(e) {
          if (e.key === 'Backspace') _this2.setState({ deleting: true });
        },
        onChange: function onChange(e) {
          var query = e.target.value;
          var results = filterResults(query.toUpperCase(), deleting);
          _this2.setState({ deleting: false }, function () {
            return onSearchResults(results);
          });
        }
      });
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, state) {
      return {
        resultSet: props.resultSet
      };
    }
  }]);

  return Search;
}(_react2.default.PureComponent);

exports.default = Search;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualizedAutoSizer = require('react-virtualized-auto-sizer');

var _reactVirtualizedAutoSizer2 = _interopRequireDefault(_reactVirtualizedAutoSizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataWindow = function (_React$PureComponent) {
  _inherits(DataWindow, _React$PureComponent);

  function DataWindow(props) {
    _classCallCheck(this, DataWindow);

    var _this = _possibleConstructorReturn(this, (DataWindow.__proto__ || Object.getPrototypeOf(DataWindow)).call(this, props));

    _this.state = {
      items: props.items,
      itemCount: props.items.length,
      itemHeight: props.itemHeight,
      virtualPageHeight: props.items.length * props.itemHeight,
      currentPosition: 0,
      startIndex: 0,
      scrollDirection: undefined
    };

    _this.onPage = _this.onPage.bind(_this);
    return _this;
  }

  _createClass(DataWindow, [{
    key: 'onPage',
    value: function onPage(position, itemsInWindow) {
      var virtualWindowHeight = itemsInWindow * this.state.itemHeight;
      var updatedState = {};

      position < this.state.currentPosition ? updatedState.scrollDirection = 'up' : updatedState.scrollDirection = 'down';
      updatedState.startIndex = Math.round((virtualWindowHeight - (virtualWindowHeight - position)) / this.state.itemHeight);

      this.setState(updatedState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          buffer = _props.buffer,
          children = _props.children;
      var _state = this.state,
          itemHeight = _state.itemHeight,
          virtualPageHeight = _state.virtualPageHeight,
          startIndex = _state.startIndex;


      return _react2.default.createElement(
        _reactVirtualizedAutoSizer2.default,
        { style: { height: '100%', width: '100%' } },
        function (_ref) {
          var height = _ref.height,
              width = _ref.width;

          var itemsInView = Math.round(height / itemHeight);
          var itemsInWindow = Math.round(height / virtualPageHeight * (buffer * 10)) + itemsInView;
          var window = _this2.state.items.slice(startIndex, itemsInWindow + startIndex);

          return children({ window: window, height: height, itemHeight: itemHeight, virtualPageHeight: virtualPageHeight, itemsInView: itemsInView, itemsInWindow: itemsInWindow, onPage: function onPage(position) {
              return _this2.onPage(position, itemsInWindow);
            } });
        }
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props) {
      return {
        items: props.items.map(function (i, idx) {
          return {
            item: i,
            style: {
              position: 'absolute',
              left: '0px',
              top: '' + idx * props.itemHeight,
              height: props.itemHeight,
              width: '100%'
            }
          };
        }),
        itemCount: props.items.length,
        itemHeight: props.itemHeight,
        virtualPageHeight: props.items.length * props.itemHeight
      };
    }
  }]);

  return DataWindow;
}(_react2.default.PureComponent);

exports.default = DataWindow;
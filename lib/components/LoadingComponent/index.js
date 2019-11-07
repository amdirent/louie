'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A LoadingComponent presents a loading mask while the component retrieves 
 * data from an asynchronous source.
 */
var LoadingComponent = function (_React$PureComponent) {
  _inherits(LoadingComponent, _React$PureComponent);

  function LoadingComponent(props) {
    _classCallCheck(this, LoadingComponent);

    var _this = _possibleConstructorReturn(this, (LoadingComponent.__proto__ || Object.getPrototypeOf(LoadingComponent)).call(this, props));

    _this.state = { loaded: false };

    _this.loaded = _this.loaded.bind(_this);
    _this.loading = _this.loading.bind(_this);
    _this.showLoader = _this.showLoader.bind(_this);
    _this.hideLoader = _this.hideLoader.bind(_this);

    return _this;
  }

  /**
   * Should be called from child class via super.componentDidMount(p). Method 
   * accepts promise which should resolve to a new state object with which to 
   * update the component.
   * 
   * @param {Promise} promise - Promise to retrieve data resolving to new state.
   */


  _createClass(LoadingComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount(promises) {
      var _this2 = this;

      //promise.then((result) => {
      //  const newState = {...result, ...{loaded: true}};
      //  this.setState(newState);
      //});
      Promise.all(promises).then(function (results) {
        var newState = {};

        for (var i = 0; i <= results.length; i++) {
          newState = _extends({}, newState, results[i]);
        }

        _this2.setState(_extends({}, newState, { loaded: true }));
      });
    }

    /**
     * Shows the loading mask
     */

  }, {
    key: 'showLoader',
    value: function showLoader() {
      this.setState({ loaded: false });
    }

    /**
     * Hides the loading mask
     */

  }, {
    key: 'hideLoader',
    value: function hideLoader() {
      this.setState({ loaded: true });
    }

    /**
     * Called when the data is finished loading. Returns the component that should
     * be rendered when all data is received. This method should be overwritten
     * to provide the appropriate functionality.
     */

  }, {
    key: 'loaded',
    value: function loaded() {
      return _react2.default.createElement(
        'div',
        null,
        'Component Loaded!'
      );
    }

    /**
     * Called when the component is mounted and waiting for data to be received.
     * Returns a component to act as the loading mask. This method can optionally
     * be overwritten.
     */

  }, {
    key: 'loading',
    value: function loading() {
      return _react2.default.createElement(
        'div',
        null,
        'Loading...'
      );
    }
  }, {
    key: 'render',
    value: function render() {
      // Render the desired component when retrieved data has been loaded. 
      if (this.state.loaded) return this.loaded();

      return this.loading();
    }
  }]);

  return LoadingComponent;
}(_react2.default.PureComponent);

exports.default = LoadingComponent;
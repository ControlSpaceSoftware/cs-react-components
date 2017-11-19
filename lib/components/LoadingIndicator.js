'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LoadingIndicator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _muiThemeable = require('material-ui/styles/muiThemeable');

var _muiThemeable2 = _interopRequireDefault(_muiThemeable);

require('./LoadingIndicator.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingIndicatorComponent = function (_Component) {
	_inherits(LoadingIndicatorComponent, _Component);

	_createClass(LoadingIndicatorComponent, null, [{
		key: 'RATE',
		get: function get() {
			return 1500;
		}
	}]);

	function LoadingIndicatorComponent(props) {
		_classCallCheck(this, LoadingIndicatorComponent);

		var _this = _possibleConstructorReturn(this, (LoadingIndicatorComponent.__proto__ || Object.getPrototypeOf(LoadingIndicatorComponent)).call(this, props));

		_this.state = {
			index: 0,
			positions: [{ left: 0, width: 0 }, { left: '40%', width: '30%' }, { left: '100%', width: 0 }],
			timeoutId: null
		};
		_this.tick = _this.tick.bind(_this);
		return _this;
	}

	_createClass(LoadingIndicatorComponent, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.tick();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearTimeout(this.state.timeoutId);
		}
	}, {
		key: 'tick',
		value: function tick() {
			var timeoutId = setTimeout(this.tick, LoadingIndicatorComponent.RATE);
			var index = this.state.index + 1 > 2 ? 0 : this.state.index + 1;
			var update = { timeoutId: timeoutId, index: index };
			this.setState(update);
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.props.show) {
				var palette = this.props.muiTheme.palette;
				var style = this.state.positions[this.state.index];
				style.backgroundColor = this.props.barBackgroundColor || palette.accent3Color;
				var backgroundColor = this.props.backgroundColor || palette.primary3Color;
				return _react2.default.createElement(
					'div',
					{ className: 'LoadingIndicator', style: { backgroundColor: backgroundColor } },
					_react2.default.createElement(
						'div',
						{ className: 'LoadingIndicatorBar', style: style },
						'\xA0'
					)
				);
			}
			clearTimeout(this.state.timeoutId);
			return null;
		}
	}]);

	return LoadingIndicatorComponent;
}(_react.Component);

LoadingIndicatorComponent.propTypes = {
	show: _propTypes2.default.bool,
	backgroundColor: _propTypes2.default.string,
	barBackgroundColor: _propTypes2.default.string
};

LoadingIndicatorComponent.defaultProps = {
	show: true,
	backgroundColor: null,
	barBackgroundColor: null
};

var LoadingIndicator = exports.LoadingIndicator = (0, _muiThemeable2.default)()(LoadingIndicatorComponent);
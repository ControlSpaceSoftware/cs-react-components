'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WaitingIndicator = function (_Component) {
	_inherits(WaitingIndicator, _Component);

	function WaitingIndicator(props) {
		_classCallCheck(this, WaitingIndicator);

		var _this = _possibleConstructorReturn(this, (WaitingIndicator.__proto__ || Object.getPrototypeOf(WaitingIndicator)).call(this, props));

		_this.state = {
			index: 0,
			timeoutId: null
		};
		_this.tick = _this.tick.bind(_this);
		return _this;
	}

	_createClass(WaitingIndicator, [{
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
			var index = ++this.state.index % WaitingIndicator.indicator.length;
			var timeoutId = setTimeout(this.tick, this.props.rate || 250);
			var update = { timeoutId: timeoutId, index: index };
			this.setState(update);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'span',
				{ className: 'WaitingIndicator' },
				_react2.default.createElement(
					'span',
					{ className: 'WaitingIndicator-prefix' },
					this.props.prefix
				),
				_react2.default.createElement(
					'small',
					{ className: 'WaitingIndicator-indicator' },
					WaitingIndicator.indicator[this.state.index]
				)
			);
		}
	}], [{
		key: 'indicator',
		get: function get() {
			return ['', '.', '..', '...'];
		}
	}]);

	return WaitingIndicator;
}(_react.Component);

WaitingIndicator.propTypes = {
	rate: _react.PropTypes.number,
	prefix: _react.PropTypes.string
};

WaitingIndicator.defaultProps = {
	rate: 250,
	prefix: ''
};

exports.default = WaitingIndicator;
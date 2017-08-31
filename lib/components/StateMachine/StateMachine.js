'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _renderStateMachine = require('./renderStateMachine');

var _renderStateMachine2 = _interopRequireDefault(_renderStateMachine);

var _ovObjectPath = require('ov-object-path');

var _ovObjectPath2 = _interopRequireDefault(_ovObjectPath);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by onvelocity on 8/15/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var StateMachine = function (_Component) {
	_inherits(StateMachine, _Component);

	function StateMachine(props) {
		_classCallCheck(this, StateMachine);

		var _this = _possibleConstructorReturn(this, (StateMachine.__proto__ || Object.getPrototypeOf(StateMachine)).call(this, props));

		_this.state = {
			stateName: _this.startState,
			serviceData: props.serviceData,
			isActionRunning: false,
			messages: []
		};
		_this.onInput = _this.onInput.bind(_this);
		_this.onStateChange = _this.onStateChange.bind(_this);
		_this.doAction = _this.doAction.bind(_this);
		_this.handleActionFailure = _this.handleActionFailure.bind(_this);
		_this.handleActionSuccess = _this.handleActionSuccess.bind(_this);
		_this.renderStateMachine = _this.props.renderer(_this, _this.props.stateMachine);
		return _this;
	}

	_createClass(StateMachine, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var serviceData = {};
			var stateName = nextProps.startState || this.stateName;
			// copy only the missing properties from props
			_lodash2.default.defaults(serviceData, this.state.serviceData, nextProps.serviceData);
			var update = { serviceData: serviceData, stateName: stateName };
			this.setState(update);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (this.refs.setFocusOn) {
				console.log('setting focus', this.refs.setFocusOn);
				this.refs.setFocusOn.focus();
			}
		}
	}, {
		key: 'onInput',
		value: function onInput(name, value) {
			var serviceData = Object.assign({}, this.state.serviceData);
			serviceData[name] = value;
			this.setState({ serviceData: serviceData });
		}
	}, {
		key: 'onStateChange',
		value: function onStateChange() {
			this.props.onStateChange(this.state.stateName, this.state.serviceData);
		}
	}, {
		key: 'doAction',
		value: function doAction(actionName) {
			var _this2 = this;

			// 1. make sure actionName is a valid action for the current state
			// 2. make sure service supports the action
			// 3. execute service action
			// 4. notify consumer of state change

			var stateMachine = this.props.stateMachine;
			var stateName = this.state.stateName;
			var state = stateMachine[stateName];
			var action = state.actions.filter(function (action) {
				return action.name === actionName;
			})[0];

			if (!(action && (typeof action === 'undefined' ? 'undefined' : _typeof(action)) === 'object')) {
				console.log('The action \'' + actionName + '\' is not a valid state change. Silently ignoring.');
				return;
			}

			var serviceAction = this.props.service[actionName];

			if (typeof serviceAction !== 'function') {
				console.error('Unknown action (' + actionName + ' for given state machine:', this.state.stateMachine);
				throw new TypeError('Unknown action (' + actionName + ' for given state machine.');
			}

			var fields = state.fields;
			var actionData = fields.reduce(function (map, field) {
				map[field.name] = _this2.state.serviceData[field.name];
				return map;
			}, {});
			var nextState = action.nextState;

			if (!(nextState && (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) === 'object')) {
				throw new TypeError('Missing nextState for action ' + actionName + '.');
			}

			this.setState({ isActionRunning: true, messages: [] });

			serviceAction(actionData).then(function (actionResult) {
				var update = { serviceData: actionData };
				_this2.setState(update, function () {
					var messages = actionResult instanceof Array ? actionResult : [actionResult];
					_this2.handleActionSuccess(nextState, messages);
				});
			}).catch(function (actionResult) {
				var update = { serviceData: actionData };
				_this2.setState(update, function () {
					var messages = actionResult instanceof Array ? actionResult : [actionResult];
					_this2.handleActionFailure(nextState, messages);
				});
			}).then(function () {
				_this2.setState({ isActionRunning: false });
			});
		}
	}, {
		key: 'handleActionFailure',
		value: function handleActionFailure(nextState) {
			var errorMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


			var messages = errorMessages.filter(function (i) {
				return i;
			});
			var onErrorCode = nextState.onErrorCode || {};

			// absence of onFailure stateName defaults to onSuccess stateName
			var onFailureStateName = _ovObjectPath2.default.get(nextState, 'onFailure') || _ovObjectPath2.default.get(nextState, 'onSuccess');

			// determine if an onErrorCode state is defined
			var onErrorCodeStateName = messages.filter(function (message) {
				return message && message.code;
			}).reduce(function (state, message) {
				return state ? state : onErrorCode[message.code];
			}, '');

			var stateName = onErrorCodeStateName || onFailureStateName;

			var update = { stateName: stateName, messages: messages };
			this.setState(update, this.onStateChange);
		}
	}, {
		key: 'handleActionSuccess',
		value: function handleActionSuccess(nextState) {
			var successMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

			var stateName = _ovObjectPath2.default.get(nextState, 'onSuccess');
			var messages = successMessages.filter(function (i) {
				return i;
			});
			var update = { stateName: stateName, messages: messages };
			this.setState(update, this.onStateChange);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'StateMachine' },
				this.renderStateMachine(this.state.stateName, this.state)
			);
		}
	}, {
		key: 'stateName',
		get: function get() {
			if (this.state.stateName) {
				return this.state.stateName;
			}
			return this.startState;
		}
	}, {
		key: 'startState',
		get: function get() {
			if (this.props.startState) {
				return this.props.startState;
			}
			var stateMachine = this.props.stateMachine;
			var stateNames = Object.keys(stateMachine);
			var startState = stateNames.filter(function (stateName) {
				return stateMachine[stateName].isStartState;
			});
			return startState[0] || stateNames[0];
		}
	}]);

	return StateMachine;
}(_react.Component);

exports.default = StateMachine;


StateMachine.propTypes = {
	service: _propTypes2.default.object.isRequired,
	serviceData: _propTypes2.default.object,
	stateMachine: _propTypes2.default.object.isRequired,
	startState: _propTypes2.default.string,
	renderer: _propTypes2.default.func,
	onStateChange: _propTypes2.default.func.isRequired
};

StateMachine.defaultProps = {
	service: {},
	serviceData: {},
	stateMachine: {},
	startState: '',
	renderer: _renderStateMachine2.default,
	onStateChange: function onStateChange(actionName, serviceData, nextState) {}
};
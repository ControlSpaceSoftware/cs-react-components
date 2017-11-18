'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by onvelocity on 8/15/17.
                                                                                                                                                                                                                                                                   */


exports.default = createRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classname = require('classname');

var _classname2 = _interopRequireDefault(_classname);

var _validateStateMachine = require('./validateStateMachine');

var _validateStateMachine2 = _interopRequireDefault(_validateStateMachine);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _LinearProgress = require('material-ui/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(stateMachine, stateName) {
	var _this = this;

	var isFocusSet = false;

	var state = stateMachine[stateName];
	var serviceData = this.state.serviceData;

	var buttonStyle = {
		margin: 12

	};
	var buttonLabelStyle = {
		margin: 12
	};

	var descriptionStyle = {
		marginLeft: 40,
		marginRight: 40
	};

	var textFieldStyle = {};

	var messagesStyle = {
		minHeight: 20
	};

	if (typeof state === 'undefined') {
		var msg = 'State ' + stateName + ' does not exist in state machine.';
		console.error('renderStateMachine.render stateName:', stateName, 'stateMachine:', stateMachine);
		throw new TypeError(msg);
	}

	var mapFields = function mapFields(field, index) {
		var type = field.type ? field.type : 'text';
		// set focus on the first empty field
		var focus = isFocusSet ? false : isFocusSet = !serviceData[field.name];
		// note input key is so the focus works between renders
		// todo fix when an element is "reused" on render ReactJS does not call focus()
		var key = stateName + '_' + field.name;
		if (type === 'hidden') {
			textFieldStyle.display = 'none';
		}
		var onKeyPress = void 0;
		if (typeof field.onEnterKeyAction === 'string') {
			onKeyPress = function onKeyPress(event) {
				if (event.charCode === 13) {
					_this.doAction(field.onEnterKeyAction);
				}
			};
		} else {
			onKeyPress = function onKeyPress(event) {};
		}
		return _react2.default.createElement(_TextField2.default, {
			key: key,
			name: key,
			onKeyPress: onKeyPress,
			onChange: function onChange(event) {
				return _this.onInput(field, event.target.value);
			},
			type: type,
			readOnly: field.readOnly,
			defaultValue: serviceData[field.name],
			autoFocus: focus,
			placeholder: field.label,
			style: textFieldStyle
		});
	};

	var mapAction = function mapAction(action) {
		var className = action.style;
		var primary = void 0;
		if (className === 'primary') {
			primary = true;
		}
		var muiStyles = {};
		if (_this.props.muiTheme && _this.props.muiTheme.palette) {
			var palette = _this.props.muiTheme.palette;
			muiStyles.backgroundColor = palette.accent2Color;
			muiStyles.labelColor = palette.textColor;
		}
		if (primary) {
			return _react2.default.createElement(
				_RaisedButton2.default,
				_extends({
					key: action.name,
					name: action.name,
					onClick: function onClick(event) {
						_this.setFocusOn = null;
						_this.doAction(action.name);
					}
				}, muiStyles, {
					className: className,
					style: buttonStyle,
					labelStyle: buttonLabelStyle }),
				_react2.default.createElement(
					'span',
					{ style: buttonLabelStyle },
					action.label
				)
			);
		}
		return _react2.default.createElement(
			_FlatButton2.default,
			{
				key: action.name,
				name: action.name,
				onClick: function onClick(event) {
					_this.setFocusOn = null;
					_this.doAction(action.name);
				},
				className: className,
				style: buttonStyle,
				labelStyle: buttonLabelStyle },
			_react2.default.createElement(
				'span',
				{ style: buttonLabelStyle },
				action.label
			)
		);
	};

	var mapMessages = function mapMessages(message, index) {
		if (typeof message === 'string') {
			return _react2.default.createElement(
				'p',
				{ className: 'StateMachine-message', key: index },
				message
			);
		}
		if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object') {
			return _react2.default.createElement(
				'p',
				{ className: 'StateMachine-message', key: index },
				message.message
			);
		}
	};

	var fields = state.fields || [];
	var actions = state.actions || [];
	var messages = [].concat(this.state.messages, state.message).filter(function (i) {
		return i;
	});
	var label = state.label ? _react2.default.createElement(
		'h1',
		null,
		state.label
	) : null;
	var description = state.description ? _react2.default.createElement(
		'p',
		{ style: descriptionStyle },
		state.description
	) : null;

	var alreadyHaveAccount = function alreadyHaveAccount() {
		if (_this.state.stateName !== 'SignIn') {
			return _react2.default.createElement(
				'div',
				{ className: 'StateMachine-alreadyHaveAccount' },
				_react2.default.createElement(_FlatButton2.default, { style: { border: 0 }, labelStyle: { textTransform: 'initial', padding: 8, fontWeight: 100 },
					label: 'Already have an account?', onClick: function onClick() {
						return _this.setState({ stateName: 'SignIn' });
					} })
			);
		}
	};
	var createAccount = function createAccount() {
		if (_this.state.stateName !== 'SignUp') {
			return _react2.default.createElement(
				'div',
				{ className: 'StateMachine-createAccount' },
				_react2.default.createElement(_FlatButton2.default, { labelStyle: { textTransform: 'initial', padding: 8, fontWeight: 100 },
					label: 'Need an account?', onClick: function onClick() {
						return _this.setState({ stateName: 'SignUp' });
					} })
			);
		}
	};

	var forgotPassword = function forgotPassword() {
		if (_this.state.stateName !== 'ForgotPassword') {
			return _react2.default.createElement(
				'div',
				{ className: 'StateMachine-forgotPassword' },
				_react2.default.createElement(_FlatButton2.default, { labelStyle: { textTransform: 'initial', padding: 8, fontWeight: 100 }, label: 'Forgot username or password?', onClick: function onClick() {
						return _this.setState({ stateName: 'ForgotPassword' });
					} })
			);
		}
	};

	return _react2.default.createElement(
		'div',
		{ className: (0, _classname2.default)('StateMachine', { 'action-running': this.state.isActionRunning }) },
		label,
		description,
		_react2.default.createElement(
			'div',
			{ className: 'StateMachine-fields' },
			fields.map(mapFields)
		),
		_react2.default.createElement(
			'div',
			{ className: 'StateMachine-actions' },
			actions.map(mapAction)
		),
		this.state.isActionRunning ? _react2.default.createElement(_LinearProgress2.default, { mode: 'indeterminate' }) : null,
		_react2.default.createElement(
			'div',
			{ style: messagesStyle, className: 'StateMachine-messages' },
			messages.map(mapMessages)
		),
		alreadyHaveAccount(),
		createAccount(),
		forgotPassword()
	);
}

function createRenderer(context, stateMachine) {
	var errors = (0, _validateStateMachine2.default)(stateMachine);
	if (errors.length) {
		throw new TypeError(errors);
	}
	return render.bind(context, stateMachine);
}
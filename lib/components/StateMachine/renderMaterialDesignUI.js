'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
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

var _Toolbar = require('material-ui/Toolbar');

var _LinearProgress = require('material-ui/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

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

	var paperStyle = {
		minHeight: 100,
		width: 500,
		margin: 20,
		padding: 0,
		textAlign: 'center',
		display: 'inline-block'
	};

	var descriptionStyle = {
		marginLeft: 40,
		marginRight: 40
	};

	var textFieldStyle = {};

	var messagesStyle = {
		minHeight: 40
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
		return _react2.default.createElement(_TextField2.default, { key: key, name: key,
			onChange: function onChange(event) {
				return _this.onInput(field.name, event.target.value);
			},
			type: type,
			readOnly: field.readOnly,
			defaultValue: serviceData[field.name],
			autoFocus: focus,
			placeholder: field.label,
			style: textFieldStyle });
	};

	var mapActions = function mapActions(action) {
		var className = action.style;
		var primary = void 0,
		    secondary = void 0;
		if (className === 'primary') {
			primary = true;
		} else if (className === 'secondary') {
			secondary = true;
		}
		if (primary) {
			return _react2.default.createElement(
				_RaisedButton2.default,
				{ key: action.name, name: action.name, primary: primary, onClick: function onClick(event) {
						_this.setFocusOn = null;
						_this.doAction(action.name);
					}, className: className, style: buttonStyle, labelStyle: buttonLabelStyle },
				_react2.default.createElement(
					'span',
					{
						style: buttonLabelStyle },
					action.label
				)
			);
		}
		return _react2.default.createElement(
			_FlatButton2.default,
			{ key: action.name, name: action.name, secondary: secondary, onClick: function onClick(event) {
					_this.setFocusOn = null;
					_this.doAction(action.name);
				}, className: className, style: buttonStyle, labelStyle: buttonLabelStyle },
			_react2.default.createElement(
				'span',
				{
					style: buttonLabelStyle },
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

	var fields = state && state.fields || [];
	var actions = state && state.actions || [];
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

	return _react2.default.createElement(
		'div',
		{ className: (0, _classname2.default)('StateMachine', { 'action-running': this.state.isActionRunning }) },
		_react2.default.createElement(
			_Paper2.default,
			{ style: paperStyle },
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
				_react2.default.createElement(
					_Toolbar.Toolbar,
					null,
					_react2.default.createElement(
						_Toolbar.ToolbarGroup,
						{ lastChild: true },
						actions.map(mapActions)
					)
				)
			),
			this.state.isActionRunning ? _react2.default.createElement(_LinearProgress2.default, { mode: 'indeterminate' }) : null,
			_react2.default.createElement(
				'div',
				{ style: messagesStyle, className: 'StateMachine-messages' },
				messages.map(mapMessages)
			)
		)
	);
}

function createRenderer(context, stateMachine) {
	var errors = (0, _validateStateMachine2.default)(stateMachine);
	if (errors.length) {
		throw new TypeError(errors);
	}
	return render.bind(context, stateMachine);
}
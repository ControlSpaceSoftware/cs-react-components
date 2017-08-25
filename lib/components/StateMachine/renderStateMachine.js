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

var _WaitingIndicator = require('../WaitingIndicator');

var _WaitingIndicator2 = _interopRequireDefault(_WaitingIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(stateMachine, stateName) {
	var _this = this;

	var isFocusSet = false;

	var state = stateMachine[stateName];
	var serviceData = this.state.serviceData;

	if (typeof state === 'undefined') {
		var msg = 'State ' + stateName + ' does not exist in state machine.';
		console.error('renderStateMachine.render stateName:', stateName, 'stateMachine:', stateMachine);
		throw new TypeError(msg);
	}

	var mapFields = function mapFields(field, index) {
		var type = field.type ? field.type : 'text';
		// set focus on the first empty field
		var focus = isFocusSet ? false : isFocusSet = !serviceData[field.name];
		// note funky key is so the focus works between renders
		return _react2.default.createElement('input', { key: stateName + '_' + field.name, onChange: function onChange(event) {
				return _this.onInput(field.name, event.target.value);
			}, type: type, readOnly: field.readOnly, defaultValue: serviceData[field.name], autoFocus: focus, placeholder: field.label });
	};

	var mapActions = function mapActions(action) {
		var className = action.style;
		return _react2.default.createElement(
			'button',
			{ key: action.name, onClick: function onClick(event) {
					_this.setFocusOn = null;_this.doAction(action.name);
				}, className: className },
			action.label
		);
	};

	var mapMessages = function mapMessages(message, index) {
		if (typeof message === 'string') {
			return _react2.default.createElement(
				'div',
				{ className: 'StateMachine-message', key: index },
				message
			);
		}
		if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object') {
			return _react2.default.createElement(
				'div',
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
		'h2',
		null,
		state.description
	) : null;

	return _react2.default.createElement(
		'div',
		{ className: (0, _classname2.default)('StateMachine', { 'do-action-started': this.state.isActionRunning }) },
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
			actions.map(mapActions)
		),
		this.state.isActionRunning ? _react2.default.createElement(_WaitingIndicator2.default, null) : null,
		_react2.default.createElement(
			'div',
			{ className: 'StateMachine-messages' },
			messages.map(mapMessages)
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
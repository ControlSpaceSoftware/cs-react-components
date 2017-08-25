'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = validateStateMachine;
/**
 * Created by onvelocity on 8/15/17.
 */

function validateStateMachine(states) {
	var errors = [];
	var actionNames = [];
	if ((typeof states === 'undefined' ? 'undefined' : _typeof(states)) !== 'object') {
		errors.push('State Machine must be an JSON object.');
		return errors;
	}
	Object.keys(states).forEach(function (stateName) {
		var state = states[stateName];
		if (state.fields instanceof Array) {
			state.fields.forEach(function (field, index) {
				errors.push(assertProperty(field, 'name', 'The ' + stateName + '.fields[' + index + '] name property'));
				errors.push(assertProperty(field, 'label', 'The ' + stateName + '.fields[' + index + '] label property'));
			});
		}
		if (state.actions instanceof Array) {
			state.actions.forEach(function (action, index) {
				actionNames.push(action.name);
				errors.push(assertProperty(action, 'name', 'The ' + stateName + '.actions[' + index + '] name property'));
				errors.push(assertProperty(action, 'label', 'The ' + stateName + '.actions[' + index + '] label property'));
				errors.push(assertProperty(action, 'nextState', 'The ' + stateName + '.actions[' + index + '] nextState property'));
				errors.push(assertNextState(states, action.nextState, 'The ' + stateName + '.actions[' + index + '].nextState'));
			});
		}
	});
	console.log('action names', actionNames.sort());
	return errors.filter(function (i) {
		return i;
	});
}

var assertProperty = function assertProperty(obj, name, msg) {
	if (obj[name]) {
		if (obj[name] && typeof obj[name] !== 'undefined') {
			return false;
		}
		return msg + ' is missing a value. Got (' + JSON.stringify(obj, null, 2) + ').';
	}
	return name + ' is missing. Got (' + JSON.stringify(obj, null, 2) + ').';
};

var assertNextState = function assertNextState(states, nextState, msg) {
	if (nextState) {
		var onSuccess = nextState.onSuccess;
		if (onSuccess) {
			if (states[onSuccess]) {
				return false;
			}
			return msg + '.onSuccess property value does not exist in the state machine. Expected one of [' + Object.keys(states).join(', ') + ']. Got (' + nextState + ').';
		}
		return msg + '.onSuccess property is missing. Got (' + nextState + ').';
	}
	return msg + ' property is missing. Got (' + nextState + ').';
};
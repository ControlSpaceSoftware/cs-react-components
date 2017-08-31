'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _StateMachine = require('./StateMachine');

var _AuthServiceStateMachine = require('./StateMachines/AuthServiceStateMachine.json');

var _AuthServiceStateMachine2 = _interopRequireDefault(_AuthServiceStateMachine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by onvelocity on 8/15/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Must provide Service instance that implements the actions defined in the AuthServiceStateMachine.json file.
 *
 * For example:
 * const authService = {
	forgotPassword() {
		return new Promise((resolve, reject) => {
			setTimeout(resolve.bind(null, 'forgotPassword complete'), 1000);
		});
	},
	forgotPasswordConfirm() {
		return new Promise((resolve, reject) => {
			setTimeout(resolve.bind(null, 'forgotPasswordConfirm complete'), 1000);
		});
	},
	resendConfirmationCode() {
		return new Promise((resolve, reject) => {
			setTimeout(resolve.bind(null, 'resendConfirmationCode complete'), 1000);
		});
	},
	signIn() {
		return new Promise((resolve, reject) => {
			setTimeout(resolve.bind(null, 'signIn complete'), 1000);
		});
	},
	signOut() {
		return new Promise((resolve, reject) => {
			setTimeout(resolve.bind(null, 'signOut complete'), 1000);
		});
	},
	signUp() {
		return new Promise((resolve, reject) => {
			setTimeout(resolve.bind(null, 'signUp complete'), 2000);
		});
	},
	signUpConfirm() {
		return new Promise((resolve, reject) => {
			setTimeout(resolve.bind(null, 'signUpConfirm complete'), 2000);
		});
	}
};
 */
var SignUpSignInSignOut = function (_Component) {
	_inherits(SignUpSignInSignOut, _Component);

	function SignUpSignInSignOut(props) {
		_classCallCheck(this, SignUpSignInSignOut);

		var _this = _possibleConstructorReturn(this, (SignUpSignInSignOut.__proto__ || Object.getPrototypeOf(SignUpSignInSignOut)).call(this, props));

		_this.onStateChange = _this.onStateChange.bind(_this);
		return _this;
	}

	_createClass(SignUpSignInSignOut, [{
		key: 'onStateChange',
		value: function onStateChange(stateName, serviceData) {
			// do not bubble password up
			var userInfo = (0, _omit2.default)(serviceData, 'password', 'newPassword');
			this.props.onStateChange(stateName, userInfo);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'SignUpSignInSignOut' },
				_react2.default.createElement(_StateMachine.StateMachine, {
					service: this.props.authService,
					serviceData: this.props.userInfo,
					startState: this.props.stateName,
					stateMachine: _AuthServiceStateMachine2.default,
					onStateChange: this.onStateChange,
					renderer: _StateMachine.renderMaterialDesignUI
				})
			);
		}
	}]);

	return SignUpSignInSignOut;
}(_react.Component);

SignUpSignInSignOut.propTypes = {
	userInfo: _propTypes2.default.object,
	stateName: _propTypes2.default.string,
	authService: _propTypes2.default.object.isRequired,
	onStateChange: _propTypes2.default.func.isRequired
};

SignUpSignInSignOut.defaultProps = {
	stateName: 'SignIn',
	userInfo: {},
	onStateChange: function onStateChange(stateName, userInfo) {
		return console.log('onStateChange', stateName, userInfo);
	}
};

exports.default = SignUpSignInSignOut;
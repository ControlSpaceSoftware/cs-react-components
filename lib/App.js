'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _logo = require('./logo.svg');

var _logo2 = _interopRequireDefault(_logo);

require('./App.css');

var _components = require('./components');

var _AuthServiceStateMachine = require('./components/StateMachines/AuthServiceStateMachine.json');

var _AuthServiceStateMachine2 = _interopRequireDefault(_AuthServiceStateMachine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var authService = {
	forgotPassword: function forgotPassword() {
		return new Promise(function (resolve, reject) {
			setTimeout(resolve.bind(null, 'forgotPassword complete'), 1000);
		});
	},
	forgotPasswordConfirm: function forgotPasswordConfirm() {
		return new Promise(function (resolve, reject) {
			setTimeout(resolve.bind(null, 'forgotPasswordConfirm complete'), 1000);
		});
	},
	resendConfirmationCode: function resendConfirmationCode() {
		return new Promise(function (resolve, reject) {
			setTimeout(resolve.bind(null, 'resendConfirmationCode complete'), 1000);
		});
	},
	signIn: function signIn() {
		return new Promise(function (resolve, reject) {
			setTimeout(resolve.bind(null, 'signIn complete'), 1000);
		});
	},
	signOut: function signOut() {
		return new Promise(function (resolve, reject) {
			setTimeout(resolve.bind(null, 'signOut complete'), 1000);
		});
	},
	signUp: function signUp() {
		return new Promise(function (resolve, reject) {
			setTimeout(resolve.bind(null, 'signUp complete'), 2000);
		});
	},
	signUpConfirm: function signUpConfirm() {
		return new Promise(function (resolve, reject) {
			setTimeout(resolve.bind(null, 'signUpConfirm complete'), 2000);
		});
	}
};

var App = function (_Component) {
	_inherits(App, _Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.state = {
			stateName: 'SignUp',
			userInfo: {}
		};
		_this.onAuthStateChange = _this.onAuthStateChange.bind(_this);
		return _this;
	}

	_createClass(App, [{
		key: 'onAuthStateChange',
		value: function onAuthStateChange(stateName, userInfo) {
			this.setState({ stateName: stateName, userInfo: userInfo });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				{ className: 'App' },
				_react2.default.createElement(
					'div',
					{ className: 'App-header' },
					_react2.default.createElement('img', { src: _logo2.default, className: 'App-logo', alt: 'logo' }),
					_react2.default.createElement(
						'h2',
						null,
						'Components'
					)
				),
				_react2.default.createElement(
					'p',
					{ className: 'App-intro' },
					'To get started, edit ',
					_react2.default.createElement(
						'code',
						null,
						'src/App.js'
					),
					' and save to reload.'
				),
				_react2.default.createElement(
					'section',
					null,
					_react2.default.createElement(
						'h1',
						null,
						'WaitingIndicator'
					),
					_react2.default.createElement(
						'p',
						null,
						'Simple inline waiting indicator.'
					),
					_react2.default.createElement(
						'button',
						{ onClick: function onClick() {
								return _this2.setState({ showWaitingIndicator: true });
							} },
						'Start'
					),
					_react2.default.createElement(
						'button',
						{ onClick: function onClick() {
								return _this2.setState({ showWaitingIndicator: false });
							} },
						'Stop'
					),
					_react2.default.createElement(
						'div',
						{ style: { fontSize: 'x-large', height: '20px' } },
						this.state.showWaitingIndicator ? _react2.default.createElement(_components.WaitingIndicator, null) : null
					)
				),
				_react2.default.createElement(
					'section',
					null,
					_react2.default.createElement(
						'h1',
						null,
						'StateMachine'
					),
					_react2.default.createElement(
						'p',
						null,
						'A state machine driven UI.'
					),
					_react2.default.createElement(_components.StateMachine, {
						service: authService,
						stateMachine: _AuthServiceStateMachine2.default,
						serviceData: {},
						onStateChange: function onStateChange(stateName, serviceData) {
							return console.log({ stateName: stateName, serviceData: serviceData });
						}
					})
				),
				_react2.default.createElement(
					'section',
					null,
					_react2.default.createElement(
						'h1',
						null,
						'SignUpSignInSignOut'
					),
					_react2.default.createElement(
						'p',
						null,
						'Authentication UI wrapper around StateMachine.'
					),
					_react2.default.createElement(_components.SignUpSignInSignOut, { authService: authService, authServiceStateMachine: _AuthServiceStateMachine2.default, onStateChange: this.onAuthStateChange, stateName: this.state.stateName }),
					_react2.default.createElement(
						'pre',
						null,
						this.state.stateName
					),
					_react2.default.createElement(
						'pre',
						null,
						JSON.stringify(this.state.userInfo, null, 5)
					)
				)
			);
		}
	}]);

	return App;
}(_react.Component);

exports.default = App;
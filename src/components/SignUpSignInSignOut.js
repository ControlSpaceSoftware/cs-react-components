/**
 * Created by onvelocity on 8/15/17.
 */

import omit from 'lodash/omit'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {StateMachine, renderMaterialDesignUI} from './StateMachine'
import authServiceStateMachine from './StateMachines/AuthServiceStateMachine.json'
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ActionClose from 'material-ui/svg-icons/navigation/close';

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

const paperStyle = {
	minHeight: 100,
	width: 500,
	margin: 20,
	padding: 0,
	textAlign: 'center',
	display: 'inline-block',
	position: 'relative'
};

const closeButtonStyle = {
	position: 'absolute',
	right: 1
};

function closeButton(onClose) {
	if (typeof onClose === 'function') {
		return (
			<IconButton
				onClick={onClose}
				style={closeButtonStyle}
				tooltip="Close">
				<ActionClose />
			</IconButton>
		);
	}
}

class SignUpSignInSignOut extends Component {

	constructor(props) {
		super(props);
		this.onStateChange = this.onStateChange.bind(this);
	}

	onStateChange(stateName, serviceData) {
		// do not bubble password up
		const userInfo = omit(serviceData, 'password', 'newPassword');
		this.props.onStateChange(stateName, userInfo);
	}

	render() {

		Object.assign(paperStyle, this.props.style);

		return (
			<Paper className="SignUpSignInSignOut" style={paperStyle}>
				{closeButton(this.props.onClose)}
				<StateMachine
					service={this.props.authService}
					serviceData={this.props.userInfo}
					startState={this.props.stateName}
					stateMachine={authServiceStateMachine}
					onStateChange={this.onStateChange}
					renderer={renderMaterialDesignUI}
				/>
			</Paper>
		);
	}

}

SignUpSignInSignOut.propTypes = {
	userInfo: PropTypes.object,
	stateName: PropTypes.string,
	authService: PropTypes.object.isRequired,
	onStateChange: PropTypes.func.isRequired,
	onClose: PropTypes.func
};

SignUpSignInSignOut.defaultProps = {
	stateName: 'SignIn',
	userInfo: {},
	onStateChange: (stateName, userInfo) => console.log('onStateChange', stateName, userInfo)
};

export default SignUpSignInSignOut;

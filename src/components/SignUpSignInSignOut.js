/**
 * Created by onvelocity on 8/15/17.
 */

import omit from 'lodash/omit'
import React, {Component, PropTypes} from 'react'
import {StateMachine, renderMaterialDesignUI} from './StateMachine'
import authServiceStateMachine from './StateMachines/AuthServiceStateMachine.json'

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
		return (
			<div className="SignUpSignInSignOut">
				<StateMachine
					service={this.props.authService}
					serviceData={this.props.userInfo}
					startState={this.props.stateName}
					stateMachine={authServiceStateMachine}
					onStateChange={this.onStateChange}
					renderer={renderMaterialDesignUI}
				/>
			</div>
		);
	}

}

SignUpSignInSignOut.propTypes = {
	userInfo: PropTypes.object,
	stateName: PropTypes.string,
	authService: PropTypes.object.isRequired,
	onStateChange: PropTypes.func.isRequired
};

SignUpSignInSignOut.defaultProps = {
	stateName: 'SignIn',
	userInfo: {},
	onStateChange: (stateName, userInfo) => console.log('onStateChange', stateName, userInfo)
};

export default SignUpSignInSignOut;

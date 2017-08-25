import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {WaitingIndicator, StateMachine, SignUpSignInSignOut } from './components'
import authServiceStateMachine from './components/StateMachines/AuthServiceStateMachine.json'

const authService = {
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

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			stateName: 'SignUp',
			userInfo: {}
		};
		this.onAuthStateChange = this.onAuthStateChange.bind(this);
	}

	onAuthStateChange(stateName, userInfo) {
		this.setState({stateName, userInfo});
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h2>Components</h2>
				</div>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
				<section>
					<h1>WaitingIndicator</h1>
					<p>Simple inline waiting indicator.</p>
					<button onClick={() => this.setState({showWaitingIndicator: true})}>Start</button>
					<button onClick={() => this.setState({showWaitingIndicator: false})}>Stop</button>
					<div style={{fontSize: 'x-large', height: '20px'}}>{this.state.showWaitingIndicator ?
						<WaitingIndicator/> : null}</div>
				</section>
				<section>
					<h1>StateMachine</h1>
					<p>A state machine driven UI.</p>
					<StateMachine
						service={authService}
						stateMachine={authServiceStateMachine}
						serviceData={{}}
						onStateChange={(stateName, serviceData) => console.log({stateName, serviceData})}
					/>
				</section>
				<section>
					<h1>SignUpSignInSignOut</h1>
					<p>Authentication UI wrapper around StateMachine.</p>
					<SignUpSignInSignOut authService={authService} authServiceStateMachine={authServiceStateMachine} onStateChange={this.onAuthStateChange} stateName={this.state.stateName} />
					<pre>{this.state.stateName}</pre>
					<pre>{JSON.stringify(this.state.userInfo, null, 5)}</pre>
				</section>
			</div>
		);
	}
}

export default App;

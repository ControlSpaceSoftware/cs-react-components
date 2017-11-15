/**
 * Created by onvelocity on 8/15/17.
 */
import React from 'react'
import className from 'classname'
import validateStateMachine from './validateStateMachine'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';

function render(stateMachine, stateName) {

	let isFocusSet = false;

	const state = stateMachine[stateName];
	const serviceData = this.state.serviceData;

	const buttonStyle = {
		margin: 12,

	};
	const buttonLabelStyle = {
		margin: 12
	};

	const descriptionStyle = {
		marginLeft: 40,
		marginRight: 40
	};

	const textFieldStyle = {};

	const messagesStyle = {
		minHeight: 20
	};

	if (typeof state === 'undefined') {
		const msg = `State ${stateName} does not exist in state machine.`;
		console.error('renderStateMachine.render stateName:', stateName, 'stateMachine:', stateMachine);
		throw new TypeError(msg);
	}

	const mapFields = (field, index) => {
		const type = field.type ? field.type : 'text';
		// set focus on the first empty field
		const focus = isFocusSet ? false : isFocusSet = !serviceData[field.name];
		// note input key is so the focus works between renders
		// todo fix when an element is "reused" on render ReactJS does not call focus()
		const key = `${stateName}_${field.name}`;
		if (type === 'hidden') {
			textFieldStyle.display = 'none';
		}
		return (
			<TextField
				key={key}
				name={key}
				onChange={(event) => this.onInput(field.name, event.target.value)}
				type={type}
				readOnly={field.readOnly}
				defaultValue={serviceData[field.name]}
				autoFocus={focus}
				placeholder={field.label}
				style={textFieldStyle}
			/>
		);
	};

	const mapAction = (action) => {
		const className = action.style;
		let primary;
		if (className === 'primary') {
			primary = true;
		}
		const muiStyles = {};
		if (this.props.muiTheme && this.props.muiTheme.palette) {
			const palette = this.props.muiTheme.palette;
			muiStyles.backgroundColor = palette.accent2Color;
			muiStyles.labelColor = palette.textColor;
		}
		console.log(muiStyles);
		if (primary) {
			return (
				<RaisedButton
					key={action.name}
					name={action.name}
					onClick={(event) => {
						this.setFocusOn = null;
						this.doAction(action.name);
					}}
					{...muiStyles}
					className={className}
					style={buttonStyle}
					labelStyle={buttonLabelStyle}>
					<span style={buttonLabelStyle}>{action.label}</span>
				</RaisedButton>
			);
		}
		return (
			<FlatButton
				key={action.name}
				name={action.name}
				onClick={(event) => {
					this.setFocusOn = null;
					this.doAction(action.name);
				}}
				className={className}
				style={buttonStyle}
				labelStyle={buttonLabelStyle}>
				<span style={buttonLabelStyle}>{action.label}</span>
			</FlatButton>
		);
	};

	const mapMessages = (message, index) => {
		if (typeof message === 'string') {
			return <p className="StateMachine-message" key={index}>{message}</p>;
		}
		if (typeof message === 'object') {
			return <p className="StateMachine-message" key={index}>{message.message}</p>;
		}
	};

	const fields = (state.fields) || [];
	const actions = (state.actions) || [];
	const messages = [].concat(this.state.messages, state.message).filter(i => i);
	const label = state.label ? <h1>{state.label}</h1> : null;
	const description = state.description ? <p style={descriptionStyle}>{state.description}</p> : null;

	const alreadyHaveAccount = () => {
		if (this.state.stateName !== 'SignIn') {
			return (
				<div className="StateMachine-alreadyHaveAccount">
					<FlatButton style={{border: 0}} labelStyle={{textTransform: 'initial', padding: 8, fontWeight: 100}} label='Got an account?' onClick={() => this.setState({stateName: 'SignIn'})}/>
				</div>

			);
		}
	};
	const createAccount = () => {
		if (this.state.stateName !== 'SignUp') {
			return (
				<div className="StateMachine-createAccount">
					<FlatButton labelStyle={{textTransform: 'initial', padding: 8, fontWeight: 100}} label='Need an account?' onClick={() => this.setState({stateName: 'SignUp'})}/>
				</div>

			);
		}
	};

	const forgotPassword = () => {
		if (this.state.stateName !== 'ForgotPassword') {
			return (
				<div className="StateMachine-forgotPassword">
					<FlatButton labelStyle={{textTransform: 'initial', padding: 8, fontWeight: 100}} label="Forgot username or
					password?" onClick={() => this.setState({stateName: 'ForgotPassword'})}/>
				</div>
			);
		}
	};

	return (
		<div className={className('StateMachine', {'action-running': this.state.isActionRunning})}>
			{label}
			{description}
			<div className="StateMachine-fields">{fields.map(mapFields)}</div>
			<div className="StateMachine-actions">
				{actions.map(mapAction)}
			</div>
			{this.state.isActionRunning ? <LinearProgress mode="indeterminate"/> : null}
			<div style={messagesStyle} className="StateMachine-messages">{messages.map(mapMessages)}</div>
			{alreadyHaveAccount()}
			{createAccount()}
			{forgotPassword()}
		</div>
	);

}

export default function createRenderer(context, stateMachine) {
	const errors = validateStateMachine(stateMachine);
	if (errors.length) {
		throw new TypeError(errors);
	}
	return render.bind(context, stateMachine);
}

/**
 * Created by onvelocity on 8/15/17.
 */
import React from 'react'
import className from 'classname'
import validateStateMachine from './validateStateMachine'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';

function render(stateMachine, stateName) {

	let isFocusSet = false;

	const state = stateMachine[stateName];
	const serviceData = this.state.serviceData;

	const buttonStyle = {
		margin: 12
	};
	const buttonLabelStyle = {
		margin: 12
	};

	const paperStyle = {
		minHeight: 100,
		width: 500,
		margin: 20,
		padding: 0,
		textAlign: 'center',
		display: 'inline-block',
	};

	const descriptionStyle = {
		marginLeft: 40,
		marginRight: 40
	};

	const textFieldStyle = {};

	const messagesStyle = {
		minHeight: 40
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
		return (<TextField key={key} name={key}
						   onChange={(event) => this.onInput(field.name, event.target.value)}
						   type={type}
						   readOnly={field.readOnly}
						   defaultValue={serviceData[field.name]}
						   autoFocus={focus}
						   placeholder={field.label}
						   style={textFieldStyle}/>);
	};

	const mapActions = (action) => {
		const className = action.style;
		let primary, secondary;
		if (className === 'primary') {
			primary = true;
		} else if (className === 'secondary') {
			secondary = true;
		}
		if (primary) {
			return (<RaisedButton key={action.name} name={action.name} primary={primary} onClick={(event) => {
				this.setFocusOn = null;
				this.doAction(action.name);
			}} className={className} style={buttonStyle} labelStyle={buttonLabelStyle}><span
				style={buttonLabelStyle}>{action.label}</span></RaisedButton>);
		}
		return (<FlatButton key={action.name} name={action.name} secondary={secondary} onClick={(event) => {
			this.setFocusOn = null;
			this.doAction(action.name);
		}} className={className} style={buttonStyle} labelStyle={buttonLabelStyle}><span
			style={buttonLabelStyle}>{action.label}</span></FlatButton>);
	};

	const mapMessages = (message, index) => {
		if (typeof message === 'string') {
			return <p className="StateMachine-message" key={index}>{message}</p>;
		}
		if (typeof message === 'object') {
			return <p className="StateMachine-message" key={index}>{message.message}</p>;
		}
	};

	const fields = (state && state.fields) || [];
	const actions = (state && state.actions) || [];
	const messages = [].concat(this.state.messages, state.message).filter(i => i);
	const label = state.label ? <h1>{state.label}</h1> : null;
	const description = state.description ? <p style={descriptionStyle}>{state.description}</p> : null;

	return (
		<div className={className('StateMachine', {'action-running': this.state.isActionRunning})}>
			<Paper style={paperStyle}>
				{label}
				{description}
				<div className="StateMachine-fields">{fields.map(mapFields)}</div>
				<div className="StateMachine-actions">
					<Toolbar><ToolbarGroup lastChild={true}>{actions.map(mapActions)}</ToolbarGroup></Toolbar>
				</div>
				{this.state.isActionRunning ? <LinearProgress mode="indeterminate"/> : null}
				<div style={messagesStyle} className="StateMachine-messages">{messages.map(mapMessages)}</div>
			</Paper>
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

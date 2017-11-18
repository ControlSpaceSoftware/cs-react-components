/**
 * Created by onvelocity on 8/15/17.
 */
import React from 'react'
import className from 'classname'
import validateStateMachine from './validateStateMachine'
import WaitingIndicator from '../WaitingIndicator'

function render(stateMachine, stateName) {

	let isFocusSet = false;

	const state = stateMachine[stateName];
	const serviceData = this.state.serviceData;

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
		let onKeyPress;
		if (typeof field.onEnterKeyAction === 'string') {
			onKeyPress = (event) => {
				if (event.charCode === 13) {
					this.doAction(field.onEnterKeyAction)
				}
			}
		} else {
			onKeyPress = (event) => {
			};
		}
		return (<input key={`${stateName}_${field.name}`} onKeyPress={onKeyPress} onChange={(event) => this.onInput(field, event.target.value)} type={type} readOnly={field.readOnly} defaultValue={serviceData[field.name]} autoFocus={focus} placeholder={field.label} />);
	};

	const mapActions = (action) => {
		const className = action.style;
		return (<button key={action.name} onClick={(event) => {this.setFocusOn = null; this.doAction(action.name);}} className={className}>{action.label}</button>);
	};

	const mapMessages = (message, index) => {
		if (typeof message === 'string') {
			return <div className="StateMachine-message" key={index}>{message}</div>;
		}
		if (typeof message === 'object') {
			return <div className="StateMachine-message" key={index}>{message.message}</div>;
		}
	};

	const fields = (state && state.fields) || [];
	const actions = (state && state.actions) || [];
	const messages = [].concat(this.state.messages, state.message).filter(i => i);
	const label = state.label ? <h1>{state.label}</h1> : null;
	const description = state.description ? <h2>{state.description}</h2> : null;

	return (
		<div className={className('StateMachine', {'do-action-started': this.state.isActionRunning})}>
			{label}
			{description}
			<div className="StateMachine-fields">{fields.map(mapFields)}</div>
			<div className="StateMachine-actions">{actions.map(mapActions)}</div>
			{this.state.isActionRunning ? <WaitingIndicator /> : null}
			<div className="StateMachine-messages">{messages.map(mapMessages)}</div>
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

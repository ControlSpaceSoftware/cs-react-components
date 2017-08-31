/**
 * Created by onvelocity on 8/15/17.
 */

import React, {Component, PropTypes} from 'react'
import renderStateMachine from './renderStateMachine'
import property from 'ov-object-path'
import _ from 'lodash'

export default class StateMachine extends Component {

	constructor(props) {
		super(props);
		this.state = {
			stateName: this.startState,
			serviceData: props.serviceData,
			isActionRunning: false,
			messages: []
		};
		this.onInput = this.onInput.bind(this);
		this.onStateChange = this.onStateChange.bind(this);
		this.doAction = this.doAction.bind(this);
		this.handleActionFailure = this.handleActionFailure.bind(this);
		this.handleActionSuccess = this.handleActionSuccess.bind(this);
		this.renderStateMachine = this.props.renderer(this, this.props.stateMachine);
	}

	componentWillReceiveProps(nextProps) {
		const serviceData = {};
		const stateName = nextProps.startState || this.stateName;
		// copy only the missing properties from props
		_.defaults(serviceData, this.state.serviceData, nextProps.serviceData);
		const update = {serviceData, stateName};
		this.setState(update);
	}

	componentDidUpdate() {
		if (this.refs.setFocusOn) {
			console.log('setting focus', this.refs.setFocusOn);
			this.refs.setFocusOn.focus();
		}
	}

	get stateName() {
		if (this.state.stateName) {
			return this.state.stateName;
		}
		return this.startState
	}

	get startState() {
		if (this.props.startState) {
			return this.props.startState;
		}
		const stateMachine = this.props.stateMachine;
		const stateNames = Object.keys(stateMachine);
		const startState = stateNames.filter((stateName) => stateMachine[stateName].isStartState);
		return startState[0] || stateNames[0];
	}

	onInput(name, value) {
		const serviceData = Object.assign({}, this.state.serviceData);
		serviceData[name] = value;
		this.setState({serviceData});
	}

	onStateChange() {
		this.props.onStateChange(this.state.stateName, this.state.serviceData);
	}

	doAction(actionName) {

		// 1. make sure actionName is a valid action for the current state
		// 2. make sure service supports the action
		// 3. execute service action
		// 4. notify consumer of state change

		const stateMachine = this.props.stateMachine;
		const stateName = this.state.stateName;
		const state = stateMachine[stateName];
		const action = state.actions.filter((action) => action.name === actionName)[0];

		if (!(action && typeof action === 'object')) {
			console.log(`The action '${actionName}' is not a valid state change. Silently ignoring.`);
			return;
		}

		const serviceAction = this.props.service[actionName];

		if (typeof serviceAction !== 'function') {
			console.error(`Unknown action (${actionName} for given state machine:`, this.state.stateMachine);
			throw new TypeError(`Unknown action (${actionName} for given state machine.`);
		}

		const fields = state.fields;
		const actionData = fields.reduce((map, field) => {
			map[field.name] = this.state.serviceData[field.name];
			return map;
		}, {});
		const nextState = action.nextState;

		if (!(nextState && typeof nextState === 'object')) {
			throw new TypeError(`Missing nextState for action ${actionName}.`);
		}

		this.setState({isActionRunning: true, messages: []});

		serviceAction(actionData).then((actionResult) => {
			const update = {serviceData: actionData};
			this.setState(update, () => {
				const messages = actionResult instanceof Array ? actionResult : [actionResult];
				this.handleActionSuccess(nextState, messages);
			});
		}).catch((actionResult) => {
			const update = {serviceData: actionData};
			this.setState(update, () => {
				const messages = actionResult instanceof Array ? actionResult : [actionResult];
				this.handleActionFailure(nextState, messages);
			});
		}).then(() => {
			this.setState({isActionRunning: false});
		});

	}

	handleActionFailure(nextState, errorMessages = []) {

		const messages = errorMessages.filter((i) => i);
		const onErrorCode = nextState.onErrorCode || {};

		// absence of onFailure stateName defaults to onSuccess stateName
		const onFailureStateName = property.get(nextState, 'onFailure') || property.get(nextState, 'onSuccess');

		// determine if an onErrorCode state is defined
		const onErrorCodeStateName = messages
			.filter((message) => message && message.code)
			.reduce((state, message) => state ? state : onErrorCode[message.code], '');

		const stateName = onErrorCodeStateName || onFailureStateName;

		const update = {stateName, messages};
		this.setState(update, this.onStateChange);

	}

	handleActionSuccess(nextState, successMessages = []) {
		const stateName = property.get(nextState, 'onSuccess');
		const messages = successMessages.filter(i => i);
		const update = {stateName, messages};
		this.setState(update, this.onStateChange);
	}

	render() {
		return (
			<div className="StateMachine">
				{this.renderStateMachine(this.state.stateName, this.state)}
			</div>
		);
	}

}

StateMachine.propTypes = {
	service: PropTypes.object.isRequired,
	serviceData: PropTypes.object,
	stateMachine: PropTypes.object.isRequired,
	startState: PropTypes.string,
	renderer: PropTypes.func,
	onStateChange: PropTypes.func.isRequired
};

StateMachine.defaultProps = {
	service: {},
	serviceData: {},
	stateMachine: {},
	startState: '',
	renderer: renderStateMachine,
	onStateChange: (actionName, serviceData, nextState) => {
	}
};

import React, { Component, PropTypes } from 'react';

class WaitingIndicator extends Component {

	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			timeoutId: null
		};
		this.tick = this.tick.bind(this);
	}

	componentDidMount() {
		this.tick();
	}

	componentWillUnmount() {
		clearTimeout(this.state.timeoutId);
	}

	static get indicator() {
		return ['', '.', '..', '...'];
	}

	tick() {
		const index = ++this.state.index % WaitingIndicator.indicator.length;
		const timeoutId = setTimeout(this.tick, this.props.rate || 250);
		const update = {timeoutId, index};
		this.setState(update);
	}

	render() {
		return (
			<span className="Waiting"><span className="Waiting-prefix">{this.props.prefix}</span><small className="Waiting-indicator">{WaitingIndicator.indicator[this.state.index]}</small></span>
		);
	};

}

WaitingIndicator.propTypes = {
	rate: PropTypes.number,
	prefix: PropTypes.string
};

WaitingIndicator.defaultProps = {
	rate: 250,
	prefix: ''
};

export default WaitingIndicator;

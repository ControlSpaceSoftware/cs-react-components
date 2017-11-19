import React, {Component} from 'react';
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable';
import './LoadingIndicator.css'

class LoadingIndicatorComponent extends Component {

	static get RATE() {
		return 1500;
	}

	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			positions: [{left: 0, width: 0}, {left: '40%', width: '30%'}, {left: '100%', width: 0}],
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

	tick() {
		const timeoutId = setTimeout(this.tick, LoadingIndicatorComponent.RATE);
		const index = (this.state.index + 1) > 2 ? 0 : this.state.index + 1;
		const update = {timeoutId, index};
		this.setState(update);
	}

	render() {
		if (this.props.show) {
			const palette = this.props.muiTheme.palette;
			const style = this.state.positions[this.state.index];
			style.backgroundColor = this.props.barBackgroundColor || palette.accent3Color;
			const backgroundColor = this.props.backgroundColor || palette.primary3Color;
			return (
				<div className="LoadingIndicator" style={{backgroundColor}}>
					<div className="LoadingIndicatorBar" style={style}>
						&nbsp;
					</div>
				</div>
			);
		}
		clearTimeout(this.state.timeoutId);
		return null;
	};

}

LoadingIndicatorComponent.propTypes = {
	show: PropTypes.bool,
	backgroundColor: PropTypes.string,
	barBackgroundColor: PropTypes.string
};

LoadingIndicatorComponent.defaultProps = {
	show: true,
	backgroundColor: null,
	barBackgroundColor: null
};

export const LoadingIndicator = muiThemeable()(LoadingIndicatorComponent);

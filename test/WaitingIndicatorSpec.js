/*global it, describe, beforeEach */

import React from 'react';
import ReactDOM from 'react-dom';
import WaitingIndicator from '../src/components/WaitingIndicator';

import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import initDOM from './jsdom'

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

initDOM();

describe('WaitingIndicator', () => {
	let div;
	beforeEach(() => {
		div = document.createElement('div');
		ReactDOM.render(<WaitingIndicator />, div);
	});
	it('renders .WaitingIndicator-indicator', () => {
		expect(div.querySelector('.WaitingIndicator-indicator')).to.exist;
	})
});

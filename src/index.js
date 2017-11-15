import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {darkBaseTheme} from "./darkBaseTheme";
import getMuiTheme from 'material-ui/styles/getMuiTheme'

ReactDOM.render(
	<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
		<App/>
	</MuiThemeProvider>,
	document.getElementById('root'));

registerServiceWorker();

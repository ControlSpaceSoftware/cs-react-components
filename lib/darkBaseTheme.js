'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.darkBaseTheme = undefined;

var _colors = require('material-ui/styles/colors');

var colors = _interopRequireWildcard(_colors);

var _colorManipulator = require('material-ui/utils/colorManipulator');

var colorManipulator = _interopRequireWildcard(_colorManipulator);

var _spacing = require('material-ui/styles/spacing');

var _spacing2 = _interopRequireDefault(_spacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var darkBaseTheme = exports.darkBaseTheme = {
	spacing: _spacing2.default,
	fontFamily: 'Roboto, sans-serif',
	borderRadius: 2,
	palette: {
		primary1Color: colors.grey900,
		primary2Color: colors.cyan700,
		primary3Color: colors.grey600,
		accent1Color: colors.greenA200,
		accent2Color: colors.greenA400,
		accent3Color: colors.greenA100,
		textColor: colors.fullWhite,
		secondaryTextColor: colorManipulator.fade(colors.fullWhite, 0.7),
		alternateTextColor: '#303030',
		canvasColor: colors.grey700,
		borderColor: colorManipulator.fade(colors.fullWhite, 0.3),
		disabledColor: colorManipulator.fade(colors.fullWhite, 0.3),
		pickerHeaderColor: colorManipulator.fade(colors.fullWhite, 0.12),
		clockCircleColor: colorManipulator.fade(colors.fullWhite, 0.12)
	}
};
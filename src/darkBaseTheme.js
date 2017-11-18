import * as colors from 'material-ui/styles/colors'
import * as colorManipulator from 'material-ui/utils/colorManipulator'
import spacing from 'material-ui/styles/spacing'

export const darkBaseTheme = {
	spacing: spacing,
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

import { useMemoStyle } from '@hooks/useMemoStyle';
import { COLORS } from '@utils/colors';
import React from 'react';
import * as RN from 'react-native';

interface IBaseHr extends Omit<RN.ViewProps, 'style'> {
	widthBorder?: RN.ViewStyle['borderTopWidth'];
	colorHr?: RN.ViewStyle['borderTopColor'];
	marginHr?: RN.ViewStyle['marginVertical'];
	dopStyle?: RN.ViewStyle;
}

export const MARGIN_HR = 15;

export const BaseHr: React.FC<IBaseHr> = ({
	widthBorder = 1,
	colorHr = COLORS.black,
	marginHr = MARGIN_HR,
	dopStyle,
	...props
}) => {
	const styleHR: RN.StyleProp<RN.ViewStyle> = {
		width: '100%',
		borderTopColor: colorHr,
		borderTopWidth: widthBorder,
		marginVertical: marginHr,
		opacity: 0.2,
		...dopStyle,
	};

	const memoStyleHr = useMemoStyle(
		() => styleHR,
		[colorHr, widthBorder, marginHr, dopStyle],
	);

	return <RN.View style={memoStyleHr} {...props} />;
};

import { useMemoStyle } from '@hooks/useMemoStyle';
import { COLORS } from '@utils/colors';
import React from 'react';
import * as RN from 'react-native';

interface IBaseText extends Omit<RN.TextProps, 'style'> {
	children: React.ReactNode;
	fontSize: number;
	ref?: React.RefObject<RN.Text>;
	color?: RN.ColorValue;
	fontWeight?: RN.TextStyle['fontWeight'];
	dopStyle?: RN.StyleProp<RN.TextStyle>;
}

export const BaseText: React.FC<IBaseText> = ({
	children,
	fontSize,
	color = COLORS.black,
	fontWeight = '400',
	dopStyle,
	...props
}) => {
	const stylesText: RN.StyleProp<RN.TextStyle> = {
		fontSize,
		color,
		fontWeight,
	};
	const memoStylesText = useMemoStyle(
		() => [stylesText, dopStyle],
		[fontSize, fontWeight, dopStyle, color],
	);
	return (
		<RN.Text style={memoStylesText} {...props}>
			{children}
		</RN.Text>
	);
};

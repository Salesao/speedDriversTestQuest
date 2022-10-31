import { IDriversState } from '@redux/drivers/types';
import { BaseText } from '@UI/BaseText';
import { COLORS } from '@utils/colors';
import { HEIGHT_TOTAL_HEADER } from '@utils/defaultParams';
import React from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';
import {
	EdgeInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';

interface IHeaderTotalDrivers extends Pick<IDriversState, 'total'> {
	animatedValue: Animated.AnimatedInterpolation<number>;
}

export const HeaderTotalDrivers: React.FC<IHeaderTotalDrivers> = ({
	animatedValue,
	total,
}) => {
	const { top } = initialWindowMetrics?.insets as EdgeInsets;
	const isIOS = Platform.OS === 'ios';
	return (
		<Animated.View
			style={[
				styled.headerTotalAnimated,
				{ transform: [{ translateY: animatedValue ?? 0 }] },
			]}
		>
			<View
				style={[styled.headerTotalContainer, { paddingTop: isIOS ? top : 0 }]}
			>
				<BaseText fontSize={15}>Cool Drivers</BaseText>
				<BaseText fontSize={20} fontWeight={'500'} color={COLORS.darkBlue}>
					{total}
				</BaseText>
			</View>
		</Animated.View>
	);
};

const styled = StyleSheet.create({
	headerTotalAnimated: {
		position: 'absolute',
		left: 0,
		right: 0,
		width: '100%',
		zIndex: 100,
		backgroundColor: COLORS.gray,
	},
	headerTotalContainer: {
		height: HEIGHT_TOTAL_HEADER,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

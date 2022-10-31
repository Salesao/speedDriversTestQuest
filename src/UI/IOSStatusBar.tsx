import { COLORS } from '@utils/colors';
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import {
	EdgeInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';

interface IIOSStatusBar {}

export const IOSStatusBar: React.FC<IIOSStatusBar> = () => {
	if (Platform.OS !== 'ios') {
		return null;
	}
	const { top } = initialWindowMetrics?.insets as EdgeInsets;

	return <View style={[styled.statusBar, { height: top - 3 }]} />;
};

const styled = StyleSheet.create({
	statusBar: {
		left: 0,
		right: 0,
		position: 'absolute',
		zIndex: 150,
		width: '100%',
		backgroundColor: COLORS.gray,
	},
});

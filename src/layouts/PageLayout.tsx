import { IOSStatusBar } from '@UI/IOSStatusBar';
import { COLORS } from '@utils/colors';
import { PADDING_CONTENT } from '@utils/defaultParams';
import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IPageLayout {
	children: React.ReactNode;
}

export const PageLayout: React.FC<IPageLayout> = ({ children }) => {
	return (
		<SafeAreaView
			edges={['top']}
			style={{ flex: 1, backgroundColor: COLORS.white }}
		>
			<StatusBar backgroundColor={COLORS.gray} barStyle={'dark-content'} />
			{children}
		</SafeAreaView>
	);
};

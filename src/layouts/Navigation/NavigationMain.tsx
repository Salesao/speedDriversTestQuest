import {
	createNativeStackNavigator,
	NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { ERoutes } from '@utils/screenParams';
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { HomeStackScreen } from './StackScreen';
import { NavigationMainParamList } from './typesNavigation';

const NavigatorMainStack =
	createNativeStackNavigator<NavigationMainParamList>();

export const baseScreenOptionsNavigator = (): NativeStackNavigationOptions => ({
	headerShown: false,
	animation: Platform.OS === 'ios' ? 'flip' : 'slide_from_right',
});

export const NavigationMain: React.FC = () => {
	return (
		<NavigatorMainStack.Navigator
			initialRouteName={ERoutes.main}
			screenOptions={baseScreenOptionsNavigator}
		>
			<NavigatorMainStack.Screen
				name={ERoutes.main}
				component={HomeStackScreen}
			/>
		</NavigatorMainStack.Navigator>
	);
};

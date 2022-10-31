import { DriverInfoPage } from '@pages/DriverInfoPage';
import { DriversListPage } from '@pages/DriversListPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ERoutes } from '@utils/screenParams';
import * as TN from './typesNavigation';
import React from 'react';
import { baseScreenOptionsNavigator } from './NavigationMain';

const HomeStack = createNativeStackNavigator<TN.HomeStackParamList>();

export const HomeStackScreen: React.FC = () => {
	return (
		<HomeStack.Navigator
			initialRouteName={ERoutes.driversList}
			screenOptions={baseScreenOptionsNavigator}
		>
			<HomeStack.Screen
				name={ERoutes.driversList}
				component={DriversListPage}
			/>
			<HomeStack.Screen name={ERoutes.driver} component={DriverInfoPage} />
		</HomeStack.Navigator>
	);
};

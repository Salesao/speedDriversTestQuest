import { RouteProp } from '@react-navigation/native';
import { IDrivers } from '@redux/drivers/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type HomeStackParamList = {
	driversList: undefined;
	driver: IDrivers;
};

export type NavigationMainParamList = {
	main: undefined;
};

export type TAllStack = HomeStackParamList | NavigationMainParamList;

export interface IPageNavigationProps<S extends TAllStack, K extends keyof S> {
	navigation: NativeStackNavigationProp<S, S[K] extends keyof S ? S[K] : K>;
	route: RouteProp<S, S[K] extends keyof S ? S[K] : K>;
}

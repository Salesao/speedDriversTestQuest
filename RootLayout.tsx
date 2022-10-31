import { store } from '@redux/store';
import App from './App';
import React from 'react';
import {
	initialWindowMetrics,
	SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

export const RootLayout: React.FC = () => {
	return (
		<Provider store={store}>
			<SafeAreaProvider initialMetrics={initialWindowMetrics}>
				<App />
			</SafeAreaProvider>
		</Provider>
	);
};

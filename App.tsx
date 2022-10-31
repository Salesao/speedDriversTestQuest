import { NavigationMain } from '@layouts/Navigation/NavigationMain';
import { useFlipper } from '@react-navigation/devtools';
import {
	NavigationContainer,
	useNavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';

const App = () => {
	const navigationRef = useNavigationContainerRef();
	useFlipper(navigationRef);

	return (
		<NavigationContainer ref={navigationRef}>
			<NavigationMain />
		</NavigationContainer>
	);
};

export default App;

import { EImg } from '@img/ImgsEnum';
import { IDrivers } from '@redux/drivers/types';
import { BaseHr } from '@UI/BaseHr';
import { BaseText } from '@UI/BaseText';
import { COLORS } from '@utils/colors';
import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { TDriversListPage } from '.';

interface IDriverWidget extends IDrivers {
	navigation: TDriversListPage['navigation'];
}

export const DriverWidget: React.FC<IDriverWidget> = ({
	navigation,
	...driver
}) => {
	const { givenName, familyName } = driver;

	const handlerNavigateMoreInfoDriver = () => {
		navigation.navigate('driver', driver);
	};

	return (
		<View style={styled.containerWidget}>
			<View style={styled.containerDriverPhoto}>
				<Image
					style={styled.driverPhoto}
					source={EImg.driverPhoto}
					resizeMode={'center'}
				/>
			</View>
			<Pressable onPress={handlerNavigateMoreInfoDriver}>
				{({ pressed }) => (
					<BaseText
						fontSize={15}
						color={COLORS.darkBlue}
						fontWeight={'500'}
						dopStyle={{ opacity: pressed ? 0.5 : 1, paddingTop: 10 }}
					>
						{`${givenName} ${familyName}`}
					</BaseText>
				)}
			</Pressable>
			<BaseHr />
		</View>
	);
};

const styled = StyleSheet.create({
	containerWidget: {
		alignItems: 'center',
	},
	containerDriverPhoto: {
		width: 100,
		height: 100,
		borderRadius: 100 / 4,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.lightBlue,
	},
	driverPhoto: {
		width: '100%',
		height: '100%',
		alignSelf: 'flex-end',
	},
});

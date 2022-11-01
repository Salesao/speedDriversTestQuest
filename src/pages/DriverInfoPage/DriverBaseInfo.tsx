import { EImg } from '@img/ImgsEnum';
import { IDrivers } from '@redux/drivers/types';
import { BaseText } from '@UI/BaseText';
import { COLORS } from '@utils/colors';
import {
	dateIsoIntlj,
	defaultFormatDate,
	PADDING_CONTENT,
} from '@utils/defaultParams';
import { DateTime, Interval } from 'luxon';
import React from 'react';
import {
	View,
	Text,
	Image,
	Pressable,
	StyleProp,
	ViewStyle,
	Linking,
	StyleSheet,
} from 'react-native';

interface IDriverBaseInfo extends Readonly<IDrivers> {}

export const DriverBaseInfo: React.FC<IDriverBaseInfo> = ({
	givenName,
	familyName,
	dateOfBirth,
	url,
	nationality,
}) => {
	const formatTimeDateBirthday = DateTime.fromFormat(dateOfBirth, dateIsoIntlj);
	const styledMoreInfo = ({
		pressed,
	}: {
		pressed: boolean;
	}): StyleProp<ViewStyle> => ({
		...styled.moreInfo,
		opacity: pressed ? 0.5 : 1,
	});

	const handlerPressURL = async () => {
		await Linking.openURL(url);
	};
	return (
		<View style={styled.container}>
			<View style={styled.containerPhoto}>
				<Image style={styled.photo} source={EImg.driverPhoto} />
			</View>
			<View>
				<BaseText
					fontSize={20}
					fontWeight={'500'}
					color={COLORS.darkBlue}
					dopStyle={{ paddingTop: 10 }}
				>{`${givenName} ${familyName}`}</BaseText>
				<View style={{ paddingVertical: 10 }}>
					<View style={{ flexDirection: 'row' }}>
						<BaseText fontSize={20} color={COLORS.darkGray}>
							Birthday:{' '}
						</BaseText>
						<BaseText fontSize={20} color={COLORS.gray}>
							{formatTimeDateBirthday.toFormat(defaultFormatDate)}
						</BaseText>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<BaseText fontSize={20} color={COLORS.darkGray}>
							Nationality:{' '}
						</BaseText>
						<BaseText fontSize={20} color={COLORS.gray}>
							{nationality}
						</BaseText>
					</View>
				</View>
				<Pressable style={styledMoreInfo} onPress={handlerPressURL}>
					<BaseText
						fontSize={20}
						color={COLORS.white}
						fontWeight={'500'}
						dopStyle={{ textAlign: 'center' }}
					>
						more info this cool gay
					</BaseText>
				</Pressable>
			</View>
		</View>
	);
};

const styled = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
	},
	containerPhoto: {
		flexGrow: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	photo: {
		width: 100,
		height: 100,
	},
	moreInfo: {
		padding: 15,
		backgroundColor: COLORS.darkBlue,
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

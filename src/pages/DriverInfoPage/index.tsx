import { EImg } from '@img/ImgsEnum';
import { baseScreenOptionsNavigator } from '@layouts/Navigation/NavigationMain';
import {
	HomeStackParamList,
	IPageNavigationProps,
} from '@layouts/Navigation/typesNavigation';
import { PageLayout } from '@layouts/PageLayout';
import { BaseText } from '@UI/BaseText';
import { COLORS } from '@utils/colors';
import {
	dateIsoIntlj,
	defaultFormatDate,
	PADDING_CONTENT,
} from '@utils/defaultParams';
import { DateTime, Interval } from 'luxon';
import React, { useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Pressable,
	StyleProp,
	ViewStyle,
	Linking,
	Platform,
} from 'react-native';

type TDriverInfoPage = IPageNavigationProps<HomeStackParamList, 'driver'>;

export const DriverInfoPage: React.FC<TDriverInfoPage> = ({
	route,
	navigation,
}) => {
	const { dateOfBirth, nationality, givenName, familyName, url } = route.params;
	const handlerBack = () => navigation.goBack();
	const formatTimeDatebirthday = DateTime.fromFormat(dateOfBirth, dateIsoIntlj);
	const yearDriver = Math.floor(
		Interval.fromDateTimes(formatTimeDatebirthday, DateTime.now()).length(
			'year',
		),
	);

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

	const handlerSetOptionNavigation = () => {
		navigation.setOptions({
			headerTitle: `${givenName} ${familyName}`,
			headerShown: true,
			headerStyle: {
				backgroundColor: COLORS.gray,
			},
			headerTintColor: COLORS.white,
			headerTitleAlign: 'center',

			headerLeft: () => (
				<Pressable onPress={handlerBack}>
					<BaseText color={COLORS.white} fontSize={25} fontWeight={'500'}>
						X
					</BaseText>
				</Pressable>
			),
		});

		return () => {
			navigation.setOptions({
				headerShown: false,
				animation: Platform.OS === 'ios' ? 'flip' : 'slide_from_right',
			});
		};
	};

	useEffect(handlerSetOptionNavigation, []);

	return (
		<PageLayout>
			<View style={styled.container}>
				<Image style={{ width: 100, height: 100 }} source={EImg.driverPhoto} />
				<BaseText
					fontSize={20}
					fontWeight={'500'}
					color={COLORS.darkBlue}
					dopStyle={{ paddingTop: 10 }}
				>{`${givenName} ${familyName}`}</BaseText>
				<View style={{ paddingVertical: 15 }}>
					<View style={{ flexDirection: 'row' }}>
						<BaseText fontSize={20} color={COLORS.darkGray}>
							Birthday:{' '}
						</BaseText>
						<BaseText
							fontSize={20}
							color={COLORS.gray}
						>{`${formatTimeDatebirthday.toFormat(
							defaultFormatDate,
						)} (${yearDriver} year)`}</BaseText>
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
					<BaseText fontSize={20} color={COLORS.white} fontWeight={'500'}>
						more info this cool gay
					</BaseText>
				</Pressable>
			</View>
		</PageLayout>
	);
};

const styled = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingHorizontal: PADDING_CONTENT,
		flex: 1,
		justifyContent: 'center',
	},
	moreInfo: {
		padding: 15,
		backgroundColor: COLORS.darkBlue,
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
	},
});

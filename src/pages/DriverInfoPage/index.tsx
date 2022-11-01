import { EImg } from '@img/ImgsEnum';
import { baseScreenOptionsNavigator } from '@layouts/Navigation/NavigationMain';
import {
	HomeStackParamList,
	IPageNavigationProps,
} from '@layouts/Navigation/typesNavigation';
import { PageLayout } from '@layouts/PageLayout';
import {
	getDriverStandingList,
	setDriverStandingList,
} from '@redux/drivers/action';
import { driverStandingListSelect } from '@redux/drivers/reducer';
import { IDriverStanding } from '@redux/drivers/types';
import { BaseText } from '@UI/BaseText';
import { ErrorRequest } from '@UI/ErrorRequest';
import { SkeletonStandingList } from '@UI/Sekeltons';
import { COLORS } from '@utils/colors';
import { PADDING_CONTENT } from '@utils/defaultParams';
import React, { useEffect, useRef, useState } from 'react';
import {
	StyleSheet,
	Pressable,
	Platform,
	SectionList,
	Animated,
	View,
	SectionListRenderItem,
} from 'react-native';
import {
	EdgeInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { DriverBaseInfo } from './DriverBaseInfo';

type TDriverInfoPage = IPageNavigationProps<HomeStackParamList, 'driver'>;

interface ISectionProps {
	data: IDriverStanding[];
	season: number;
}

export const DriverInfoPage: React.FC<TDriverInfoPage> = ({
	route,
	navigation,
}) => {
	const dispatch = useDispatch();
	const { givenName, familyName, driverId, standingList } = route.params;
	const driverStandingList = useSelector(driverStandingListSelect);
	const [loadStandingList, setLoadStandingList] = useState(
		standingList === undefined,
	);
	const [errorRequestStanding, setErrorRequestStanding] = useState<
		string | null
	>(null);
	const { bottom } = initialWindowMetrics?.insets as EdgeInsets;

	const handlerBack = () => navigation.goBack();

	const sectionRenderItem: SectionListRenderItem<
		IDriverStanding,
		ISectionProps
	> = ({ item }) => {
		return (
			<View style={{ paddingHorizontal: PADDING_CONTENT }}>
				<BaseText fontSize={15}>Points: {item.points}</BaseText>
				<BaseText fontSize={15}>Position: {item.position}</BaseText>
				<BaseText fontSize={15}>Wins: {item.wins}</BaseText>
				<BaseText fontSize={15}>
					Constuctors: {item.Constructors.map(car => car.name).join(', ')}
				</BaseText>
			</View>
		);
	};

	const handlerGetStandingList = () => {
		errorRequestStanding !== null && setErrorRequestStanding(null);
		dispatch(
			getDriverStandingList({
				driverId,
				callback: err => {
					setLoadStandingList(false);
					err !== undefined && setErrorRequestStanding(err);
				},
			}),
		);
	};

	const handlerTryAgainStanding = () => {
		setLoadStandingList(true);
		handlerGetStandingList();
	};

	const standingSectionList = (driverStandingList !== null ||
		standingList !== undefined) && (
		<SectionList
			sections={
				standingList === undefined
					? // @ts-ignore
					  driverStandingList.map(standing => ({
							data: standing.DriverStandings,
							season: standing.season,
					  }))
					: standingList?.map(standing => ({
							data: standing.DriverStandings,
							season: standing.season,
					  }))
			}
			renderSectionHeader={({ section: { season } }) => (
				<View style={styled.containerSectionHeader}>
					<BaseText fontSize={35} fontWeight={'500'} color={COLORS.darkBlue}>
						{season}
					</BaseText>
				</View>
			)}
			renderItem={sectionRenderItem}
			style={{ borderTopWidth: 1, marginTop: 20, borderBottomWidth: 1 }}
			contentContainerStyle={{ paddingBottom: bottom * 2 }}
			showsVerticalScrollIndicator={false}
		/>
	);

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

		handlerGetStandingList();

		return () => {
			navigation.setOptions({
				headerShown: false,
				animation: Platform.OS === 'ios' ? 'flip' : 'slide_from_right',
			});
			dispatch(setDriverStandingList(null));
		};
	};

	useEffect(handlerSetOptionNavigation, []);

	return (
		<PageLayout>
			<DriverBaseInfo {...route.params} />
			{!loadStandingList ? standingSectionList : <SkeletonStandingList />}
			{errorRequestStanding !== null && (
				<ErrorRequest tryAgain={handlerTryAgainStanding} />
			)}
		</PageLayout>
	);
};

const styled = StyleSheet.create({
	containerSectionHeader: {
		paddingVertical: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

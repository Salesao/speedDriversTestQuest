import { useEffectOnce } from '@hooks/useEffectOnce';
import { useHideScrollHeader } from '@hooks/useHideScrollHeader';
import {
	HomeStackParamList,
	IPageNavigationProps,
} from '@layouts/Navigation/typesNavigation';
import { PageLayout } from '@layouts/PageLayout';
import { getDrivers } from '@redux/drivers/action';
import { driverStateSelect } from '@redux/drivers/reducer';
import { BASE_LIMIT, IDrivers } from '@redux/drivers/types';
import { BaseText } from '@UI/BaseText';
import { ErrorRequest } from '@UI/ErrorRequest';
import { IOSStatusBar } from '@UI/IOSStatusBar';
import { SkeletonDriversList } from '@UI/Sekeltons';
import { COLORS } from '@utils/colors';
import { HEIGHT_TOTAL_HEADER, PADDING_CONTENT } from '@utils/defaultParams';
import React, { useState } from 'react';
import {
	View,
	Text,
	FlatList,
	ListRenderItem,
	Animated,
	useWindowDimensions,
	ActivityIndicator,
	Platform,
} from 'react-native';
import {
	EdgeInsets,
	initialWindowMetrics,
	SafeAreaView,
} from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { DriverWidget } from './DriverWidget';
import { HeaderTotalDrivers } from './HeaderTotalDrivers';

export type TDriversListPage = IPageNavigationProps<
	HomeStackParamList,
	'driversList'
>;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const DriversListPage: React.FC<TDriversListPage> = ({ navigation }) => {
	const dispatch = useDispatch();
	const { drivers, total, offset } = useSelector(driverStateSelect);
	const [loadDrivers, setLoadDrivers] = useState(true);
	const [loadDriversScroll, setLoadDriversScroll] = useState(false);
	const [errorRequestDrivers, setErrorRequestDrivers] = useState<string | null>(
		null,
	);
	const { translateY, handlerScroll, handlerSnap, topPadding, refScroll } =
		useHideScrollHeader<FlatList>(HEIGHT_TOTAL_HEADER);
	const { bottom } = initialWindowMetrics?.insets as EdgeInsets;
	const isAndroid = Platform.OS === 'android';

	const handlerTryAgain = () => {
		setLoadDrivers(true);
		handlerGetDrivers();
	};

	const handlerCallbackGetDrivers = (err?: string) => {
		setLoadDrivers(false);
		err !== undefined && setErrorRequestDrivers(err);
	};

	const renderDriversList: ListRenderItem<IDrivers> = ({ item }) => {
		return <DriverWidget {...item} navigation={navigation} />;
	};

	const handlerGetDrivers = () => {
		errorRequestDrivers !== null && setErrorRequestDrivers(null);
		dispatch(
			getDrivers({
				callback: handlerCallbackGetDrivers,
			}),
		);
	};

	const handlerMoreDrivers = () => {
		const isMoreDrivers =
			!loadDriversScroll && total !== null && offset + BASE_LIMIT < total;
		if (isMoreDrivers) {
			setLoadDriversScroll(true);
			dispatch(
				getDrivers({
					callback: () => {
						setLoadDriversScroll(false);
						handlerCallbackGetDrivers();
					},
				}),
			);
		}
	};

	const driversList = (
		<>
			<HeaderTotalDrivers animatedValue={translateY} total={total} />
			<AnimatedFlatList
				data={drivers}
				keyExtractor={({ driverId }: IDrivers) => String(driverId)}
				renderItem={renderDriversList}
				showsVerticalScrollIndicator={false}
				onScroll={handlerScroll}
				onMomentumScrollEnd={handlerSnap}
				ref={refScroll}
				scrollEventThrottle={16}
				contentContainerStyle={{
					paddingTop: topPadding + (isAndroid ? 15 : 0),
					paddingBottom: bottom,
				}}
				style={{
					paddingHorizontal: PADDING_CONTENT,
					transform: [{ translateY: isAndroid ? 0 : -3 }],
				}}
				bounces={false}
				ListFooterComponent={
					loadDriversScroll ? (
						<ActivityIndicator color={COLORS.darkBlue} size={30} />
					) : null
				}
				ListFooterComponentStyle={{ alignItems: 'center' }}
				onEndReached={handlerMoreDrivers}
				onEndReachedThreshold={0.3}
				initialNumToRender={BASE_LIMIT}
			/>
		</>
	);

	useEffectOnce(handlerGetDrivers);
	return (
		<PageLayout>
			<IOSStatusBar />
			{!loadDrivers ? (
				errorRequestDrivers ? (
					<ErrorRequest tryAgain={handlerTryAgain} />
				) : (
					driversList
				)
			) : (
				<SkeletonDriversList />
			)}
		</PageLayout>
	);
};

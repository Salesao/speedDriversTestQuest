import { RefObject, useRef } from 'react';
import {
	Animated,
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
} from 'react-native';
import {
	EdgeInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';

export const getCloser = (value: number, checkOne: number, checkTwo: number) =>
	Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

export interface IUseHideScrollHeader<T extends FlatList | ScrollView> {
	refScroll: RefObject<T>;
	handlerScroll: (...args: any[]) => void;
	handlerSnap: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
	translateY: Animated.AnimatedInterpolation<number>;
	topPadding: number;
}
const { top } = initialWindowMetrics?.insets as EdgeInsets;

export const useHideScrollHeader = <T extends FlatList | ScrollView>(
	heightHeader = 50 + top,
): IUseHideScrollHeader<T> => {
	const topPadding = useRef(heightHeader).current;
	const scrollY = useRef(new Animated.Value(0));
	const scrollYClamped = Animated.diffClamp(scrollY.current, 0, heightHeader);
	const refScroll = useRef<T>(null);
	const translateYNumber = useRef(0);

	const translateY = scrollYClamped.interpolate({
		inputRange: [0, heightHeader],
		outputRange: [0, -heightHeader],
	});

	const handlerScroll = Animated.event(
		[
			{
				nativeEvent: {
					contentOffset: { y: scrollY.current },
				},
			},
		],
		{
			useNativeDriver: false,
		},
	);

	translateY?.addListener(({ value }) => {
		translateYNumber.current = value;
	});

	const handlerSnap = ({
		nativeEvent,
	}: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetY = nativeEvent.contentOffset.y;
		if (
			!(
				translateYNumber.current === 0 ||
				translateYNumber.current === -heightHeader
			)
		) {
			if (refScroll.current) {
				(refScroll.current as FlatList).scrollToOffset({
					offset:
						getCloser(translateYNumber.current, -heightHeader, 0) ===
						-heightHeader
							? offsetY + heightHeader
							: offsetY - heightHeader,
				});
			}
		}
	};

	return { translateY, handlerScroll, handlerSnap, refScroll, topPadding };
};

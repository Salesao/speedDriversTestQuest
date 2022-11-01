import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const SkeletonDriversList = () => {
	return (
		<SkeletonPlaceholder>
			<View style={{ alignItems: 'center' }}>
				{[
					...Array.from(Array(5).keys()).map((_, idx) => (
						<React.Fragment key={idx}>
							<SkeletonPlaceholder.Item
								width={100}
								height={100}
								borderRadius={100 / 4}
							/>
							<SkeletonPlaceholder.Item
								width={100}
								height={10}
								marginTop={10}
							/>
							<SkeletonPlaceholder.Item
								width={'90%'}
								height={5}
								marginVertical={15}
							/>
						</React.Fragment>
					)),
				]}
			</View>
		</SkeletonPlaceholder>
	);
};

export const SkeletonStandingList = () => {
	return (
		<SkeletonPlaceholder>
			<View style={{ alignItems: 'center' }}>
				{[
					...Array.from(Array(5).keys()).map((_, idx) => (
						<React.Fragment key={idx}>
							<SkeletonPlaceholder.Item
								width={'100%'}
								height={5}
								marginTop={20}
							/>
							<SkeletonPlaceholder.Item
								width={30}
								height={10}
								marginVertical={40}
								borderRadius={4}
							/>
							<SkeletonPlaceholder.Item width={'100%'} height={5} />
						</React.Fragment>
					)),
				]}
			</View>
		</SkeletonPlaceholder>
	);
};

import { EImg } from '@img/ImgsEnum';
import { COLORS } from '@utils/colors';
import React from 'react';
import * as RN from 'react-native';
import { BaseText } from './BaseText';

interface IErrorRequest {
	tryAgain: () => void;
}

export const ErrorRequest: React.FC<IErrorRequest> = ({ tryAgain }) => {
	return (
		<RN.View style={styled.container}>
			<RN.Image
				style={styled.sadImage}
				source={EImg.sadSmile}
				resizeMode={'contain'}
			/>
			<BaseText fontSize={20}>Something went wrong : (</BaseText>
			<RN.Pressable onPress={tryAgain} style={styled.buttonTryAgain}>
				<BaseText fontSize={18} color={COLORS.white} fontWeight={'500'}>
					Go try again : )
				</BaseText>
			</RN.Pressable>
		</RN.View>
	);
};

const styled = RN.StyleSheet.create({
	container: {
		alignItems: 'center',
		alignSelf: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	sadImage: {
		width: 100,
		height: 100,
	},
	buttonTryAgain: {
		backgroundColor: COLORS.darkBlue,
		padding: 15,
		borderRadius: 15,
		width: '100%',
		textAlign: 'center',
		marginTop: 20,
	},
});

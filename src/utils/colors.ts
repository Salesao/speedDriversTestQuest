export enum COLORS {
	black = '#000',
	white = '#fff',
	gray = '#BABABA',
	darkGray = '#A0A0A0',
	lightGray = '#C4C4C4',
	darkBlue = '#2E71F3',
	lightBlue = '#95BCFF',
	veryLightBlue = 'rgba(46, 113, 243, 0.1)',
}

export const getHexOpacity = (perc: number): string => {
	if (perc < 0) {
		return '00';
	}
	if (perc > 100) {
		return 'FF';
	}
	const value = Math.trunc((perc * 255) / 100);
	const hex = value.toString(16);

	if (String(hex).length === 1) {
		return '0' + hex;
	}
	return hex;
};

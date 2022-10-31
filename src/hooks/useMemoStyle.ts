import { DependencyList, useMemo } from 'react';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type TStyles = ViewStyle | TextStyle | ImageStyle;

export const useMemoStyle = <
	TStyle extends TStyles,
	TOutput extends StyleProp<TStyle>,
>(
	styleFactory: () => TOutput,
	deps?: DependencyList,
): TOutput => useMemo(styleFactory, deps);

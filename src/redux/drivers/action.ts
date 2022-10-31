import * as T from './types';

export const getDrivers = (
	payload: T.IGetDrivers['payload'],
): T.IGetDrivers => ({
	type: T.GET_DRIVERS,
	payload,
});

export const setDrivers = (
	payload: T.ISetDrivers['payload'],
): T.ISetDrivers => ({
	type: T.SET_DRIVERS,
	payload,
});

export const setLimitForDrivers = (
	payload: T.ISetLimitForDrivers['payload'],
): T.ISetLimitForDrivers => ({
	type: T.SET_LIMIT_FOR_DRIVERS,
	payload,
});

export const setOffsetForDrivers = (
	payload: T.ISetOffsetForDrivers['payload'],
): T.ISetOffsetForDrivers => ({
	type: T.SET_OFFSET_FOR_DRIVERS,
	payload,
});

export const setTotalDrivers = (
	payload: T.ISetTotalDrivers['payload'],
): T.ISetTotalDrivers => ({
	type: T.SET_TOTAL_DRIVERS,
	payload,
});

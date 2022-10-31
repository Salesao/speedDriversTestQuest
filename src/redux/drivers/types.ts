export const SET_DRIVERS = 'DRIVERS/SET_DRIVERS';
export const GET_DRIVERS = 'DRIVERS/GET_DRIVERS';

export const SET_LIMIT_FOR_DRIVERS = 'DRIVERS/SET_LIMIT_FOR_DRIVERS';
export const SET_OFFSET_FOR_DRIVERS = 'DRIVERS/SET_OFFSET_FOR_DRIVERS';
export const SET_TOTAL_DRIVERS = 'DRIVERS/SET_TOTAL_DRIVERS';

export const BASE_LIMIT = 15;
export const BASE_OFFSET = 0;

export interface IGetDriversProps {
	callback: (err?: string) => void;
}

export interface IDrivers {
	dateOfBirth: string;
	driverId: string;
	familyName: string;
	givenName: string;
	nationality: string;
	url: string; // Сводка о водиле в википедии
}

export interface IDriversState {
	drivers: IDrivers[];
	limit: number;
	offset: number;
	total: number | null;
}

export interface IResultRequestDrivers {
	DriverTable: { Drivers: IDrivers[] };
	limit: number;
	offset: number;
	series: string;
	total: number;
	url: string;
	xmlns: string;
}

export interface ISetDrivers {
	type: typeof SET_DRIVERS;
	payload: IDrivers[];
}

export interface IGetDrivers {
	type: typeof GET_DRIVERS;
	payload: IGetDriversProps;
}

export interface ISetLimitForDrivers {
	type: typeof SET_LIMIT_FOR_DRIVERS;
	payload: number;
}

export interface ISetOffsetForDrivers {
	type: typeof SET_OFFSET_FOR_DRIVERS;
	payload: number;
}

export interface ISetTotalDrivers {
	type: typeof SET_TOTAL_DRIVERS;
	payload: number;
}

export type TDriversActions =
	| ISetDrivers
	| ISetLimitForDrivers
	| ISetOffsetForDrivers
	| ISetTotalDrivers;

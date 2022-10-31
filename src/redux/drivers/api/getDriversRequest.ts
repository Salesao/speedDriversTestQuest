import { api } from '@api/api';
import { IResultRequestDrivers } from '../types';

export const getDriversRequest = async (
	limit: number = 15,
	offset: number = 0,
): Promise<IResultRequestDrivers> => {
	const {
		data: { MRData },
	}: { data: { MRData: IResultRequestDrivers } } = await api.get(
		`/f1/drivers.json?limit=${limit}&offset=${offset}`,
	);
	return MRData;
};

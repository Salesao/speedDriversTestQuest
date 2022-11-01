import { api } from '@api/api';
import { IResultRequestDriverStandingTable } from '../types';

export const getDriverStandingRequest = async (
	idDriver: string,
): Promise<IResultRequestDriverStandingTable> => {
	const {
		data: { MRData },
	}: { data: { MRData: IResultRequestDriverStandingTable } } = await api.get(
		`/f1/drivers/${idDriver}/driverStandings.json`,
	);
	return MRData;
};

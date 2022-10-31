import { IRootState } from '@redux/rootReducer';
import * as T from './types';

const initialState: T.IDriversState = {
	drivers: [],
	limit: T.BASE_LIMIT,
	offset: T.BASE_OFFSET,
	total: null,
};

export const DriversReducer = (
	state: T.IDriversState = initialState,
	action: T.TDriversActions,
): T.IDriversState => {
	switch (action.type) {
		case T.SET_DRIVERS: {
			return { ...state, drivers: action.payload };
		}
		case T.SET_LIMIT_FOR_DRIVERS: {
			return { ...state, limit: action.payload };
		}
		case T.SET_OFFSET_FOR_DRIVERS: {
			return { ...state, offset: action.payload };
		}
		case T.SET_TOTAL_DRIVERS: {
			return { ...state, total: action.payload };
		}
		default: {
			return { ...state };
		}
	}
};

export const driverStateSelect = ({ driversState }: IRootState) => driversState;
export const driversSelect = ({ driversState: { drivers } }: IRootState) =>
	drivers;
export const queryForDriversSelect = ({
	driversState: { limit, offset },
}: IRootState) => ({ limit, offset });
export const totalDriversSelect = ({ driversState: { total } }: IRootState) =>
	total;

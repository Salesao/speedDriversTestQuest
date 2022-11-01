import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
	setDrivers,
	setDriverStandingList,
	setOffsetForDrivers,
	setTotalDrivers,
} from '../action';
import { getDriversRequest } from '../api/getDriversRequest';
import { getDriverStandingRequest } from '../api/getDriverStandingRequest';
import { driversSelect, queryForDriversSelect } from '../reducer';
import {
	BASE_LIMIT,
	GET_DRIVERS,
	GET_DRIVER_STANDINGS_LIST,
	IDrivers,
	IDriversState,
	IGetDrivers,
	IGetDriverStandingsList,
	IResultRequestDrivers,
	IResultRequestDriverStandingTable,
} from '../types';

type TDriversActionSaga = IGetDrivers | IGetDriverStandingsList;

function* driversActionSaga({ payload, type }: TDriversActionSaga) {
	try {
		switch (type) {
			case GET_DRIVERS: {
				const { limit, offset }: Pick<IDriversState, 'limit' | 'offset'> =
					yield select(queryForDriversSelect);
				const {
					DriverTable: { Drivers },
					total,
				}: IResultRequestDrivers = yield call(getDriversRequest, limit, offset);
				const driversRedux: IDrivers[] = yield select(driversSelect);
				yield put(
					setDrivers(
						driversRedux.length > 0 ? [...driversRedux, ...Drivers] : Drivers,
					),
				);
				yield put(setOffsetForDrivers(offset + BASE_LIMIT));
				yield put(setTotalDrivers(total));
				break;
			}
			case GET_DRIVER_STANDINGS_LIST: {
				const drivers: IDrivers[] = yield select(driversSelect);
				const standingListDriver = drivers.find(
					driver => driver.driverId === payload.driverId,
				)?.standingList;
				if (standingListDriver === undefined) {
					const {
						StandingsTable: { StandingsLists },
					}: IResultRequestDriverStandingTable = yield call(
						getDriverStandingRequest,
						payload.driverId,
					);
					yield put(
						setDrivers(
							drivers.map(driver =>
								driver.driverId === payload.driverId
									? { ...driver, standingList: StandingsLists }
									: driver,
							),
						),
					);
					yield put(setDriverStandingList(StandingsLists));
				}
				break;
			}
		}
		yield payload.callback();
	} catch (error) {
		console.log(error, 'error in driversActionSaga');
		yield payload.callback(error);
	}
}

export function* driversActionWatcher() {
	yield takeEvery([GET_DRIVERS, GET_DRIVER_STANDINGS_LIST], driversActionSaga);
}

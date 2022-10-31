import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
	setDrivers,
	setLimitForDrivers,
	setOffsetForDrivers,
	setTotalDrivers,
} from '../action';
import { getDriversRequest } from '../api/getDriversRequest';
import { driversSelect, queryForDriversSelect } from '../reducer';
import {
	BASE_LIMIT,
	GET_DRIVERS,
	IDrivers,
	IDriversState,
	IGetDrivers,
	IResultRequestDrivers,
} from '../types';

type TDriversActionSaga = IGetDrivers;

function* driversActionSaga({ payload }: TDriversActionSaga) {
	try {
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
		yield payload.callback();
	} catch (error) {
		console.log(error, 'error in driversActionSaga');
		yield payload.callback(error);
	}
}

export function* driversActionWatcher() {
	yield takeEvery([GET_DRIVERS], driversActionSaga);
}

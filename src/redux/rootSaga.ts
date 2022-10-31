import { all } from 'redux-saga/effects';
import { driversWatcher } from './drivers/saga';

export function* rootSaga() {
	yield all([driversWatcher()]);
}

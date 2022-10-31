import { all } from 'redux-saga/effects';
import { driversActionWatcher } from './driversActionSaga';

export function* driversWatcher() {
	yield all([driversActionWatcher()]);
}

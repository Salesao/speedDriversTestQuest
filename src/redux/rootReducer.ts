import { combineReducers } from 'redux';
import { DriversReducer } from './drivers/reducer';
import { IDriversState } from './drivers/types';

export interface IRootState {
	driversState: IDriversState;
}

export default combineReducers<IRootState>({
	driversState: DriversReducer,
});

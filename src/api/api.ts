import { BASE_API_DEV, BASE_API_PROD } from '@env';
import axios from 'axios';

export const BASE_API = __DEV__ ? BASE_API_DEV : BASE_API_PROD;

export const api = axios.create({
	baseURL: BASE_API + 'api',
	headers: {
		'Content-Type': 'application/json',
	},
});

// TODO сводка по API
// All API queries require a GET request using a URL of the form:

// http[s]://ergast.com/api/<series>/<season>/<round>/...

// where:
// <series> 	should be set to "f1"
// <season> 	is a 4 digit integer
// <round> 	is a 1 or 2 digit integer

import { environments } from '../../environments';

export const instance = (
	method: 'GET' | 'POST' | 'PUT' | 'PATCH',
	path: string,
	body: any,
	params?: { [key: string]: string | number }
) => {
	let url = `${environments.NEXT_APP_BACKEND_URI}${path}`;
	if (params) {
		url = url + '?';
		const keys = Object.keys(params);
		keys.forEach((p, index) => {
			url +=
				index === keys.length - 1 ? `${p}=${params[p]}` : `${p}=${params[p]}&`;
		});
	}
	if (method !== 'GET') {
		return fetch(url, {
			method,
			body: JSON.stringify(body),
		});
	}

	return fetch(url, {
		method,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	});
};

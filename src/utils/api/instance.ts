import { environments } from '../../environments';

export const instance = (
	method: 'GET' | 'POST' | 'PUT' | 'PATCH',
	path: string,
	body: any = {},
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
	console.log({ url });
	return fetch(url, {
		method,
		body: method !== 'GET' ? body : null,
		headers: {
			'Access-Controll-Allow-Origin': '*',
		},
	});
};

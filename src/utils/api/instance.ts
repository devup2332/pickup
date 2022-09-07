import { environments } from '../../environments';

export const instance = (
	method: string,
	path: string,
	body?: any = {},
	params?: any = {}
) => {
	let url = `${environments.NEXT_APP_BACKEND_URI}${path}`;
	if (params) {
		Object.keys(params).forEach((p) => {
			url += params[p];
		});
	}
	fetch(url, {
		method,
	});
};

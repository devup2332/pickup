import { instance } from '../instance';

export const usersInstance = {
	loginUser: async (email: string, password: string) => {
		const body = { email, password };
		console.log({ body });
		const res = await instance('POST', '/dev/signinUser', body);
		const data = await res.json();
		return data;
	},

	validateEmail: async (email: string) => {
		const res = await instance('POST', '/dev/validateEmail', { email });
		const { validate } = await res.json();
		return validate as boolean;
	},
};

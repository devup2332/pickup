import { instance } from '../instance';

export const usersInstance = {
	loginUser: async (email: string, password: string) => {
		const body = { email, password };
		console.log({ body });
		const res = await instance('POST', '/dev/loginUser', body);
		const data = await res.json();
		return data;
	},
};

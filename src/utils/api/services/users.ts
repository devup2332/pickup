import { instance } from '../instance';

export const usersInstance = {
	loginUser: async (email: string, password: string) => {
		const res = await instance('GET', '/dev/loginUser', { email, password });
		const data = await res.json();
		return data;
	},
};

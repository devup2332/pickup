import { instance } from '../instance';

export const usersInstance = {
	loginUser: async (email: string, password: string) => {
		const res = await instance(
			'GET',
			'/dev/loginUser',
			{ email, password },
			{ param1: 'dsadas', param2: 1123213, param3: 123123 }
		);
		const data = await res.json();
		return data;
	},
};

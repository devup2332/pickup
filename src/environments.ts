import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
const { NEXT_APP_BACKEND_URI } = publicRuntimeConfig;
const {
	NEXT_APP_GOOGLE_CLIENT_ID,
	NEXT_APP_GOOGLE_CLIENT_SECRET,
	NEXT_APP_JWT_SECRET,
} = serverRuntimeConfig;

export const environments = {
	NEXT_APP_BACKEND_URI,
	NEXT_APP_GOOGLE_CLIENT_ID,
	NEXT_APP_GOOGLE_CLIENT_SECRET,
	NEXT_APP_JWT_SECRET,
};
console.log({ environments });

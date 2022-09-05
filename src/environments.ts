import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { NEXT_APP_BACKEND_URI } = publicRuntimeConfig;
console.log({ NEXT_APP_BACKEND_URI, publicRuntimeConfig });

export const environments = {
	NEXT_APP_BACKEND_URI: NEXT_APP_BACKEND_URI,
};

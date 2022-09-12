/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	publicRuntimeConfig: {
		NEXT_APP_BACKEND_URI: process.env.NEXT_APP_BACKEND_URI,
	},
	serverRuntimeConfig: {
		NEXT_APP_GOOGLE_CLIENT_ID: process.env.NEXT_APP_GOOGLE_CLIENT_ID,
		NEXT_APP_GOOGLE_CLIENT_SECRET: process.env.NEXT_APP_GOOGLE_CLIENT_SECRET,
		NEXT_APP_JWT_SECRET: process.env.NEXT_APP_JWT_SECRET,
	},
};

module.exports = nextConfig;

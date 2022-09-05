/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	publicRuntimeConfig: {
		NEXT_APP_BACKEND_URI: process.env.NEXT_APP_BACKEND_URI,
	},
};

module.exports = nextConfig;

import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { environments } from '../../../environments';
export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: environments.NEXT_APP_GOOGLE_CLIENT_ID,
			clientSecret: environments.NEXT_APP_GOOGLE_CLIENT_SECRET,
		}),
	],
	secret: environments.NEXT_APP_JWT_SECRET,
};

export default NextAuth(authOptions);

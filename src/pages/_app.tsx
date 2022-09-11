import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ThemeProvider } from '@mui/material';
import i18next from 'i18next';
import type { AppProps } from 'next/app';
import { I18nextProvider } from 'react-i18next';
import { environments } from '../environments';
import '../styles/global.scss';
import theme from '../theme';
import globalEn from '../translations/en/index.json';
import globalEs from '../translations/es/index.json';

i18next.init({
	interpolation: { escapeValue: false },
	lng: 'en',
	resources: {
		en: {
			global: globalEn,
		},
		es: {
			global: globalEs,
		},
	},
});

const apolloClient = new ApolloClient({
	uri: `${environments.NEXT_APP_BACKEND_URI}/dev/graphql`,
	cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={apolloClient}>
			<I18nextProvider i18n={i18next}>
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</I18nextProvider>
		</ApolloProvider>
	);
}

export default MyApp;

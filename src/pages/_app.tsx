import { ThemeProvider } from '@mui/material';
import i18next from 'i18next';
import type { AppProps } from 'next/app';
import { I18nextProvider } from 'react-i18next';
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

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<I18nextProvider i18n={i18next}>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</I18nextProvider>
	);
}

export default MyApp;

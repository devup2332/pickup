import { ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import '../styles/global.scss';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;

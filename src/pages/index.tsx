import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import HomeContainer from '../containers/Home.container';
import Base from '../layouts/base/base';

const Home: NextPage = () => {
	const router = useRouter();
	useEffect(() => {
		router.push('login');
	}, []);
	return (
		<Base>
			<HomeContainer />
		</Base>
	);
};

export default Home;

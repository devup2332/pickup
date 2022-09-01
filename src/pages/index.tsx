import type { NextPage } from 'next';
import HomeContainer from '../containers/Home.container';
import Base from '../layouts/base/base';

const Home: NextPage = () => {
	return (
		<Base>
			<HomeContainer />
		</Base>
	);
};

export default Home;

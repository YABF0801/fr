import Footer from '../../common/Footer/Footer';
import { LoginForm } from './components/LoginForm';

import './styles/LandingPage.scss';

const LandingPage = () => {
	return (
		<section>
			<div className='main-home text-bg-white'>
				<main className='container-fluid' style={{ minHeight: '94.5vh' }}>
					<div className='row p-3'>
						<div className='col-12 col-md-6 '></div>
						<div className='text-white col-12 col-md-6 '>
							<h1 className='text-center text-md-end text-uppercase fw-bold'>OCI</h1>
							<p className='text-md-end '>
								La aplicación diseñada <br />
								para ayudar con el otorgamiento <br />
								de matrículas para círculos infantiles
							</p>
							<h4 className='text-md-end s'>Dirección Municipal de Educación Isla de la Juventud</h4>
						</div>
						<LoginForm />
					</div>
				</main>
				<Footer />
			</div>
		</section>
	);
};

export default LandingPage;

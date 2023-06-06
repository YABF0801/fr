import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// paths creados en core para rutas de navergador
import {
	HOME,
	PRIVATE,
	DASHBOARD,
	CIRCULOS,
	GENERAL_LIST,
	NEW_SUBMISISON,
	ORGANISMOS,
	PROPUESTAS_LIST,
	USERS,
	HELP,
} from './core/config/routes/paths';

// CONTEXT DE AUTENTIFICACION
import { AuthContextProvider } from './core/context/authContext';

// configuracion de rutas privadas y publicas que hay q descomentar dentro despues
import PrivateRoute from './core/guard/PrivateRoute';
import PublicRoute from './core/guard/PublicRoute';

// pantallas de paginas
import { Circulos } from './views/Dashboard/Circulos';
import DashboardScreen from './views/Dashboard/DashboardStats/DashboardScreen';
import { GeneralList } from './views/Dashboard/GeneralList';
import { Help } from './views/Dashboard/Help';
import { NewSubmision } from './views/Dashboard/NewSubmision';
import { NotFound } from './views/Dashboard/NotFound';
import Organismos from './views/Dashboard/Organismos/Organismos';
import { Propuestas } from './views/Dashboard/Propuestas';
import { Users } from './views/Dashboard/Users';
import LandingPage from './views/Home/LandingPage';
import DashboardLayout from './views/dashboard/layout/DashboardLayout';
import { AdminRoute } from './core/guard';
import { ToastContainer } from 'react-toastify';
import { PropuestasProvider } from './core/context/PopuestasContext';
import { SubmisionProvider } from './core/context/SumisionContext';



function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
			<SubmisionProvider>
			<PropuestasProvider>
				<>
					<Routes>
						<Route path={ HOME } element={ <PublicRoute /> }>
							<Route index element={ <LandingPage /> } />
						</Route>

						<Route path={ PRIVATE } element={ <PrivateRoute /> }>
							<Route element={ <DashboardLayout /> }>
								<Route index element={ <Navigate to={ DASHBOARD } /> } />
								<Route path={ DASHBOARD } element={ <DashboardScreen /> } />
								<Route path={ GENERAL_LIST } element={ <GeneralList /> } />
								<Route path={ CIRCULOS } element={ <Circulos /> } />
								<Route path={ ORGANISMOS } element={ <Organismos /> } />
								<Route path={ PROPUESTAS_LIST } element={ <Propuestas /> } />
								<Route path={ HELP } element={ <Help /> } />
								<Route element={ <AdminRoute /> }>
									<Route path={ USERS } element={ <Users /> } />
									<Route path={ NEW_SUBMISISON } element={ <NewSubmision /> } />
								</Route>
							</Route>
						</Route>

						<Route path='*' element={ <NotFound /> } />
					</Routes>
					<ToastContainer />
				</>
				</PropuestasProvider>
				</SubmisionProvider>
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import 'chart.js/auto';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import 'xlsx/xlsx';
import '../node_modules/@changey/react-leaflet-markercluster/dist/styles.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={ new QueryClient() }>
			<App />
			{/* <ReactQueryDevtools /> */}
		</QueryClientProvider>
	</React.StrictMode>
);

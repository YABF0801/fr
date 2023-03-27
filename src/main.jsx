import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import App from './App';


import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';
import '../node_modules/leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js'
import '../node_modules/react-leaflet-markercluster/dist/styles.min.css'
import 'react-tooltip/dist/react-tooltip.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js'
import '../node_modules/leaflet.markercluster/dist/MarkerCluster.css'
import '../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css'


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={new QueryClient()}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);


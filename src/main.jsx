import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import App from './App';

import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';
import 'leaflet/dist/leaflet.js';
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../node_modules/@changey/react-leaflet-markercluster/dist/styles.min.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'chart.js/auto';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'xlsx/xlsx'




ReactDOM.createRoot(document.getElementById('root')).render(
		<QueryClientProvider client={new QueryClient()}>
			<App />
		</QueryClientProvider>

);


import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import App from './App';

import '../node_modules/leaflet/dist/leaflet.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import './styles/main.scss';
import 'react-tooltip/dist/react-tooltip.css';
// import '../node_modules/leaflet/dist/leaflet.js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={new QueryClient()}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);

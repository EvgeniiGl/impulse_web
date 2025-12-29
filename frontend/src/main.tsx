import React from 'react';
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n/i18n';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
}

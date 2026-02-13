import React from 'react';
import {createRoot} from 'react-dom/client'
import './styles/colors.css'
import './styles/scrollbar.css'
import './index.css'
import './App.css'
import App from './App.tsx'
import './i18n/i18n';
import {store} from '@store/store';
import {Provider} from 'react-redux';
import {Toast} from "@components/Toast/Toast.tsx";

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App/>
                <Toast/>
            </Provider>
        </React.StrictMode>
    );
}

import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from '../App';

declare global {
  interface Window {
    __INITIAL_STATE__: any;  // You can provide a more specific type if you know the shape of your initial state
  }
}


const root = document.getElementById('root');

const initialState = window.__INITIAL_STATE__ || {};  // Fallback to an empty object if no state is passed

const abortController = new AbortController();
const { signal } = abortController;

if (root && !signal.aborted) {
  hydrateRoot(root, <App initialState={initialState} />);
} 

// Add an event listener for unmount to trigger abort
window.addEventListener('beforeunload', () => {
  abortController.abort();  // This will prevent any pending updates after unmount
});
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from '../App';

const root = document.getElementById('root');

const abortController = new AbortController();
const { signal } = abortController;

if (root && !signal.aborted) {
  // Create a new div inside the root
  // const newChild = document.createElement('div');
  // newChild.id = "showcase-container"
  // root?.appendChild(newChild);

  // console.log("root", root)

  // Hydrate the new child
  hydrateRoot(
    root, <App />
  );
} 

// Add an event listener for unmount to trigger abort
window.addEventListener('beforeunload', () => {
  abortController.abort();  // This will prevent any pending updates after unmount
});
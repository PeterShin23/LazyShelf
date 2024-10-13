require('ignore-styles');

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../App'; // Import the shared App component
import path from 'path';
import apiRouter from './api'; // Import API router

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.resolve(__dirname, '../../public')));

// Use the API router for `/api` routes
app.use('/api', apiRouter);

// Server-Side Rendering for all other routes
app.get('*', (req, res) => {
  const appString = renderToString(React.createElement(App as React.ComponentType));

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="./favicon.ico" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Web site created using create-react-app"
      />
      <link rel="apple-touch-icon" href="./logo192.png" />
      <link rel="manifest" href="./manifest.json" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&display=swap"
        rel="stylesheet"
      />
      <title>My Lazy Shelf</title>
    </head>
    <body>
      <div id="root">${appString}</div>
      <script src="/bundle.js"></script>
    </body>
    </html>
  `;

  res.send(html);
});
// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

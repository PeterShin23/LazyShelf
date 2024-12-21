require('ignore-styles');

import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../App'; // Import the shared App component
import path from 'path';
import apiRouter from './api'; // Import API router
import { dynamoReq } from './aws/dynamoDb/requests';
import 'dotenv/config'
import { BETA_IG_USER_IDS } from '../shared/constants';
import { metaReq } from './meta/requests';
import SecretsHelper from '../shared/helpers/secrets-helpers';

const app = express();

// Parse JSON in req body
app.use(express.json());
// Serve static files from the 'public' directory
app.use('/static', express.static(path.resolve(__dirname, '../../public')));
// Serve instagram-auth.html independently
app.get('/instagram-auth.html', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/instagram-auth.html'));
});
// Use the API router for `/api` routes
app.use('/api', apiRouter);

// Server-Side Rendering for all other routes
app.get('/*', async (req, res) => {
  try {
    let actualUsername = "";
  
    const queryUsername = req.url && req.url !== "/" 
      ? req.url.split("/")?.[1] ?? "peter.shin" 
      : "peter.shin";
  
    if (queryUsername && queryUsername.length <= 30 && BETA_IG_USER_IDS.includes(queryUsername)) {
      actualUsername = queryUsername;
    } else {
      actualUsername = "peter.shin"
    }

    // const secretsHelper = new SecretsHelper();
    // const encrypted = secretsHelper.encrypt("")
    // console.log("encrypted", encrypted);
    // const decrypted = secretsHelper.decrypt(encrypted);
    // console.log("decrypted", decrypted)

    const userConfig = await dynamoReq.getUserConfig(actualUsername);
    const userIgData = await metaReq.getIgUser(req, userConfig);

    const initialState = {
      username: actualUsername,
      userConfig: userConfig,
      userIgData: userIgData,
    }

    const appString = renderToString(React.createElement(
      App, { initialState }
    ));
  
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
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap" 
          rel="stylesheet"
        />
        <title>TheShowcase: @${actualUsername}</title>
      </head>
      <body>
        <div id="root">${appString}</div>
        <!-- Inject initial state as a global variable -->
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')}; 
        </script>
        <script src="/static/bundle.js"></script>
      </body>
      </html>
    `;
  
    res.send(html);
  } catch (err) {
    console.log(err);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

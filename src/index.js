import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

ReactDOM.render(
  <Auth0Provider
    domain="dev-zsz22tph.us.auth0.com"
    clientId="6ZvVQAAsyvKPV5LV8o5gXwFDCidLCW1R"
    redirectUri='http://localhost:3000'
>
  <App />
</Auth0Provider>,
document.getElementById('root')
);


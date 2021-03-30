import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

ReactDOM.render(
  <Auth0Provider
    domain="simoneodegard.us.auth0.com"
    clientId="qKaxiCcf5HmwBG3azh0Z95EfW3IVbjWV"
    redirectUri='http://localhost:3000'
>
  <App />
</Auth0Provider>,
document.getElementById('root')
);


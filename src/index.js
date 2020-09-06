import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import store from './ducks/store'
import { HashRouter, BrowserRouter } from "react-router-dom";
// import ApolloClient from 'apollo-boost';
import { ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import { ApolloProvider } from 'react-apollo';
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

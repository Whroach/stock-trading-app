import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import store from './ducks/store'
import { HashRouter } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { split } from 'apollo-link'
import {WebSocketLink} from 'apollo-link-ws'
import {getMainDefinition} from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'


// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:3005`,
//   options: {
//     reconnect: true,
//   }
// })

// const link = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query)
//     return kind === 'OperationDefinition' && operation === 'subscription'
//   },
//   wsLink
// )

// const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache()
// })


const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql'
});



ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <HashRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </HashRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

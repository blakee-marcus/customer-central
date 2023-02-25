import React, { lazy, Suspense } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';

const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Customer = lazy(() => import('./pages/Customer'));

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex-column justify-flex-start min-100-vh min-100-vw'>
          <Header />

          <Suspense
            fallback={
              <div className='text-primary mx-auto align-center'>
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/profile'>
                <Route path=':username' element={<Profile />} />
                <Route path='' element={<Profile />} />
              </Route>
              <Route path='/customer/:customerId' element={<Customer />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;


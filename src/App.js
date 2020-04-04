import React from 'react';
import './App.scss';
import theme from './assets/theme/theme';
import { ThemeProvider } from 'emotion-theming';
import { ApolloProvider } from '@apollo/react-hooks';
import { Navbar } from './components/Navbar';
import { Map } from './components/Map';
import { apolloClient } from './plugins/apollo';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Map />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

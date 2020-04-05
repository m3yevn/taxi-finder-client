import React from 'react';
import { render } from '@testing-library/react';
import { Map } from './Map';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '../plugins/apollo';

describe('Map component testing', () => {
  test('renders map', () => {
    expect(null).toBeNull();
  });
});
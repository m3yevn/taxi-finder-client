import React from 'react';
import { render, wait } from '@testing-library/react';
import { Map } from './Map';
import { renderHook } from '@testing-library/react-hooks'
import { useMap } from './hooks/useMap';
import { MockedProvider } from '@apollo/react-testing';
import { DRIVERS_MOCK_QUERY, DRIVERS_MOCK_DATA } from './Map.mock';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '../plugins/apollo';

describe('Map component testing', () => {
  it('renders map component', async () => {
    const { container } = render(<ApolloProvider client={apolloClient}><Map /></ApolloProvider>)
    expect(container).toBeInTheDocument();
    await wait(() => {
      expect(container.getElementsByClassName('leaflet-container')[0]).toBeInTheDocument();
    })
  });

  it('triggers useMap hook', () => {
    const { result } = renderHook(() => useMap());
    expect(result.current).toHaveProperty('zoom');
    expect(result.current).toHaveProperty('getDrivers');
    expect(result.current).toHaveProperty('pickupEta');
    expect(result.current).toHaveProperty('mapElement');
    expect(result.current).toHaveProperty('loading');
  });

  it('getDrivers with mock data', async () => {
    let renderCount = 0;
    const Component = () => {
      const { getDrivers, loading, data, mapElement } = useMap();
      switch (renderCount) {
        case 0:
          expect(loading).toEqual(false);
          setTimeout(() => {
            getDrivers();
          });
          break;
        case 1:
          expect(loading).toEqual(true);
          break;
        case 2:
          expect(loading).toEqual(false);
          expect(data.drivers.pickup_eta).toBe(DRIVERS_MOCK_DATA.drivers.pickup_eta);
          expect(data.drivers.drivers).toStrictEqual(DRIVERS_MOCK_DATA.drivers.drivers);
          break;
      }
      renderCount++;
      return (<div ref={mapElement}></div>);
    };

    render(
      <MockedProvider mocks={DRIVERS_MOCK_QUERY}>
        <Component />
      </MockedProvider>
    );

    await wait(() => {
      expect(renderCount).toBe(4);
    });
  });
});
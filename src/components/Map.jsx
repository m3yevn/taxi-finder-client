import React, { useRef, useEffect, useState } from 'react';
import L from "leaflet";
import "leaflet-rotatedmarker";
import { Box, Text } from 'rebass';
import { Slider } from '@rebass/forms'
import { useLazyQuery } from '@apollo/react-hooks';
import { DRIVERS } from '../graphql/queries';
import BarLoader from 'react-spinners/BarLoader';
import PulseLoader from 'react-spinners/PulseLoader';
import theme from '../assets/theme/theme';

const mapStyle = {
  width: "100%",
  height: "75vh",
  backgroundColor: 'lightgray',
  color: 'lightgray',
  borderRadius: '8px'
};

const markerIcon = L.icon({
  iconUrl: require('../assets/img/map-icon.png'),
  iconSize: [40, 20],
});

export function Map(props) {
  const mapElement = useRef(null);
  const map = useRef(null);
  const markList = useRef([]);
  const [zoom, setZoom] = useState(14);
  const [count, setCount] = useState(10);
  const [pickupEta, setPickupEta] = useState(null);

  const handleCountChange = (e) => {
    setCount(e.target.value);
  };

  const [getDrivers, { loading }] = useLazyQuery(DRIVERS, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      if (!data || !data.drivers) {
        return;
      }
      setPickupEta(data.drivers.pickup_eta);
      if (!map.current) {
        map.current = L.map(mapElement.current, {
          center: [51.502154677401634, -0.08508052507999317],
          zoom: zoom,
          minZoom: 8,
          layers: [
            L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }),
          ]
        });
        map.current.on('zoomend', (e) => {
          setZoom(map.current.getZoom())
        })
      }

      if (markList.current && markList.current.length > 0) {
        markList.current.forEach(markItem => {
          map.current.removeLayer(markItem);
        })
      }
      data.drivers.drivers.forEach((marker) => {
        const { latitude, longitude, bearing } = marker.location;
        markList.current.push(L.marker([latitude, longitude], { icon: markerIcon, rotationAngle: bearing })
          .addTo(map.current).bindPopup(
            // eslint-disable-next-line
            `<span><b>Driver ID:</b> ${marker.driver_id}</span>` + '<br/>'
            // eslint-disable-next-line
            + `<span><b>Latitude:</b> ${latitude}</span>` + '<br/>'
            // eslint-disable-next-line
            + `<span><b>Longitude:</b> ${longitude}</span>`));
      });
    }
  });

  useEffect(() => { //add taxi marker
    const countInt = parseInt(count);
    getDrivers({ variables: { count: countInt } });
  }, [count, getDrivers]);

  return (
    <Box>
      <div className="wrapper__bar_loader">
        <BarLoader width="100%" color={theme.colors.secondary} loading={loading} />
      </div>
      <div style={mapStyle} ref={mapElement} />
      <Box p={[1, 3]} bg="whitesmoke">
        <Box display="flex">
          <Text fontWeight="bold">Estimated Time: {pickupEta ? `${pickupEta} min` : 'loading...'}</Text>
          <Box mx="auto" />
          <Text className="text__map_info" fontWeight='bold'>
            Zoom: {zoom}</Text>
        </Box>
        <Slider color="primary" value={count} onChange={handleCountChange} min={1} max={50} />
        <Box display={'flex'} fontWeight="bold">
          <Text>1</Text>
          <Box mx="auto"></Box>
          <Text bg="primary" color="white" fontSize={20} p={1} display="flex">
            <PulseLoader color="white" size={5} loading={loading} />
            {count}
            {count > 1 ? ' drivers' : ' driver'}</Text>
          <Box mx="auto"></Box>
          <Text>50</Text>
        </Box>
      </Box>
    </Box>
  )
}
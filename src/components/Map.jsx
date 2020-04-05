import React, { useEffect, useState } from 'react';
import { Box, Text } from 'rebass';
import { Slider } from '@rebass/forms'
import BarLoader from 'react-spinners/BarLoader';
import PulseLoader from 'react-spinners/PulseLoader';
import theme from '../assets/theme/theme';
import { useMap } from './hooks/useMap';

const mapStyle = {
  width: "100%",
  height: "75vh",
  backgroundColor: 'lightgray',
  color: 'lightgray',
  borderRadius: '8px'
};

export function Map(props) {
  const {mapElement, zoom, getDrivers, loading, pickupEta } = useMap();
  const [count, setCount] = useState(10);

  const handleCountChange = (e) => {
    setCount(e.target.value);
  };

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
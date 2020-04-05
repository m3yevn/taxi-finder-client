import React from 'react';
import { Flex, Text, Box, Link } from 'rebass';
import { GoMarkGithub } from 'react-icons/go';

export function Navbar(props) {
  return (
    <Flex
      p={2}
      color='white'
      bg='primary'
      alignItems='center'>
      <div className="logo"></div>
      <Text p={2} fontWeight='bold' fontSize={[16,30]}>Taxi Finder</Text>
      <Box mx='auto' />
      <Link display={'flex'} fontSize={[12,16]} color="white" href='https://github.com/m3yevn/taxi-finder-client' target="_blank">
        <GoMarkGithub size={25} />
        <Text display={['none','block']} mx={1}>Github</Text>
    </Link>
    </Flex>
  );
}
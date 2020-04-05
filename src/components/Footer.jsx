import React from 'react';
import { Flex, Link, Text } from 'rebass';

export function Footer(props) {
  return (<Flex
    p={2}
    color='white'
    bg='primary'>
    Crafted with <span role="img" aria-labelledby="heart">❤️ by</span>
    <Link display={'flex'} fontSize={[12, 16]} color="gold" href='https://github.com/m3yevn' target="_blank">
      <Text display={['none', 'block']} mx={1}>Kevin Moe Myint Myat</Text>
    </Link>
  </Flex>)
}
import React from 'react';
import { Box, Container, Flex, Link, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <Box bg="blue.100" h="50px">
            <Container maxW="container.lg">
                <Flex fontSize={"20px"} alignItems="center">
                    <Link as={NavLink} to="/" textDecoration="none"  >
                        Navbar
                    </Link>
                    <Flex ml="auto">
                        <Link fontSize={"20px"} as={NavLink} to="/" textDecoration="none"  >
                            Home
                        </Link>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
};

export default Navbar;

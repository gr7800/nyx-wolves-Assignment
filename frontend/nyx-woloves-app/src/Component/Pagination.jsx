import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

const Paginations = ({ handlePrevious, handleNext, page, pageCount, setPage }) => {
    return (
        <Box margin={"auto"}>
            {pageCount > 0 && (
                <Box className="pagination_div d-flex justify-content-end mx-5">
                    <Button
                        onClick={() => handlePrevious()}
                        disabled={page === 1}
                        colorScheme="teal"
                        variant="outline"
                    >
                        Previous
                    </Button>
                    {Array(pageCount)
                        .fill(null)
                        .map((_, index) => (
                            <Button
                                key={index}
                                onClick={() => setPage(index + 1)}
                                isActive={page === index + 1}
                                colorScheme="teal"
                                variant="outline"
                                ml={2}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    <Button
                        onClick={() => handleNext()}
                        disabled={page === pageCount}
                        colorScheme="teal"
                        variant="outline"
                        ml={2}
                    >
                        Next
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Paginations;

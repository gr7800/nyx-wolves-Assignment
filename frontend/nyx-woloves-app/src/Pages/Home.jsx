import React, { useContext, useEffect, useState } from 'react';
import {
    FormLabel,
    FormControl,
    Input,
    Button,
    HStack,
    VStack,
    Box,
    RadioGroup,
    Radio,
    Select,
    Alert,
    AlertIcon,
    CloseButton,
} from '@chakra-ui/react';
import { AddIcon, SearchIcon, DownloadIcon, ChevronDownIcon } from '@chakra-ui/icons';
import Tables from '../Component/Table';
import Spinner from '../Component/Spiner';
import { useNavigate } from 'react-router-dom';
import { userGetFunc, deleteFunc, tocsvfunc } from '../Services/Apis';
import { useToast } from '@chakra-ui/react';
import { addData, updateData, deletData } from '../Context/ContextProvide';

const Home = () => {
    const [userData, setUserData] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);
    const [search, setSearch] = useState('');
    const [gender, setGender] = useState('All');
    const [status, setStatus] = useState('All');
    const [sort, setSort] = useState('new');
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const { userAdd, setUserAdd } = useContext(addData);
    const { update, setUpdate } = useContext(updateData);
    const { deleteData, setDeleteData } = useContext(deletData);

    const navigate = useNavigate();
    const toast = useToast();

    const addUser = () => {
        navigate('/register');
    };

    const getUser = async () => {
        const response = await userGetFunc(search, gender, status, sort, page);
        if (response.status === 200 && response.data) {
            setUserData(response.data.usersdata);
            setPageCount(response.data.Pagination?.pageCount || 0);
        } else {
            console.log('Error fetching user data');
        }
    };


    // Delete user
    const deleteUser = async (id) => {
        const response = await deleteFunc(id);
        if (response.status === 200) {
            console.log(response)
            getUser();
            // setDeleteData(response.data);
        } else {
            toast({
                title: 'Error',
                description: 'An error occurred while deleting the user.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Export user
    const exportUser = async () => {
        const response = await tocsvfunc();
        if (response.status === 200) {
            window.open(response.data.downloadUrl, '_blank');
        } else {
            toast({
                title: 'Error',
                description: 'An error occurred while exporting to CSV.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Handle previous button click
    const handlePrevious = () => {
        setPage((prevPage) => {
            if (prevPage === 1) return prevPage;
            return prevPage - 1;
        });
    };

    // Handle next button click
    const handleNext = () => {
        setPage((prevPage) => {
            if (prevPage === pageCount) return prevPage;
            return prevPage + 1;
        });
    };

    useEffect(() => {
        getUser();
        setTimeout(() => {
            setShowSpinner(false);
        }, 1200);
    }, [search, gender, status, sort, page]);

    return (
        <Box bg={"lightgray"}>
            {userAdd && (
                <Alert status="success" mb={4} borderRadius="md">
                    <AlertIcon />
                    {userAdd.fname.toUpperCase()} successfully added.
                    <CloseButton position="absolute" right="8px" top="8px" onClick={() => setUserAdd('')} />
                </Alert>
            )}

            {update && (
                <Alert status="info" mb={4} borderRadius="md">
                    <AlertIcon />
                    {update.fname.toUpperCase()} successfully updated.
                    <CloseButton position="absolute" right="8px" top="8px" onClick={() => setUpdate('')} />
                </Alert>
            )}

            {deleteData && (
                <Alert status="error" mb={4} borderRadius="md">
                    <AlertIcon />
                    {deleteData.fname.toUpperCase()} successfully deleted.
                    <CloseButton position="absolute" right="8px" top="8px" onClick={() => setDeleteData('')} />
                </Alert>
            )}

            <Box className="container">
                <Box className="main_div">
                    {/* Search and Add button */}
                    <HStack className="search_add mt-4 justify-between" >
                        <FormControl flex="1" mr="2">
                            <Input
                                type="search"
                                placeholder="Search"
                                onChange={(e) => setSearch(e.target.value)}
                                bg={"red.100"}
                            />
                        </FormControl>
                        <Button variant="success" onClick={() => console.log('Search button clicked')} bg={"red.300"}>
                            <SearchIcon /> Search
                        </Button>
                        <Button variant="primary" onClick={addUser} bg={"red.300"}>
                            <AddIcon /> Add User
                        </Button>
                    </HStack>

                    {/* Export, Gender, Status */}
                    <HStack className="filter_div mt-5 justify-between" flexWrap="wrap" bg={"azure"} p={"20px"} display={"flex"} justifyContent={"space-evenly"} >
                        <Box className="filter_gender"  bg={"red.100"} p={"20px"} borderRadius={"md"} >
                            <Box className="filter">
                                <FormLabel>Filter By Gender</FormLabel>
                                <RadioGroup name="gender" value={gender} onChange={(value) => setGender(value)}>
                                    <HStack>
                                        <Radio value="All">All</Radio>
                                        <Radio value="Male">Male</Radio>
                                        <Radio value="Female">Female</Radio>
                                    </HStack>
                                </RadioGroup>
                            </Box>
                        </Box>

                        <Box className="filter_newold" bg={"red.100"} p={"20px"} borderRadius={"md"}>
                            <FormLabel>Sort By Value</FormLabel>
                            <Select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                icon={<ChevronDownIcon />}
                                bg={"red.300"}
                            >
                                <option value="new">New</option>
                                <option value="old">Old</option>
                            </Select>
                        </Box>

                        <Box className="filter_status"  bg={"red.100"} p={"20px"} borderRadius={"md"} >
                            <Box className="status">
                                <FormLabel>Filter By Status</FormLabel>
                                <RadioGroup
                                    name="status"
                                    value={status}
                                    onChange={(value) => setStatus(value)}
                                >
                                    <HStack>
                                        <Radio value="All">All</Radio>
                                        <Radio value="Active">Active</Radio>
                                        <Radio value="InActive">InActive</Radio>
                                    </HStack>
                                </RadioGroup>
                            </Box>
                        </Box>
                    </HStack>
                </Box>

                {showSpinner ? (
                    <Spinner />
                ) : (
                    userData && userData.length > 0 ? (
                        <Tables
                            userdata={userData}
                            deleteUser={deleteUser}
                            userGet={getUser}
                            handlePrevious={handlePrevious}
                            handleNext={handleNext}
                            page={page}
                            pageCount={pageCount}
                            setPage={setPage}
                        />
                    ) : (
                        <p>No data available.</p>
                    )
                )}

            </Box>
        </Box>
    );
};

export default Home;

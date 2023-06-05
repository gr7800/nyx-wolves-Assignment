import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Badge,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react';
import { statuschangefunc } from '../Services/Apis';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from '../Services/helper';
import Paginations from './Pagination';

const Tables = ({ userdata, deleteUser, userGet, handlePrevious, handleNext, page, pageCount, setPage, }) => {
    const handleChange = async (id, status) => {
        const response = await statuschangefunc(id, status);

        if (response.status === 200) {
            userGet();
            toast.success('Status Updated');
        } else {
            toast.error('Error');
        }
    };

    let navigate = useNavigate();

    const handleviewclick = (id) => {
        navigate(id);
    }

    const handleEdit = (id) => {
        navigate(id)
    }

    return (
        <Box>
            <Box className="container">
                <Box className="col mt-0">
                    <Box shadow="lg">
                        <Table variant="striped" size="sm">
                            <Thead className="thead-dark">
                                <Tr className="table-dark">
                                    <Th>ID</Th>
                                    <Th>FullName</Th>
                                    <Th>Email</Th>
                                    <Th>Gender</Th>
                                    <Th>Status</Th>
                                    <Th>Profile</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {userdata.length > 0 ? (
                                    userdata.map((element, index) => (
                                        <Tr key={index}>
                                            <Td>{index + 1 + (page - 1) * 4}</Td>
                                            <Td>{element.fname + element.lname}</Td>
                                            <Td>{element.email}</Td>
                                            <Td>{element.gender === 'Male' ? 'M' : 'F'}</Td>
                                            <Td className="d-flex align-items-center">
                                                <Badge
                                                    colorScheme={
                                                        element.status === 'Active' ? 'green' : 'red'
                                                    }
                                                >
                                                    {element.status}
                                                </Badge>
                                                <Menu>
                                                    <MenuButton as={Button} variant="light">
                                                        <i className="fa-solid fa-caret-down"></i>
                                                    </MenuButton>
                                                    <MenuList>
                                                        <MenuItem
                                                            onClick={() =>
                                                                handleChange(element._id, 'Active')
                                                            }
                                                        >
                                                            Active
                                                        </MenuItem>
                                                        <MenuItem
                                                            onClick={() =>
                                                                handleChange(element._id, 'InActive')
                                                            }
                                                        >
                                                            InActive
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </Td>
                                            <Td className="img_parent">
                                                <img
                                                    src={`${BASE_URL}/uploads/${element.profile}`}
                                                    alt="img"
                                                    width={'50px'}
                                                    height={'50px'}
                                                />
                                            </Td>
                                            <Td>
                                                <Menu>
                                                    <MenuButton
                                                        as={Button}
                                                        variant="light"
                                                        className="action"
                                                    >
                                                        ⁝
                                                    </MenuButton>
                                                    <MenuList>
                                                        <MenuItem onClick={() => handleviewclick(`/userprofile/${element._id}`)}>
                                                            <i
                                                                className="fa-solid fa-eye"
                                                                style={{ color: 'green' }}
                                                            ></i>{' '}
                                                            <span>View</span>
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handleEdit(`/edit/${element._id}`)}>
                                                            <i
                                                                className="fa-solid fa-pen-to-square"
                                                                style={{ color: 'blue' }}
                                                            ></i>{' '}
                                                            <span>Edit</span>
                                                        </MenuItem>
                                                        <MenuItem onClick={() => deleteUser(element._id)}>
                                                            <i
                                                                className="fa-solid fa-trash"
                                                                style={{ color: 'red' }}
                                                            ></i>{' '}
                                                            <span>Delete</span>
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </Td>
                                        </Tr>
                                    ))
                                ) : (
                                    <Box className="no_data text-center">NO Data Found</Box>
                                )}
                            </Tbody>
                        </Table>
                        <Box w={"100%"} display={"flex"} justifyContent={"center"}>
                            <Paginations
                                handlePrevious={handlePrevious}
                                handleNext={handleNext}
                                page={page}
                                pageCount={pageCount}
                                setPage={setPage}
                            />
                        </Box>
                    </Box>
                </Box>
                <ToastContainer />
            </Box>
        </Box>
    );
};

export default Tables;

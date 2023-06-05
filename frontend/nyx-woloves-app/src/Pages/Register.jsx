import React, { useContext, useEffect, useState } from 'react';
import {
    Button,
    FormLabel,
    FormControl,
    Card,
    Input,
    Radio,
    Stack,
    useToast,
    Image,
    Heading,
    Box,
} from '@chakra-ui/react';
import { registerfunc } from '../Services/Apis';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { addData } from '../Context/ContextProvide';
import { Select } from '@chakra-ui/react';
import Spiner from '../Component/Spiner';

const Register = () => {
    const [inputData, setInputData] = useState({
        fname: '',
        lname: '',
        email: '',
        mobile: '',
        gender: '',
        location: '',
    });

    const [status, setStatus] = useState('Active');
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState('');
    const [showSpin, setShowSpin] = useState(true);

    const navigate = useNavigate();
    const toast = useToast();

    const { useradd, setUseradd } = useContext(addData);

    // status options
    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'InActive', label: 'InActive' },
    ];

    // setInput Value
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    // status set
    const setStatusValue = (e) => {
        setStatus(e.target.value);
    };

    // profile set
    const setProfile = (e) => {
        setImage(e.target.files[0]);
    };

    //submit userdata
    const submitUserData = async (e) => {
        e.preventDefault();

        const { fname, lname, email, mobile, gender, location } = inputData;

        if (fname === '') {
            toast({
                title: 'First name is Required !',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else if (lname === '') {
            toast({
                title: 'Last name is Required !',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else if (email === '') {
            toast({
                title: 'Email is Required !',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else if (!email.includes('@')) {
            toast({
                title: 'Enter Valid Email !',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else if (mobile === '') {
            toast({
                title: 'Mobile is Required !',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else if (mobile.length > 10) {
            toast({
                title: 'Enter Valid Mobile!',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else if (gender === '') {
            toast({
                title: 'Gender is Required !',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else if (status === '') {
            toast({
                title: 'Status is Required !',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else if (image === '') {
            toast({
                title: 'Profile is Required !',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else if (location === '') {
            toast({
                title: 'Location is Required !',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else {
            const data = new FormData();
            data.append('fname', fname);
            data.append('lname', lname);
            data.append('email', email);
            data.append('mobile', mobile);
            data.append('gender', gender);
            data.append('status', status);
            data.append('user_profile', image);
            data.append('location', location);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            try {
                const response = await registerfunc(data, config);

                if (response.status === 200) {
                    setInputData({
                        ...inputData,
                        fname: '',
                        lname: '',
                        email: '',
                        mobile: '',
                        gender: '',
                        location: '',
                    });
                    setStatus('');
                    setImage('');
                    setUseradd(response.data);
                    navigate('/');
                } else {
                    toast({
                        title: 'Error!',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                console.log(error);
                toast({
                    title: 'Error!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    useEffect(() => {
        if (image) {
            setPreview(URL.createObjectURL(image));
        }

        setTimeout(() => {
            setShowSpin(false);
        }, 1200);
    }, [image]);

    return (
        <Box p={"20px"}>
            {showSpin ? (
                <Spiner />
            ) : (
                <Box className="container" p={"20px"} bg={"Window"}>
                    <Heading  m={"20px"} textAlign={"center"}>Register Your Details</Heading >
                    <Card bg={"lightgray"} p={"20px"}>
                        <Box className="profile_Box text-center">
                            <Image src={preview ? preview : '/man.png'} alt="img" w={"100px"} h={"100px"} />
                        </Box>

                        <form>
                            <Stack spacing={3} bg={"lightgreen"} p={"20px"} borderRadius={"15px"}>
                                <FormControl isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input
                                       bg={"red.100"}
                                        type="text"
                                        name="fname"
                                        value={inputData.fname}
                                        onChange={setInputValue}
                                        placeholder="Enter First Name"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input
                                       bg={"red.100"}
                                        type="text"
                                        name="lname"
                                        value={inputData.lname}
                                        onChange={setInputValue}
                                        placeholder="Enter Last Name"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                       bg={"red.100"}
                                        type="email"
                                        name="email"
                                        value={inputData.email}
                                        onChange={setInputValue}
                                        placeholder="Enter Email"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Mobile</FormLabel>
                                    <Input
                                       bg={"red.100"}
                                        type="text"
                                        name="mobile"
                                        value={inputData.mobile}
                                        onChange={setInputValue}
                                        placeholder="Enter Mobile"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Select Your Gender</FormLabel>
                                    <Stack direction="row" bg={"red.100"}>
                                        <Radio
                                            name="gender"
                                            value="Male"
                                            onChange={setInputValue}
                                        >
                                            Male
                                        </Radio>
                                        <Radio
                                            name="gender"
                                            value="Female"
                                            onChange={setInputValue}
                                        >
                                            Female
                                        </Radio>
                                    </Stack>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Select Your Status</FormLabel>
                                    <Select value={status} onChange={setStatusValue} bg={"red.100"}>
                                        {options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Select Your Profile</FormLabel>
                                    <Input
                                       bg={"red.100"}
                                        type="file"
                                        name="user_profile"
                                        onChange={setProfile}
                                        placeholder="Select Your Profile"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Enter Your Location</FormLabel>
                                    <Input
                                       bg={"red.100"}
                                        type="text"
                                        name="location"
                                        value={inputData.location}
                                        onChange={setInputValue}
                                        placeholder="Enter Your Location"
                                    />
                                </FormControl>
                                <Button colorScheme="blue" type="submit" onClick={submitUserData}>
                                    Submit
                                </Button>
                            </Stack>
                        </form>
                    </Card>
                    <ToastContainer position="top-center" />
                </Box>
            )}
        </Box>
    );
};

export default Register;

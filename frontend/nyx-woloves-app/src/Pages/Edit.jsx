import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Radio,
    RadioGroup,
    Select,
    Spinner,
    Image,
    Card,
} from '@chakra-ui/react';
import { updateData } from '../Context/ContextProvide';
import { ToastContainer, toast } from 'react-toastify';
import { singleUsergetfunc, editfunc } from '../Services/Apis';
import { BASE_URL } from '../Services/helper';
import 'react-toastify/dist/ReactToastify.css';
const Edit = () => {
    const [inputdata, setInputData] = useState({
        fname: '',
        lname: '',
        email: '',
        mobile: '',
        gender: '',
        location: '',
    });

    const [status, setStatus] = useState('Active');
    const [imgdata, setImgdata] = useState('');
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState('');
    const [showSpin, setShowSpin] = useState(true);

    const { update, setUpdate } = useContext(updateData);
    const navigate = useNavigate();
    const { id } = useParams();

    // status options
    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'InActive', label: 'InActive' },
    ];

    // Set input value
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputdata, [name]: value });
    };

    // Set status value
    const setStatusValue = (e) => {
        setStatus(e.target.value);
    };

    // Set profile image
    const setProfile = (e) => {
        setImage(e.target.files[0]);
    };

    const userProfileGet = async () => {
        const response = await singleUsergetfunc(id);

        if (response.status === 200) {
            setInputData(response.data);
            setStatus(response.data.status);
            setImgdata(response.data.profile);
        } else {
            console.log('error');
        }
    };

    // Submit user data
    const submitUserData = async (e) => {
        e.preventDefault();

        const { fname, lname, email, mobile, gender, location } = inputdata;

        if (fname === '') {
            toast.error('First name is required!');
        } else if (lname === '') {
            toast.error('Last name is required!');
        } else if (email === '') {
            toast.error('Email is required!');
        } else if (!email.includes('@')) {
            toast.error('Enter a valid email!');
        } else if (mobile === '') {
            toast.error('Mobile is required!');
        } else if (mobile.length > 10) {
            toast.error('Enter a valid mobile number!');
        } else if (gender === '') {
            toast.error('Gender is required!');
        } else if (status === '') {
            toast.error('Status is required!');
        } else if (location === '') {
            toast.error('Location is required!');
        } else {
            const data = new FormData();
            data.append('fname', fname);
            data.append('lname', lname);
            data.append('email', email);
            data.append('mobile', mobile);
            data.append('gender', gender);
            data.append('status', status);
            data.append('user_profile', image || imgdata);
            data.append('location', location);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            try {
                const response = await editfunc(id, data, config);

                if (response.status === 200) {
                    setUpdate(response.data);
                    navigate('/');
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }
    };

    useEffect(() => {
        userProfileGet();
    }, [id]);

    useEffect(() => {
        if (image) {
            setImgdata('');
            setPreview(URL.createObjectURL(image));
        }
        setTimeout(() => {
            setShowSpin(false);
        }, 1200);
    }, [image]);

    return (
        <div>
            {showSpin ? (
                <Spinner />
            ) : (
                <Box className="container">
                    <Heading className="text-center mt-1" textAlign={"center"}>
                        Update Your Details
                    </Heading>
                    <Card bg={"gray.100"} p={"20px"}>
                        <Box className="profile_div text-center">
                            <Image src={image ? preview : `${BASE_URL}/uploads/${imgdata}`} alt="img" />
                        </Box>
                        <FormControl as="form" bg={"lightgreen"} padding={"20px"} borderRadius={"15px"}>
                            <Box>
                                <FormControl id="fname" mb={3}  isRequired>
                                    <FormLabel>First name</FormLabel>
                                    <Input
                                        bg={"red.100"}
                                        type="text"
                                        name="fname"
                                        value={inputdata.fname}
                                        onChange={setInputValue}
                                        placeholder="Enter First Name"
                                    />
                                </FormControl>
                                <FormControl id="lname" mb={3}  isRequired>
                                    <FormLabel>Last name</FormLabel>
                                    <Input
                                        bg={"red.100"}
                                        type="text"
                                        name="lname"
                                        value={inputdata.lname}
                                        onChange={setInputValue}
                                        placeholder="Enter Last Name"
                                    />
                                </FormControl>
                                <FormControl id="email" mb={3}  isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        bg={"red.100"}
                                        type="email"
                                        name="email"
                                        value={inputdata.email}
                                        onChange={setInputValue}
                                        placeholder="Enter Email"
                                    />
                                </FormControl>
                                <FormControl id="mobile" mb={3}  isRequired>
                                    <FormLabel>Mobile</FormLabel>
                                    <Input
                                        bg={"red.100"}
                                        type="text"
                                        name="mobile"
                                        value={inputdata.mobile}
                                        onChange={setInputValue}
                                        placeholder="Enter Mobile"
                                    />
                                </FormControl>
                                <FormControl id="gender" mb={3}  isRequired>
                                    <FormLabel>Select Your Gender</FormLabel>
                                    <RadioGroup name="gender" value={inputdata.gender} onChange={setInputValue} bg={"red.100"}>
                                        <Radio value="Male">Male</Radio>
                                        <Radio value="Female">Female</Radio>
                                    </RadioGroup>
                                </FormControl>
                                <FormControl id="status" mb={3}  isRequired>
                                    <FormLabel>Select Your Status</FormLabel>
                                    <Select defaultValue={status} onChange={(e) => setStatus(e.target.value)} bg={"red.100"}>
                                        {options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl id="user_profile" mb={3}>
                                    <FormLabel>Select Your Profile</FormLabel>
                                    <Input
                                        bg={"red.100"} type="file" name="user_profile" onChange={setProfile} placeholder="Select Your Profile" />
                                </FormControl>
                                <FormControl id="location" mb={3}  isRequired>
                                    <FormLabel>Enter Your Location</FormLabel>
                                    <Input
                                        bg={"red.100"}
                                        type="text"
                                        name="location"
                                        value={inputdata.location}
                                        onChange={setInputValue}
                                        placeholder="Enter Your Location"
                                    />
                                </FormControl>
                                <Button variant="primary" type="submit" onClick={submitUserData} bg={"red.300"}>
                                    Submit
                                </Button>
                            </Box>
                        </FormControl>
                    </Card>
                    <ToastContainer position="top-center" />
                </Box>
            )}
        </div>
    );
};

export default Edit;


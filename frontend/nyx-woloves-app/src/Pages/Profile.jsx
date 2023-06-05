import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text } from '@chakra-ui/react';
import { singleUsergetfunc } from '../Services/Apis';
import { BASE_URL } from '../Services/helper';
import moment from 'moment';
import Spiner from '../Component/Spiner';

const Profile = () => {
    const [userProfile, setUserProfile] = useState({});
    const [showSpin, setShowSpin] = useState(true);

    const { id } = useParams();

    const userProfileGet = async () => {
        const response = await singleUsergetfunc(id);

        if (response.status === 200) {
            setUserProfile(response.data);
        } else {
            console.log('error');
        }
    };

    useEffect(() => {
        userProfileGet();
        setTimeout(() => {
            setShowSpin(false);
        }, 1200);
    }, [id]);

    return (
        <div>
            {showSpin ? (
                <Spiner />
            ) : (
                <Box className="container">
                    <Box className="card-profile shadow col-lg-6 mx-auto mt-5">
                        <Box py={4} textAlign="center">
                            <Image src={`${BASE_URL}/uploads/${userProfile.profile}`} alt="Profile Image" borderRadius="full" boxSize="150px" mx="auto" />
                        </Box>
                        <Box textAlign="center">
                            <Text as="h3" fontSize="xl" fontWeight="bold">
                                {userProfile.fname} {userProfile.lname}
                            </Text>
                            <Text as="h4" fontSize="lg">
                                <i className="fas fa-envelope email" />: <span>{userProfile.email}</span>
                            </Text>
                            <Text as="h5" fontSize="lg">
                                <i className="fas fa-mobile" />: <span>{userProfile.mobile}</span>
                            </Text>
                            <Text as="h4" fontSize="lg">
                                <i className="fas fa-person" />: <span>{userProfile.gender}</span>
                            </Text>
                            <Text as="h4" fontSize="lg">
                                <i className="fas fa-location-pin location" />: <span>{userProfile.location}</span>
                            </Text>
                            <Text as="h4" fontSize="lg">
                                Status: <span>{userProfile.status}</span>
                            </Text>
                            <Text as="h5" fontSize="lg">
                                <i className="fas fa-calendar-days calendar" /> Date Created: <span>{moment(userProfile.datecreated).format('DD-MM-YYYY')}</span>
                            </Text>
                            <Text as="h5" fontSize="lg">
                                <i className="fas fa-calendar-days calendar" /> Date Updated: <span>{userProfile.dateUpdated}</span>
                            </Text>
                        </Box>
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default Profile;

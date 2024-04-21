import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import "./OtherProfile.css";
import Sidebar from "../Sidebar/Sidebar";
import Widgets from "../Home/Widgets/Widgets";
import NavOtherProfile from "./NavOtherProfile/NavOtherProfile";
import PersonalProfilePost from "../PersonalProfile/PersonalProfilePost/PersonalProfilePost"
import getTokenConfig from '../../Utils/TokenUtils';

const OtherProfile = () => {
    const [userData, setUserData] = useState(null);
    const [countries, setCountries] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const config = getTokenConfig();
        	    if (!config) return;
                const response = await axios.get(`http://localhost:3003/api/users/${userId}`,config);
                setUserData(response.data);          
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchUserProfile();

        const fetchCountries = async () => {
            try {
                const config = getTokenConfig();
        	    if (!config) return;
                const response = await axios.get(`http://localhost:3003/api/users/${userId}/countries`, config);
                setCountries(response.data.data);
            } catch (error) {
                console.error("Error fetching countries data:", error);
            }
        };
        fetchCountries();

    }, [userId]);

    return (
        <div className="PersonalProfile">
            {/**Sidebar */}
            <Sidebar />

            <div className="PersonalProfile__container">
                <NavOtherProfile 
                {...userData} />
                <div className="PersonalProfile__country__container">
                    {countries.map(country => (
                        <PersonalProfilePost key={country._id} country={country} />
                    ))}
                </div>
            </div>

            {/**Widgets */}
            <Widgets />
        </div>
    );
};

export default OtherProfile;
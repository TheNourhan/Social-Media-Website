import React, { useState, useEffect } from "react";
import "./PersonalProfile.css";
import Sidebar from "../Sidebar/Sidebar";
import Widgets from "../Home/Widgets/Widgets";
import NavPersonalProfile from "./NavPersonalProfile/NavPersonalProfile";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PersonalProfilePost from "./PersonalProfilePost/PersonalProfilePost"
import axios from "axios";
import getTokenConfig from '../../Utils/TokenUtils';

const PersonalProfile = () => {
    const [userData, setUserData] = useState(null);
    const [countries, setCountries] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._Id;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const config = getTokenConfig();
        	    if (!config) return;
                const response = await axios.get(`http://localhost:3003/api/users/${userId}`, config);
                console.log("User profile data:", response.data);
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
                <NavPersonalProfile
                {...userData} />
                <div className="PersonalProfile__btn_addcountry__container">
                    <div className='btn_addcountry-content'>
                        <AddLocationAltIcon />
						<span>Add country</span>
					</div>
                </div>

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

export default PersonalProfile;
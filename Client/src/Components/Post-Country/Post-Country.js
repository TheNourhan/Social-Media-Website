import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "../Home/Home.css";
import "../Home//Feed/Feed.css";
import Sidebar from "../Sidebar/Sidebar";
import Widgets from "../Home/Widgets/Widgets";
import CountryPost from "../Home/Feed/CountryPost/CountryPost";
import getTokenConfig from '../../Utils/TokenUtils';
import axios from "axios";

const PostCountry = () => {
    const [postsData, setPostData] = useState([]);
    const { userId, countryId } = useParams();
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const config = getTokenConfig();
        	    if (!config) return;
                const response = await axios.get(`http://localhost:3003/api/users/${userId}/countries/${countryId}/posts`, config);
                setPostData(response.data.data);
                        
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPost();

    }, [userId, countryId]);

    return (
    <div className="home">
        {/**Sidebar */}
        <Sidebar />

        {/**Feed */}
        <div className="feed">
            <div className="CountryPost__container">
            
            {Array.isArray(postsData) && postsData.map((post, index) => (
                <CountryPost key={index} postData={post} />
            ))}
            </div>
        </div>

        {/**Widgets */}
        <Widgets />
    </div>
    );
};

export default PostCountry;

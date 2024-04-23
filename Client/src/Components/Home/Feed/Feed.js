import React, { useState, useEffect} from "react";
import "./Feed.css"
import TweetBox from "./TweetBox/TweetBox";
//import Post from "./Post/Post";
import axios from "axios";
import CountryPost from "./CountryPost/CountryPost";
import getTokenConfig from '../../../Utils/TokenUtils';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const currentUserId = currentUser ? currentUser._id : null;

    useEffect(() => {
        const fetchTimelinePosts = async () => {
            try {
                const config = getTokenConfig();
                if (!config) return;
                const response = await axios.get(`http://localhost:3003/api/users/${currentUserId}/timeline`, config);
                setPosts(response.data.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchTimelinePosts();
    }, [currentUserId]);

    return (
    <div className="feed">
        <header className="feed__header">
            <h2>Home</h2>
        </header>
        <TweetBox />
        <div className="CountryPost__container">
            {Array.isArray(posts) && posts.map((post, index) => (
                <CountryPost key={index} postData={post} />
            ))}
        </div>
        
        <div className="CountryPost__container">

        </div>
    </div>
    );
};

export default Feed;
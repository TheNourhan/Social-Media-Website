import { Avatar, Button } from "@mui/material";
import React, { useState} from 'react';
import "./TweetBox.css";
import axios from "axios";
import CountrySelector from '../../../Uploader/CountrySelector';
import getTokenConfigUploadImage from '../../../../Utils/TokenUtils-Upload-Image';

import {
    ImageOutlined,
} from "@mui/icons-material";

const TweetBox = () => {
    const [post, setPost] = useState('');
    const [title, setTitle] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [photo, setPhoto] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id;

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };
    const handlePostChange = (e) => {
        setPost(e.target.value);
    };
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    
    const sendPosts = async (e) => {
        e.preventDefault();

        if (!title.trim() || !post.trim() || !selectedCountry) {
            window.alert('Please fill in all fields before posting.');
            return;
        }

        try {
            const config = getTokenConfigUploadImage();
            if (!config) return;

            const formData = new FormData();
            formData.append('postPhoto', photo);
            formData.append('title', title);
            formData.append('post', post);
            formData.append('country', selectedCountry.label);

            const response = await axios.post(`http://localhost:3003/api/users/${userId}/posts`, formData, config);
            setPost(response.data.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    return (
        <div className="tweetbox">
            <form onSubmit={sendPosts} encType="multipart/form-data" className="tweetbox__form">
                <Avatar src={'/uploads/' + user.avatar} className="tweetbox__avatar" />
                <div className="tweetbox__form-field">
                    <div className="tweetbox__input tweetbox__input-title">
                        <input 
                            onChange={handleTitleChange}
                            className="tweetbox__input-input"
                            type="text"
                            name="title"
                            placeholder="What is your post title?"
                        />
                    </div>
                    <div className="tweetbox__input">
                        <input 
                            className="tweetbox__input-input tweetbox__input-post"
                            type="text"
                            name="post"
                            onChange={handlePostChange}
                            placeholder="Where did you go?"
                        />
                    </div>
                    <div className="tweetbox__input">
                        <div className="tweetbox__icons">
                            <input 
                                onChange={handlePhotoChange}
                                type='file' 
                                id="file" 
                                name="postPhoto"
                                accept="image/*" 
                                hidden
                            />
                            <label htmlFor="file">
                                <ImageOutlined className="tweetbox__icon" />
                            </label>
                            <div className="tweetbox__select-content">
                                <CountrySelector 
                                    onSelectCountry={setSelectedCountry}
                                />
                            </div>
                        </div>
                        <Button type="submit" className="tweetbox__btn">Post</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TweetBox;

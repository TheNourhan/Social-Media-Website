import { Avatar } from "@mui/material";
import { useParams } from 'react-router-dom';
import React from "react";
import "./CountryPost.css";
import axios from "axios";
import CustomMenu from '../../../OptionMenu/OptionMenu';
import getTokenConfig from '../../../../Utils/TokenUtils';

import { Favorite, FavoriteBorderOutlined, LocationOnOutlined} from "@mui/icons-material";

const CountryPost = ( {postData} ) => {
    const { userId, countryId } = useParams();
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const currentUserId = currentUser ? currentUser._id : null;

    if (!postData) {
        console.error("postData is undefined");
        return null;
    }
    const { postId, handle, username, avatar, country, title, content, likes, postPhoto } = postData;
    const isCurrentUserLiked = likes.includes(currentUserId);
    
    async function handleFavoriteClick() {
        try {
            const config = getTokenConfig();
            if (!config) return;
            await axios.post(`http://localhost:3000/api/users/${userId}/countries/${countryId}/posts/${postId}`, { current_user: currentUserId }, config);
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    }
    async function handleDeletePost() {
        try {
            const config = getTokenConfig();
            if (!config) return;
            await axios.delete(`http://localhost:3000/api/users/${userId}/countries/${countryId}/posts/${postId}`, config);    
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    return (
    <div className="post">
        <Avatar 
            src={'/uploads/' + avatar}
            className="post__avatar" />
        <div className="post__content">
            <div className="post__header">
                <div className="post__names">
                    <h3>{username}</h3>
                    <h4>@{handle}</h4>
                </div>
                <div className="fav__item">
                    <span className="fav__num">{postData.likes.length}</span> 

                    <div className="icon" onClick={handleFavoriteClick}>
                        {/*<FavoriteBorderOutlined className="fav_icon"  fontSize="small" />*/}
                        {isCurrentUserLiked ? (
                                <Favorite className="fav_icon red" fontSize="small" />
                            ) : (
                                <FavoriteBorderOutlined className="fav_icon" fontSize="small" />
                        )}
                    </div>
                </div>
                
                {currentUserId === userId && (
                        <CustomMenu
                            items={[
                                { label: "Delete item", onClick: handleDeletePost },
                            ]}
                        >
                        </CustomMenu>
                )}

            </div>

            <div className="post__country__title">
                <div className="post__country">
                    <LocationOnOutlined className="post__country__icon" />
                    <div><span>{country}</span></div>
                </div>
                <div className="post__title">
                    <span>{title}</span>
                </div>
            </div>
            <div className="post__description">
                {content}
            </div>
            <div className="post__media">
                <img src={'/uploads/' + postPhoto} alt="" />
            </div>
            
        </div>
    </div>
    );
};

export default CountryPost;
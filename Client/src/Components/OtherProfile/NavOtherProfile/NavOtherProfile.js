import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import PhotoUser from "../../../Public/PhotoUser/PhotoUser";
import "./NavOtherProfile.css";
import getTokenConfig from '../../../Utils/TokenUtils';

const user = {
    user_photo:
        "https://images.squarespace-cdn.com/content/v1/5b7e14608ab722146afce766/1677349200894-YXLTF5YTGTG82XXFJ2ID/Kayla+Witt+headshot+%281%29.png?format=1000w",
    image_background:
        "https://www.xtrafondos.com/wallpapers/vertical/noche-en-las-montanas-con-planetas-de-fondo-7980.jpg",
};

const NavOtherProfile = (userData) => {
	const [followed, setFollowed] = useState(false);
    const { userId } = useParams();
	const currunt_user = JSON.parse(localStorage.getItem("user"));
    const currunt_userId = currunt_user._id;

	useEffect(() => {
		const isFollowing = currunt_user?.following?.includes(userId) || false;
		setFollowed(isFollowing);
    }, [currunt_user, userId]);

	const handleFollow = async () => {
        try {
			const config = getTokenConfig();
        	if (!config) return;
			
            await axios.post(`/api/users/${userId}/follow`, { followerId: currunt_userId, followeeId: userId }, config );
            
			currunt_user.following.push(userId);
			localStorage.setItem("user", JSON.stringify(currunt_user));
        } catch (error) {
            console.error('Error following user:', error);
        }
    };
	const handleUnFollow = async () => {
        try {
			const config = getTokenConfig();
        	if (!config) return;
			const requestBody = {
				followerId: currunt_userId,
				followeeId: userId
			};
			
            await axios.delete(`/api/users/${userId}/unfollow`, { data: requestBody, ...config } );
			const index = currunt_user.following.indexOf(userId);
			if (index !== -1) {
				currunt_user.following.splice(index, 1);
				localStorage.setItem("user", JSON.stringify(currunt_user));
			}
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    return (
        <div className="container__navProfile">
			<section className="main__navProfile">
				<div className="main__navProfile-bgImage">
					<img src={user.image_background} alt="background img" width="600" />
				</div>
				<div className='main__navProfile-imgUser'>
					<div className='photo__profile'>
						<PhotoUser url={user.user_photo} size='133' />
					</div>
				</div>
				<div className='btn__editProfile-container'>
                    <div className='main__dataProfile-User'>
						<h2>{userData?.data?.name}</h2>
						<span>@{userData?.data?.handle}</span>
					</div>
					<div className='btn_editProfile-content'>
						{
							followed 
							? (
								<span className="btn btn-primary" onClick={handleUnFollow}>
									Unfollow
								</span>
							)
							: (
								<span className="btn btn-primary" onClick={handleFollow}>
									Follow
								</span>
							)
						}
					</div>
				</div>
				<div className="main__dataProfile">
					<div className='main__dataProfile-description'>
						<div>
							{userData?.data?.bio}
						</div>
					</div>
					<div className='main__followBtns'>
						<div>
							<span className='followBtn__number'>{userData?.data?.following}</span>
							<span className='followBtn__text'>Following</span>
						</div>
						<div>
							<span className='followBtn__number'>{userData?.data?.followers}</span>
							<span className='followBtn__text'>Followers</span>
						</div>
					</div>
				</div>
			</section>
        </div>
    );
};

export default NavOtherProfile;
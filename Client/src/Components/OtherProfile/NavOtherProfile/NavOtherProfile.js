import React from "react";
import { useParams } from 'react-router-dom';
import PhotoUser from "../../../Public/PhotoUser/PhotoUser";
import "./NavOtherProfile.css";
import { useNavigate } from "react-router-dom";
import useFollow from '../../../Utils/UserActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import getTokenConfig from '../../../Utils/TokenUtils';

const NavOtherProfile = (userData) => {
	console.log('user data other', userData)
	const { userId } = useParams();
  	const { followed, handleFollow, handleUnfollow } = useFollow(userId);
	const navigate = useNavigate(); 
	const user = JSON.parse(localStorage.getItem("user"));
	const currentUserId = user._id;

	const handleFollowingClick = () => {
        navigate(`/profile/${userId}/following`);
    };

	const handelMailClick = async() => {
		navigate(`/messenger/`);
		try{
			const config = getTokenConfig();
            if (!config) return;
			await axios.post(`http://localhost:3003/api/conversations/`, { senderId: currentUserId, receiverId: userId }, config);
		}catch(error){
			console.log('error', error);
		}
	}

    return (
        <div className="container__navProfile">
			<section className="main__navProfile">
				<div className="main__navProfile-bgImage">
					<img src={'/uploads/' + userData?.data?.header} alt="background img" width="600" />
				</div>
				<div className='main__navProfile-imgUser'>
					<div className='photo__profile'>
						<PhotoUser url={'/uploads/' + userData?.data?.avatar} size='133' />
					</div>
				</div>
				<div className='btn__editProfile-container'>
                    <div className='main__dataProfile-User'>
						<h2>{userData?.data?.name}</h2>
						<span>@{userData?.data?.handle}</span>
					</div>
					<FontAwesomeIcon onClick={handelMailClick} className="mail__icon" icon={faEnvelope} />
					<div className='btn_editProfile-content'>
						{
							followed 
							? (
								<span className="btn btn-primary" onClick={handleUnfollow}>
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
						<div onClick={handleFollowingClick}>
							<span className='followBtn__number'>{userData?.data?.following}</span>
							<span className='followBtn__text'>Following</span>
						</div>
						<div onClick={handleFollowingClick}>
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
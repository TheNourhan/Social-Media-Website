import React from "react";
import "./PeopleBox.css";
import useFollow from '../../Utils/UserActions';
import { useNavigate } from "react-router-dom";

const PeopleBox = ({ user }) => {
    const userId = user?.id || user?._id;
    const name = user?.name || user?.firstName + ' ' +  user?.lastName;
    const handle = user?.handle || user?.username;
    const avatar = user?.avatar;
    //const bio = user?.bio;

	const { followed, handleFollow, handleUnfollow } = useFollow(userId);
    const navigate = useNavigate(); 
    const moveToProfile = () => {
        navigate(`/profile/${userId}`);
    }

    return (
        <div className="suggestFriend">
            <div className="suggestImgContainer">
                <img className="suggestImg" src={'/uploads/' + avatar} alt="" />
            </div>
            <div className="name" onClick={moveToProfile}>
                <span className="suggestName">{name} <br />
                    <span className="handel">@{handle}</span> <br />
                </span>
               {/**  <span className="bio">{bio} </span> */}

            </div>
            {
				followed 
				? (
					<button className="btn btn-primary" onClick={handleUnfollow}>
						Unfollow
					</button>
				    ) : (
					<button className="btn btn-primary" onClick={handleFollow}>
						Follow
					</button>
				)
			}
        </div>
    );
};

export default PeopleBox;

import React from "react";
import "./PeopleBox.css";
import useFollow from '../../Utils/UserActions';

const PeopleBox = ({ user }) => {
    const userId = user?.id;
    const name = user?.name;
    const handle = user?.handle;
    const avater = user?.avater;
    //const bio = user?.bio;

	const { followed, handleFollow, handleUnfollow } = useFollow(userId);

    return (
        <div className="suggestFriend">
            <div className="suggestImgContainer">
                <img className="suggestImg" src={avater} alt="" />
            </div>
            <div className="name">
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

import axios from "axios";
import React from "react";
import "./PersonalProfilePost.css";
import { useNavigate } from "react-router-dom";
import getTokenConfig from '../../../Utils/TokenUtils';
import CustomMenu from '../../OptionMenu/OptionMenu';

const PersonalProfilePost = (country) => {
    console.log("country",country?.country?.countryPhoto)
    const userId = country?.country?.postedBy;
    const countryId = country?.country?._id;
    const countryName = country?.country?.country;
    const countryPhoto = country?.country?.countryPhoto;
    const navigate = useNavigate();  

    const handlePostClick = async() => {
        navigate(`/profile/${userId}/country/${countryId}`);
    };

    const handleDeleteItem = async () => {
        try{
            const config = getTokenConfig();
            if (!config) return;
            await axios.delete(`http://localhost:3003/api/users/${userId}/countries/${countryId}`, config);
        }catch(error){
            console.error("Error:", error);
        }
    };

    const handleUpdateItme = () => {
        navigate(`/edit/country/${countryId}`);
    };

    return (
        <div className="PersonalProfilePost">
            <div className="post__content">
                <div className="post__header">
                    <div className="post__titles">
                        <h3>{countryName}</h3>
                    </div>
                    
                    <CustomMenu 
                        items={[
                            { label: "Delete item", onClick: handleDeleteItem },
                            { label: "Update item", onClick: handleUpdateItme },
                        ]}
                    >
                    </CustomMenu>   
                </div>
                <div className="post__media" onClick={handlePostClick}>
                    <img src={'/uploads/' + countryPhoto} alt="" />
                    {/*<img src='country?.country?.photo' alt="" />*/}
                </div>

            </div>
        </div>
    );
};

export default PersonalProfilePost;

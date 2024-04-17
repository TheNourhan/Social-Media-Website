import React, { useState } from "react";
import "./PersonalProfilePost.css";
import { useNavigate } from "react-router-dom";
import { MoreHoriz } from "@mui/icons-material";
import { Menu, MenuItem, Paper } from "@mui/material";

const PersonalProfilePost = (country) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const userId = country?.country?.postedBy;
    const countryId = country?.country?._id;
    const countryName = country?.country?.country;
    const navigate = useNavigate();  

    const handlePostClick = () => {
        navigate(`/profile/${userId}/country/${countryId}`);
    };

    const handleClickMore = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <div className="PersonalProfilePost">
            <div className="post__content">
                <div className="post__header">
                    <div className="post__titles" onClick={handleClickMore}>
                        <h3>{countryName}</h3>
                    </div>
                    <MoreHoriz className="post__options" onClick={handleClickMore} />
                   
                    <Menu 
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                        anchorOrigin={{
                            vertical: "top", 
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        PaperProps={{ 
                            style: {
                                maxHeight: 200,
                                width: 200,
                                marginTop: 14,
                                marginBottom: 1,
                                borderRadius: 10,
                                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                                backgroundColor:  "#ccc" 
                            }
                        }}
                    >
                        <MenuItem onClick={handleCloseMenu}>Delete item</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Update item</MenuItem>
                    </Menu>
                </div>
                <div className="post__media" onClick={handlePostClick}>
                    <img src="https://media.istockphoto.com/id/1436430810/photo/paris-eiffel-tower.webp?b=1&s=170667a&w=0&k=20&c=Qm33k45p4AGKtbNcqkx5hhfP7IRo8RYIpW_VdgE2bDU=" alt="" />
                    {/*<img src='country?.country?.photo' alt="" />*/}
                </div>

            </div>
        </div>
    );
};

export default PersonalProfilePost;

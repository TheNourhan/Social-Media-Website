import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";

import {MoreHoriz} from "@mui/icons-material";

const CustomMenu = ({ items }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickMore = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

  return (
    <>
        <MoreHoriz className="post__options" onClick={handleClickMore}/>
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
                backgroundColor: "#ccc"
                }
            }}
        >

            {items.map((item, index) => (
                <MenuItem key={index} onClick={item.onClick}>
                {item.label}
                </MenuItem>
            ))}
            
        </Menu>
    </>
  );
};

export default CustomMenu;

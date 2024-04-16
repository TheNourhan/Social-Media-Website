import Widgets from "../Home/Widgets/Widgets";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./EditProfile.css"
import NavEditProfile from "./NavEditProfile/NavEditProfile";
import EditProfileForm from "./EditProfileForm/EditProfileForm";

const EditProfile = () => {
	return (
        <div className="editprofile">
            <Sidebar />
            <div className="editprofile__container">
                <NavEditProfile />
                <div className="editprofile__form">
                    <EditProfileForm />
                </div>
            </div>
            <Widgets />
        </div>
	);
};

export default EditProfile;
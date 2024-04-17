import React from "react";
import "./EditProfileForm.css";

const EditProfileForm = () => {
    return (
        <div className="container__EditProfileForm">
			<form>
                <div className="form-group">
                    <div className='uplouder__label-content'>
                        <div className='uploader__label'>
                            <span>Cover Photo</span>
                        </div>
                    </div>
                    <input
                    className="primary__button input_form form-group"
                    placeholder=" Cover photo"
                    type="file"
                    id="cover-photo-input"
                    accept="image/*"
                    />
                </div>
                <div className="form-group">
                    <div className='uplouder__label-content'>
                        <div className='uploader__label'>
                            <span>Profile Photo</span>
                        </div>
                    </div>
                    <input 
                    className="primary__button input_form form-group" 
                    placeholder=" Profile photo" 
                    type="file" 
                    accept="image/*" 
                    id="PhotoUser-input-file" 
                    />
                </div>
                <div className="form-group">
                    <input 
                    className="primary__button input_form form-group"
                    type="text"
                    name="firstName"
                    placeholder=" First Name"
                    />
                </div>
                <div className="form-group">
                    <input 
                    className="primary__button input_form form-group"
                    type="text"
                    name="lastName"
                    placeholder=" Last Name"
                    />
                </div>
                <div className="form-group">
                    <textarea 
                    className="primary__button input_form form-group"
                    type="text"
                    name="Bio"
                    placeholder=" Bio"
                    />
                </div>
                <div className='btn_editProfile-content-form'>
                    <span>save</span>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;
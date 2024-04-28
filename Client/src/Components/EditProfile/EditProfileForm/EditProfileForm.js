import React, { useState, useEffect } from 'react';
import "./EditProfileForm.css";
import axios from 'axios';
import getTokenConfig from '../../../Utils/TokenUtils';
import getTokenConfigUploadImage from '../../../Utils/TokenUtils-Upload-Image';
import host from '../../../Utils/HostURL';

const EditProfileForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [header, setHeader] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;

    useEffect (() => {
        const fetchData = async () => {
            try {
                const config = getTokenConfig();
                if (!config) return;
                const response = await axios.get(`${host.URL}/api/users/${userId}/edit`, config);
                setFirstName(response.data.data.firstName)
                setLastName(response.data.data.lastName)
                setBio(response.data.data.bio)
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };    
          fetchData();
    }, [userId]); 

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]);
    };
    const handleHeaderChange = (e) => {
        setHeader(e.target.files[0]);
    };
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const config = getTokenConfigUploadImage();
            if (!config) return;

            const formData = new FormData();
            formData.append('avatar', avatar);
            formData.append('header', header);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('bio', bio);

            await axios.put(`http://localhost:3003/api/users/${userId}/edit`, formData, config);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
        <div className="container__EditProfileForm">
			<form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <div className='uplouder__label-content'>
                        <div className='uploader__label'>
                            <span>Avatar Photo</span>
                        </div>
                    </div>
                    <input
                        onChange={handleAvatarChange}
                        className="primary__button input_form form-group"
                        placeholder=" Cover photo"
                        type="file"
                        name="avatar"
                        id="cover-photo-input"
                        accept="image/*"
                    />
                </div>
    
                <div className="form-group">
                    <div className='uplouder__label-content'>
                        <div className='uploader__label'>
                            <span>Header Photo</span>
                        </div>
                    </div>
                    <input 
                    onChange={handleHeaderChange}
                    className="primary__button input_form form-group" 
                    placeholder=" Profile photo" 
                    type="file" 
                    name="header"
                    accept="image/*" 
                    id="PhotoUser-input-file" 
                    />
                </div>

                <div className="form-group">
                    <input 
                    onChange={handleFirstNameChange}
                    value={firstName}
                    className="primary__button input_form form-group"
                    type="text"
                    name="firstName"
                    placeholder= "  First Name"
                    />
                </div>
                <div className="form-group">
                    <input 
                    onChange={handleLastNameChange}
                    value={lastName}
                    className="primary__button input_form form-group"
                    type="text"
                    name="lastName"
                    placeholder=" Last Name"
                    />
                </div>
                <div className="form-group">
                    <textarea 
                    onChange={handleBioChange}
                    value={bio}
                    className="primary__button input_form form-group"
                    type="text"
                    name="Bio"
                    placeholder=" Bio"
                    />
                </div>
                <div>
                    <button className='btn_editProfile-content-form' type="submit">save</button>
                </div>
            </form>
        </div>
        
        </>
    );
};

export default EditProfileForm;
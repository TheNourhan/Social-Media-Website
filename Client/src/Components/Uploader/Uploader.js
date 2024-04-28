import React, { useState } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import './Uploader.css';
import Sidebar from "../Sidebar/Sidebar";
import Widgets from "../Home/Widgets/Widgets";
import { ImCancelCircle } from "react-icons/im";
import { LuUploadCloud } from "react-icons/lu";
import CountrySelector from './CountrySelector';
import getTokenConfigUploadImage from '../../Utils/TokenUtils-Upload-Image';
import host from '../../Utils/HostURL';

function Uploader() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    const { countryId } = useParams();
    const navigate = useNavigate();

    const handleUploadClick = () => {
        if (!selectedCountry) {
            alert('Please select a country.');
            return;
        }
        if(countryId){
            handleEditCountry();
        }else{
            handleAddCountry();
        } 
    };
    const handleCancelClick = () => {
        navigate('/profile');
    };

    const handleFileChange = (event) => {
        setSelectedPhoto(event.target.files[0]);
    };

    const handleEditCountry = async () => {
        try {
            const config = getTokenConfigUploadImage();
            if (!config) return;
            const formData = new FormData();
            formData.append("country", selectedCountry.label);
            formData.append("countryPhoto", selectedPhoto);

            await axios.patch(`${host.URL}/api/users/${userId}/countries/${countryId}`, formData, config);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleAddCountry = async () => {
        try {
            const config = getTokenConfigUploadImage();
            if (!config) return;
            const formData = new FormData();
            formData.append("country", selectedCountry.label);
            formData.append("countryPhoto", selectedPhoto);

            await axios.post(`${host.URL}/api/users/${userId}/countries`, formData, config);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className='uploader'>
            <Sidebar />
            <div className='uploader__container'>
                <div className='uploader__label-list'>
                    <div className='uplouder__label-content'>
                        <div className='uploader__label'>
                            <span>Country name:</span>
                        </div>
                        <div className='uploader__label'>
                            <span>uploade photo:</span>
                        </div>
                    </div>
                    <div className='uploader__select'>
                        <CountrySelector onSelectCountry={setSelectedCountry}/>
                    </div>
                </div>
                <div className='uploader__zone-content'>
                    <div className='uploader__zone'>
                        <form className='uploader__form'>      
                            <LuUploadCloud size={90} />
                            <p>
                                <input 
                                    onChange={handleFileChange}
                                    type="file" 
                                    accept='image/*' 
                                    className='input-field' 
                                    name='countryPhoto'
                                />
                            </p>
                        </form>
                    </div>
                </div>
                <div>
                    <div className='uplouder__Btn-content'>
                        <div onClick={handleUploadClick} className='uploader__Btn'>
                            <LuUploadCloud />
                            <span>Upload</span>
                        </div>
                        <div onClick={handleCancelClick} className='uploader__Btn'>
                            <ImCancelCircle />
                            <span>Cancel</span>
                        </div>
                    </div>
                </div>
            </div>
            <Widgets />
        </div>
    )
}

export default Uploader;
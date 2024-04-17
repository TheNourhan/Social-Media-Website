import React from 'react'
import './Uploader.css'
import Sidebar from "../Sidebar/Sidebar";
import Widgets from "../Home/Widgets/Widgets";
import { ImCancelCircle } from "react-icons/im";
import { LuUploadCloud } from "react-icons/lu";
import CountrySelector from './CountrySelector';

function Uploader() {
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
                        <select className='uploader__select-content'>
                            <option className='uploader__select-option'></option>
                            <option className='uploader__select-option'>Germany</option>
                            <option className='uploader__select-option'>USA</option>
                            <option className='uploader__select-option'>UK</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                </div>
                <div className='uploader__zone-content'>
                    <div className='uploader__zone'>
                        <form className='uploader__form'>
                            <input type="file" accept='image/*' className='input-field' hidden />          
                            <LuUploadCloud size={90} />
                            <p>Browse Files to upload</p>
                        </form>
                    </div>
                </div>
                <div>
                    <div className='uplouder__Btn-content'>
                        <div className='uploader__Btn'>
                            <LuUploadCloud />
                            <span>Upload</span>
                        </div>
                        <div className='uploader__Btn'>
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

export default Uploader
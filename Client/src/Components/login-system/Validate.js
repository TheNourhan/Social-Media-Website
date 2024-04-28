import React, {useState} from 'react';
import Footer from './footer';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Homepage.css";

const Validate = () => {
  const navigate = useNavigate();
  const [validationCode, setValidationCode] = useState('');
  
  const handleSubmitClick = async(e) =>{
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:3003/verify", {verificationCode: validationCode});

      if (response.data.status === 'Verification successful') {
        navigate('/');
      }
    }catch (error){
      alert(error.request.responseText + '\nTry again');
      console.log(error);
    }
  }
  const handleInputChange = (e) => {
    setValidationCode(e.target.value);
  }
    return (
      <div className="homepage">
        <div className="homepage__top">
          <div className="homepage__topLeft">
            <img
              className="homepage__topLeft-img"
              src="./images/side.jpg"
              alt=""
            />
          </div>
          <div className="homepage__topRight">
            <h1 className="homepage__topRight__Titel">Travel Now</h1>
            <h2 className="homepage__topRight__Subtitel valid-titel">
                Please enter the confirmation code that was sent to your email.
            </h2>

            <div className="homepage__topRight__Buttons">
              <form method="POST" onSubmit={handleSubmitClick}>
                <br></br>
                <div className="form-group">
                  <input 
                    className="primary__button input_form"
                    type="text"
                    name="validateCode"
                    value={validationCode}
                    onChange={handleInputChange}
                    placeholder="T-XXX-XXX"
                    required
                  />
                </div>
                <br></br>
                <div className="form-group">
                  <button type="submit" className="secondary__button">Send</button>
                </div>
              </form>
            </div>

          </div>
        </div>
        <Footer></Footer>
      </div>
    );    
};

export default Validate;
import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from './footer';
import host from '../../Utils/HostURL';

import "./Homepage.css";

const Homepage = () => {
    /*const [formData, setFormData] = useState({
      logUsername: '',
      logPassword: ''
    });
    */
    const [logUsername, setEmail] = useState('');
    const [logPassword, setPassword] = useState('');
    const navigate = useNavigate();  

    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const response = await axios.post(`${host.URL}/login`, {
          logUsername: logUsername,
          logPassword: logPassword
        });
        if (response.data.status === 'Login successful') {
          localStorage.setItem("token", response.data.data.access_token);
          localStorage.setItem("user", JSON.stringify(response.data.data.user));

          navigate('/home', { state: { id: logUsername } });
        } else if (response.data === 'error') {
          alert("User has not signed up");
        }
      } catch (error) {
        alert("Wrong details");
        console.error(error);
      }
    }
    const handleSignUpClick = () => {
      navigate('/register');
    };
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
            <h2 className="homepage__topRight__Subtitel">
              Join Trekkers today.
            </h2>

            <div className="homepage__topRight__Buttons">
              <form method="POST" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    className="primary__button input_form"
                    type="text"
                    name="logUsername"
                    value={logUsername}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder=" username or email"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="primary__button input_form"
                    type="password"
                    name="logPassword"
                    value={logPassword}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    placeholder=" password"
                    required
                  />
                </div>
                <br></br>
                <div className="form-group">
                  <button type="submit" className="secondary__button">Sign in with username or email</button>
                </div>
              </form>
            </div>

            <div className="homepage__topRight__Buttons">
              <h3>Don't have an account?</h3>
              <button onClick={handleSignUpClick} className="primary__button">Sign up now</button>
            </div>

          </div>
        </div>
        <Footer></Footer>
      </div>
    );    
};

export default Homepage;




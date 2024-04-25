import React, { useState} from 'react';
import Footer from './footer';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Homepage.css";

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const navigate = useNavigate();  

    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3003/register", {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          password: password
        });
        if (response.data === 'Register successful') {
          navigate('/login');
        } else if (response.data === 'email already in use') {
          alert(response.data);
        }else if( response.data === 'Username already in use'){
            alert(response.data);
        }
      } catch (error) {
        alert("Wrong details");
        console.error(error);
      }
    }
    const handleSignInClick = () => {
        navigate('/');
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
                    name="firstName"
                    value={firstName}
                    onChange={(e)=>{setFirstName(e.target.value)}}
                    placeholder=" First Name"
                    required
                    />
                </div>
                <div className="form-group">
                    <input 
                    className="primary__button input_form"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e)=>{setLastName(e.target.value)}}
                    placeholder=" Last Name"
                    required
                    />
                </div>
                <div className="form-group">
                    <input 
                    className="primary__button input_form"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                    placeholder=" Username"
                    required
                    />
                </div>
                <div className="form-group">
                    <input 
                    className="primary__button input_form"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder=" Email"
                    required
                    />
                </div>
                <div className="form-group">
                    <input 
                    className="primary__button input_form"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    placeholder=" Password"
                    required
                    />
                </div>
                <div className="form-group">
                    <input 
                    className="primary__button input_form"
                    type="password"
                    name="repeatPassword"
                    value={repeatPassword}
                    onChange={(e)=>{setRepeatPassword(e.target.value)}}
                    placeholder=" Repeat Password"
                    required
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="secondary__button">Sign Up</button>
                </div>
            </form>


              <p className="homepage__topRight__policies">
                By signing up, you agree to the{" "}
                <a href="/">Terms of Services</a> and{" "}
                <a href="/">Privacy Policy</a>. including <a href="/">Cookie Use.</a>
              </p>
              
            </div>
            <div className="homepage__topRight__Buttons">
              <h3>Do you have an account?</h3>
              <button onClick={handleSignInClick} className="primary__button">Sign in now</button>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );    
};

export default Register;




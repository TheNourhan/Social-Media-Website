import React from "react";
import "./postSearch.css";
import { Link } from "react-router-dom";

const PostsSearch = ({ postData}) => {
    const {avatar, content, country, name, title, userId, handel, photo} = postData;

    return (
        <div className="postsearch_container">
            <Link to={`/profile/${userId}`} className="people">
                <img className="peopleImg1" src={'/uploads/' + avatar} alt="" />
                <span className="peopleName1">{name}<br /><span className="handel1">@{handel}</span> </span>
                </Link>
                <div className="countryName1">
                    <label>{country}</label>
                </div>
                <div className="title1">
                    <label>{title}</label>
                </div>
                <div className="gragh1">
                    <p>{content}</p>
                </div>
                <div className="img1">
                    <img className="countryImg1" src={'/uploads/' + photo} alt="" />
                </div>
        </div>
    );
};

export default PostsSearch;

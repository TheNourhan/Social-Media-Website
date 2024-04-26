import React, { useState } from "react";
import "./searchBar.css";
import Sidebar from "../Sidebar/Sidebar";
import Widgets from "../Home/Widgets/Widgets";
import axios from 'axios';
import getTokenConfig from '../../Utils/TokenUtils';
import PeopleBox from '../PeopleBox/PeopleBox';
import PostsSearch from '../PostSearch/PostSearch';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchAll = async () => {
        if (!searchQuery.trim()) {
            window.alert('Please enter a search query before searching.');
            return;
        }
        try{const config = getTokenConfig();
            if (!config) return;
            const response = await axios.post("http://localhost:3003/api/search/", { query: searchQuery }, config)
            setSearchResults(response.data);
        }catch(error){
            console.error("Error:", error);
        };
    };
    
    return (
        <div className="searchBar">
            <Sidebar />
            <div className="searchBar_container">
                <h2>Search Page</h2>
                <div className="search-form">
                    <input 
                        type="text" 
                        className="search-form__input"
                        placeholder="search here.."
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <button 
                        className="search-form__btn" 
                        style={{ fontSize: "16px", width: "120px" }} 
                        onClick={handleSearchAll} 
                        type="submit"
                    >
                        search
                    </button>
                </div>
                <div className="search__result">
                    {searchResults.type === 'users' && (
                        searchResults.data.map(user => (
                            <PeopleBox key={user._id} user={user} />
                        ))
                    )}

                    {searchResults.type === 'posts' && (
                        searchResults.data.map(post => (
                            <PostsSearch key={post._id} postData={post} />
                        ))
                    )}
                </div>
            </div>
            
            <Widgets/>
        
        </div>
        
    );
};

export default SearchPage;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Widgets.css";
import PeopleBox from '../../PeopleBox/PeopleBox';
import getTokenConfig from '../../../Utils/TokenUtils';
import axios from "axios";


const Widgets = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const config = getTokenConfig();
                if (!config) return;
                const response = await axios.get(`http://localhost:3003/api/users`, config);
                setUsers(response.data.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchUsers(); 
    }, []);
    
    return (
        <div className="widgets">
            <div className="title">You might like</div>

            {users.map(user => (
                <Link className="users__link" key={user.id} to={`/profile/${user.id}`}>
                    <PeopleBox user={user} />
                </Link>
            ))}
            
        </div>
    );
};

export default Widgets;

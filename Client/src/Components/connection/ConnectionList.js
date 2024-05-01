import { useParams, useLocation} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getTokenConfig from '../../Utils/TokenUtils';
import Sidebar from '../Sidebar/Sidebar';
import PeopleBox from '../PeopleBox/PeopleBox';
import Widgets from '../Home/Widgets/Widgets';
import './ConnectionList.css';
import host from '../../Utils/HostURL';

const ConnectionList = ({ user }) => {
    const [following, setFollowing] = useState([]);
    const { userId } = useParams();
    const location = useLocation().pathname.split("/");
    const lastWord = location[location.length - 1];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = getTokenConfig();
        	    if (!config) return;
                const response = await axios.get(`${host.URL}/api/users/${userId}/${lastWord}`, config);
                setFollowing(response.data.data);
                console.log("following", response.data.data);
            } catch (error) {
                console.error(`Error fetching ${lastWord}:`, error);
            }
        };
        fetchData();
    }, [userId, lastWord]);
    return (
        <div className='connection'>
            <Sidebar />
            <div className='connection__container'>
                {following.map(user => (
                    <PeopleBox key={user._id} user={user} />
                ))}
            </div>
            <Widgets />
        </div>
    );
};

export default ConnectionList;

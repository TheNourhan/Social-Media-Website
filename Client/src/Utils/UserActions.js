import axios from "axios";
import getTokenConfig from './TokenUtils';
import { useState, useEffect } from 'react';
import host from './HostURL';

const useFollow = (userId) => {
  const [followed, setFollowed] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    setCurrentUserId(currentUser._id); 
    const isFollowing = currentUser?.following?.includes(userId) || false;
    setFollowed(isFollowing);
  }, [userId]); 


  const handleFollow = async () => {
    try {
      const config = getTokenConfig();
      if (!config) return;
      const requestBody = {
        followerId: currentUserId,
        followeeId: userId
      };

      console.log("req",currentUserId, userId)

      await axios.post(`${host.URL}/api/users/${userId}/follow`, requestBody, config);

      const currentUser = JSON.parse(localStorage.getItem('user'));
      currentUser.following.push(userId);
      localStorage.setItem('user', JSON.stringify(currentUser));
      setFollowed(true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const config = getTokenConfig();
      if (!config) return;
      const requestBody = {
        followerId: currentUserId,
        followeeId: userId
      };

      await axios.delete(`${host.URL}/api/users/${userId}/unfollow`, { data: requestBody, ...config });
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const index = currentUser.following.indexOf(userId);
      if (index !== -1) {
        currentUser.following.splice(index, 1);
        localStorage.setItem('user', JSON.stringify(currentUser));
        setFollowed(false);
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return { followed, handleFollow, handleUnfollow };
};

export default useFollow;

import React, { useState, useEffect } from "react";
import "./Notifications.css";
import Sidebar from "../Sidebar/Sidebar";
import Widgets from "../Home/Widgets/Widgets";
import NotificationItem from "./NotificationItem/NotificationItem";
import NavNotifications from "./NavNotifications/NavNotifications";
import axios from "axios";
import getTokenConfig from '../../Utils/TokenUtils';
import PersonIcon from "@mui/icons-material/Person";
import { FavoriteOutlined } from "@mui/icons-material";
import host from '../../Utils/HostURL';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser ? currentUser._id : null;

  const formattedNotifications = notifications.map(notification => {
    return {
      id: notification._id,
      avatar: notification.sender.avatar,
      name: `${notification.sender.firstName} ${notification.sender.lastName}`,
      userId: `${notification.sender._id}`,
      post_title: notification.type === 'like' ? `:       ${notification.postTitle}` : null,
      text_notification: notification.type === 'like' ? " Liked your post  " : " Added you  ",
      icon_notification: notification.type === 'like' ? <FavoriteOutlined /> : <PersonIcon />
    };
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const config = getTokenConfig();
        if (!config) return;
        const response = await axios.get(`${host.URL}/api/users/${currentUserId}/notifications`, config);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, [currentUserId]);
  return (
    <div className="notifications">
      {/**Sidebar */}
      <Sidebar />

      <div className="notifications__container">
        <NavNotifications />
        <div className="notificationItem__notificationsList">
          
        {formattedNotifications.map((notification, id) => (
            <NotificationItem
              key={id}
              notification={notification}
              owner={currentUserId === notification.userId}
              icon_notification={notification.icon_notification}
            />
          ))}

        </div>
      </div>

      {/**Widgets */}
      <Widgets />
    </div>
  );
};

export default Notifications;

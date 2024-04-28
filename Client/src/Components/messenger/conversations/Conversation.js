import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import getTokenConfig from '../../../Utils/TokenUtils';
import host from '../../../Utils/HostURL';

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const config = getTokenConfig();
        if (!config) return;
        const res = await axios(`${host.URL}/api/users/${friendId}`, config);
        setUser(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={'/uploads/' + user?.avatar}
        alt=""
      />
      <span className="conversationName">{user?.name}</span>
    </div>
  );
}
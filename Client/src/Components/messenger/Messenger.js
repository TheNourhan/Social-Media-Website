import React, { useState, useEffect, useRef } from "react";
import Conversation from "./conversations/Conversation";
import Message from "./message/Message";
import Sidebar from "../Sidebar/Sidebar";
import "./messenger.css";
import getTokenConfig from '../../Utils/TokenUtils';
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = () => {
   const [conversations, setConversations] = useState([]);
   const [currentChat, setCurrentChat] = useState(null);
   const [messages, setMessages] = useState([]);
   const [newMessage, setNewMessage] = useState("");
   const [arrivalMessage, setArrivalMessage] = useState(null);
   const [onlineUsers, setOnlineUsers] = useState([]);
   const [isUserAddedToSocket, setIsUserAddedToSocket] = useState(false);
   const socket = useRef();
   const scrollRef = useRef();
   const user = JSON.parse(localStorage.getItem("user"));

   useEffect(() => {
      socket.current = io("ws://localhost:8900");
      socket.current.on("getMessage", (data) => {
         setArrivalMessage({
         sender: data.senderId,
         text: data.text,
         createdAt: Date.now(),
         });
      });
   }, []);

   useEffect(() => {
      if (!isUserAddedToSocket) {
         socket.current.emit("addUser", user._id);
         setIsUserAddedToSocket(true);
      }
      socket.current.on("getUsers", (users) => {
         setOnlineUsers(
            user.following.filter((f) => users.some((u) => u.userId === f))
         );
      });
   }, [user, isUserAddedToSocket]);
  
   useEffect(() => {
      arrivalMessage &&
         currentChat?.members.includes(arrivalMessage.sender) &&
         setMessages((prev) => [...prev, arrivalMessage]);
   }, [arrivalMessage, currentChat]);

   useEffect(() => {
      const getConversations = async () => {
         try {
            const config = getTokenConfig();
            if (!config) return;
            const res = await axios.get(`http://localhost:3003/api/conversations/${user._id}`, config);
            setConversations(res.data);
         } catch (err) {
         console.log(err);
         }
      };
      getConversations();
   }, [user._id]);

   useEffect(() => {
      const getMessages = async () => {
         try {
            const config = getTokenConfig();
            if (!config) return;
            const res = await axios.get(`http://localhost:3003/api/messages/${currentChat?._id}` , config);
            setMessages(res.data);
         } catch (err) {
         console.log(err);
         }
      };
      getMessages();
   }, [currentChat]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const message = {
         sender: user._id,
         text: newMessage,
         conversationId: currentChat._id,
      };
      const receiverId = currentChat.members.find(
         (member) => member !== user._id
      );
      socket.current.emit("sendMessage", {
         senderId: user._id,
         receiverId,
         text: newMessage,
      });

      try {
         const config = getTokenConfig();
         if (!config) return;
         const res = await axios.post(`http://localhost:3003/api/messages/`, message, config);
         setMessages([...messages, res.data]);
         setNewMessage("");
      } catch (err) {
         console.log(err);
      }
   };

   useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   return (
      <>
         <div className="messenger">
            <Sidebar />

            <div className="chatBox">
               <div className="chatBoxWrappar">
               {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
                  </>
                  ) : (
                  <span className="noConversationText">
                     Open a conversation to start a chat.
                  </span>
               )}  
            </div>
               
            </div>

            <div className="chatMenu">
               <div className="chatMenuWrapper">
                  <div className="chatMenuInput">your chat</div>
                  {conversations.map((c) => (
                  <div className="userBox" onClick={() => setCurrentChat(c)}>
                     <Conversation conversation={c} currentUser={user} />
                  </div>
                  ))}
               </div>
            </div>

         </div>
      </>
   );
};

export default Messenger;

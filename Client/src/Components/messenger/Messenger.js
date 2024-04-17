
import Conversations from "./conversations/Conversation";
import Message from "./message/Message";
import Sidebar from "../Sidebar/Sidebar";
import "./messenger.css";

const Messenger = () => {
   return (
      <>
         <div className="messenger">


            <Sidebar />



            <div className="chatBox">
               <div className="chatBoxWrappar">
                  <div className="chatBoxTop">
                     <Message />
                     <Message own={true} />
                     <Message />
                     <Message own={true} />
                     <Message />
                     <Message own={true} />
                     <Message />
                     <Message own={true} />
                     <Message />
                     <Message own={true} />
                     <Message />
                     <Message own={true} />

                  </div>
                  <div className="chatBoxBottom">
                     <textarea className="chatMessageInput" placeholder="write something..."></textarea>
                     <button className="chatSubmitButten">Send</button>
                  </div>

               </div>
            </div>
            <div className="chatMenuWrappar">
               <input placeholder="search for friends" className="chatMenuInput" />
               <Conversations />
               <Conversations />
               <Conversations />
               <Conversations />
            </div>
         </div>
      </>
   );
};

export default Messenger;

import PhotoUser from "../../../Public/PhotoUser/PhotoUser";
import "./NotificationItem.css";
import { useNavigate } from "react-router-dom";

const NotificationItem = ({
    notification: {
        id,
        user_photo,
        name,
        userId,
        post_title,
        time,
        text_notification,
        icon_notification ,
    },
    owner,
}) => {
    const navigate = useNavigate(); 
    const handleUserClick = () => {
        navigate(`/profile/${userId}`);
    };
    
    return (
        <div className="notification__container">
            <div className="notification__container-icon">
                {icon_notification}
            </div>
            <div className="notification__container-content">
                <div onClick={handleUserClick} className="notification__container-photo">
                    <PhotoUser url={"https://images.squarespace-cdn.com/content/v1/5b7e14608ab722146afce766/1677349200894-YXLTF5YTGTG82XXFJ2ID/Kayla+Witt+headshot+%281%29.png?format=1000w"} size='32'/>
                </div>
                <div className="content__text">
                    <span onClick={handleUserClick}>{name}</span>
                    <span className="post">
                        {text_notification} 
                         <span>{post_title}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NotificationItem;

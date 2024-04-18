import PhotoUser from "../../../Public/PhotoUser/PhotoUser";
import "./NotificationItem.css";
import { useNavigate } from "react-router-dom";

const NotificationItem = ({
    notification: {
        id,
        avatar,
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
                    <PhotoUser url={'/uploads/' + avatar} size='32'/>
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

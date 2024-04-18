import { useNavigate } from "react-router-dom";
import PhotoUser from "../../../Public/PhotoUser/PhotoUser";
import "./NavPersonalProfile.css";

const NavPersonalProfile = (userData) => {
	console.log("userData",userData)
	const navigate = useNavigate(); 
    const handleEditClick = () => {
        navigate(`/profile/edit`);
    };
    
    return (
        <div className="container__navProfile">
			<section className="main__navProfile">
				<div className="main__navProfile-bgImage">
					<img src={'/uploads/' + userData?.data?.header} alt="background img" width="600" />
				</div>
				<div className='main__navProfile-imgUser'>
					<div className='photo__profile'>
						<PhotoUser url={'/uploads/' + userData?.data?.avatar} size='133' />
					</div>
				</div>
				<div className='btn__editProfile-container'>
                    <div className='main__dataProfile-User'>
						<h2>{userData?.data?.name}</h2>
						<span>@{userData?.data?.handle}</span>
					</div>
					<div onClick={handleEditClick} className='btn_editProfile-content'>
						<span>Edit Profile</span>
					</div>
				</div>
				<div className="main__dataProfile">
					<div className='main__dataProfile-description'>
						<div>
							{userData?.data?.bio}
						</div>
					</div>
					<div className='main__followBtns'>
						<div>
							<span className='followBtn__number'>{userData?.data?.following}</span>
							<span className='followBtn__text'>Following</span>
						</div>
						<div>
							<span className='followBtn__number'>{userData?.data?.followers}</span>
							<span className='followBtn__text'>Followers</span>
						</div>
					</div>
				</div>
			</section>
        </div>
    );
};

export default NavPersonalProfile;
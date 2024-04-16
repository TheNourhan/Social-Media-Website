import PhotoUser from "../../../Public/PhotoUser/PhotoUser";

const user = {
    user_photo:
        "https://images.squarespace-cdn.com/content/v1/5b7e14608ab722146afce766/1677349200894-YXLTF5YTGTG82XXFJ2ID/Kayla+Witt+headshot+%281%29.png?format=1000w",
    image_background:
        "https://www.xtrafondos.com/wallpapers/vertical/noche-en-las-montanas-con-planetas-de-fondo-7980.jpg",
};

const NavEditProfile = (userData) => {
    return (
        <div className="container__navProfile">
			<section className="main__navProfile">
				<div className="main__navProfile-bgImage">
					<img src={user.image_background} alt="background img" width="600" />
				</div>
				<div className='main__navProfile-imgUser'>
					<div className='photo__profile'>
						<PhotoUser url={user.user_photo} size='133' />
					</div>
				</div>
			</section>
        </div>
    );
};

export default NavEditProfile;
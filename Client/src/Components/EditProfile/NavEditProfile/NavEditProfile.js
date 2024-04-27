import PhotoUser from "../../../Public/PhotoUser/PhotoUser";

const NavEditProfile = (userData) => {
    return (
        <div className="container__navProfile">
			<section className="main__navProfile">
				<div className="main__navProfile-bgImage">
					<img src={'/uploads/' + userData?.header} alt="background img" width="600" />
				</div>
				<div className='main__navProfile-imgUser'>
					<div className='photo__profile'>
						<PhotoUser url={'/uploads/' + userData?.avatar} size='133' />
					</div>
				</div>
			</section>
        </div>
    );
};

export default NavEditProfile;
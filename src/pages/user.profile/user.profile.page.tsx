import React from 'react';
import BaseInput from "../../ui/base.input/base.input";
import UserStore from "../../store/user.store";
import "./user.profile.styles.css";
import BaseButton from "../../ui/base.button/base.button";
import sprite from "../../assets/spite.svg";

const UserProfilePage = () => {
	const user = UserStore.user;
	return (
		<div className={"base-page"}>
			<p className={"profile-page-title"}>Your Profile</p>
			<div className={"inputs-area"}>
				<div className={"user-avatar-input"}>
					<svg>
						<use href={sprite+"#profile"}/>
					</svg>
				</div>
				<BaseInput placeholder={"Name*"} defaultValue={user?.name}/>
				<BaseInput placeholder={"Surname"} defaultValue={user?.surname}/>
			</div>
			<BaseButton style={{margin:"auto auto 100px auto"}}>Save Changes</BaseButton>

		</div>
	);
};

export default UserProfilePage;
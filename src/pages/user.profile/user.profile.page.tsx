import React, { useState } from "react";
import BaseInput from "../../ui/base.input/base.input";
import UserStore from "../../store/user.store";
import "./user.profile.styles.css";
import BaseButton from "../../ui/base.button/base.button";
import sprite from "../../assets/spite.svg";
import UserService from "../../api/services/user.service";

const UserProfilePage = () => {
	const user = UserStore.user;
	const [name, setName] = useState<string>(user?.name || "");
	const [surname, setSurname] = useState<string>(user?.surname || "");

	const editUserProfile = async () =>{
		console.log("edit")
		console.log(name, surname, "saved", user?.name, user?.surname)
		if(name.length === 0 || (name === user?.name && user?.surname === surname)) return;

		console.log("send request")
		const updatedUser = await UserService.editMe(name, surname);
		if(updatedUser) UserStore.login(updatedUser);

	};
	return (
		<div className={"base-page"}>
			<p className={"profile-page-title"}>Your Profile</p>
			<div className={"inputs-area"}>
				<div className={"user-avatar-input"}>
					<svg>
						<use href={sprite+"#profile"}/>
					</svg>
				</div>
				<BaseInput placeholder={"Name*"} defaultValue={name} onChange={(e) => setName(e.currentTarget.value)}/>
				<BaseInput placeholder={"Surname"} defaultValue={surname} onChange={(e) => setSurname(e.currentTarget.value)}/>
			</div>
			<BaseButton
				style={{margin:"auto auto 100px auto"}}
				onClick={editUserProfile}
			>Save Changes</BaseButton>

		</div>
	);
};

export default UserProfilePage;
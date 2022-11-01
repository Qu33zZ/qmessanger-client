import React, { useState } from "react";
import BaseInput from "../../ui/base.input/base.input";
import UserStore from "../../store/user.store";
import "./user.profile.styles.css";
import BaseButton from "../../ui/base.button/base.button";
import sprite from "../../assets/spite.svg";
import UserService from "../../api/services/user.service";
import CloseButton from "../../ui/close.button/close.button";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { observer } from "mobx-react-lite";
import UploadAvatarPopup from "../../components/upload.avatar.popup/upload.avatar.popup";

const UserProfilePage = observer(() => {
	const navigate = useNavigate();
	const user = UserStore.user;
	const [avatarPopupOpened, setAvatarPopupOpened] = useState<boolean>(false);
	const [avatar, setAvatar] = useState<string>();
	const [name, setName] = useState<string>(user?.name || "");
	const [surname, setSurname] = useState<string>(user?.surname || "");
	const [username, setUsername] = useState<string>(user?.username || "");

	const editUserProfile = async () =>{
		const profileAlreadyUpToDate = () => {
			return name === user?.name && surname === user?.surname && username === user?.username;
		};

		if(!name || name.length === 0){
			return toast("Name can not be empty", {type:"error"});
		}
		if(!username || username.length === 0){
			return toast("Username can not be empty", {type:"error"});
		}

		if(profileAlreadyUpToDate()){
			return toast("Your profile is up to date", {type:"info"})
		};

		const updatedUser = await UserService.editMe({name, surname, username});
		if(updatedUser){
			UserStore.login(updatedUser);
			toast("Your profile was successfully updated", {type:"success"});
		}else{
			toast("Error happened while updating your profile", {type:"error"});
		}
	};

	return (
		<div className={"base-page user-profile-page"}>
			<CloseButton onClick={() =>{navigate("/")}}/>
			<p className={"profile-page-title"}>Your Profile</p>
			<div className={"inputs-area"}>
				<div className={"user-avatar-input"} onClick={() =>{setAvatarPopupOpened(true)}}>
					<svg>
						<use href={sprite+"#profile"}/>
					</svg>
				</div>
				<BaseInput placeholder={"Name*"} defaultValue={name} onChange={(e) => setName(e.currentTarget.value)}/>
				<BaseInput placeholder={"Username*"} defaultValue={username} onChange={(e) => setUsername(e.currentTarget.value)}/>
				<BaseInput placeholder={"Surname"} defaultValue={surname} onChange={(e) => setSurname(e.currentTarget.value)}/>
			</div>
			<UploadAvatarPopup 
				opened={avatarPopupOpened}
				setOpened={setAvatarPopupOpened}
				setAvatar = {setAvatar}
			/>
			<BaseButton
				style={{margin:"auto"}}
				onClick={editUserProfile}
			>
				Save Changes
			</BaseButton>
		</div>
	);
});

export default UserProfilePage;
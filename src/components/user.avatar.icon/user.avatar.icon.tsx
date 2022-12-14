import React from "react";
import { CONFIG } from "../../config";
import "./user.avatar.icon.styles.css";

interface IUserAvatarProps{
	name:string;
	surname?:string;
	avatar?:string;
	width?:number;
	height?:number;
}

const UserAvatarIcon:React.FC<IUserAvatarProps> = ({avatar, name, surname, width, height}) => {
	if(avatar){
		return (
			<img className={"user-avatar-icon"} src={`${CONFIG.api.server_url}${CONFIG.api.static_base_endpoint}/users/avatars/${avatar}`} alt={`{name}'s avatar`} style={{width, height}}/>
		)
	}
	return (
		<div className={"user-avatar-icon-with-name"} style={{width, height}}>
			<p>{name.charAt(0)}{surname?.charAt(0) ?? ""}</p>
		</div>
	);
};

export default UserAvatarIcon;
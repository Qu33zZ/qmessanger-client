import React from "react";
import "./user.avatar.icon.styles.css";

interface IUserAvatarProps{
	name:string;
	surname?:string;
	avatar?:string;
}

const UserAvatarIcon:React.FC<IUserAvatarProps> = ({avatar, name, surname}) => {
	if(avatar){
		return (
			<img src="" alt={`{name}'s avatar`}/>
		)
	}
	return (
		<div className={"user-avatar-icon-with-name"}>
			<p>{name.charAt(0)}{surname?.charAt(0)}</p>
		</div>
	);
};

export default UserAvatarIcon;
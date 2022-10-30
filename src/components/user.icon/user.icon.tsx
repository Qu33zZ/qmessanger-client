import React, {MouseEvent} from "react";
import UserAvatarIcon from "../user.avatar.icon/user.avatar.icon";
import { IUser } from "../../interfaces/IUser";
import "./user.icon.styles.css";
import ChatsService from "../../api/services/chats.service";
import ChatsStore from "../../store/chats.store";
import { toast } from "react-toastify";

interface IUserIconProps {
	user: IUser;
}

const UserIcon:React.FC<IUserIconProps> = ({user}) => {
	const {name, surname, avatar} = user;

	const createChat = async (e:MouseEvent<HTMLDivElement>) => {
		const createdChat = await ChatsService.createChat(user.id);
		if(!createdChat) return toast("Error happened while creating the chat", {type:"error"});
		ChatsStore.addChat(createdChat);
		return toast("Chat successfully created", {type:"success"});
	};

	return (
		<div className={"user-icon"} onClick={createChat}>
			<UserAvatarIcon name={name} surname={surname} avatar={avatar}/>
			<p className={"user-name-and-surname"}>{name} {surname}</p>
		</div>
	);
};

export default UserIcon;
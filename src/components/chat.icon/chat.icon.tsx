import React from "react";
import ChatImage from "../chat.image/chat.image";
import "./chat.icon.styles.css";
import { IChat } from "../../interfaces/IChat";
import UserStore from "../../store/user.store";
import { NavLink } from "react-router-dom";

const ChatIcon:React.FC<{chat:IChat}> = ({chat}) => {
	const [member] = Array.from(chat.members.values()).filter(mem => mem.id !== UserStore.user?.id);
	const [firstMessage] = Array.from(chat.messages.values()).filter(mem => mem.id !== UserStore.user?.id);

	return (
		<NavLink to={`/${chat.id}`} className={(state) => state.isActive ? "chat-icon-active" : "chat-icon"}>
			<div className={"chat-icon-content"}>
				<ChatImage avatar={member.avatar} surname={member.surname} name={member.name}/>
				<div className="chat-name-and-last-message">
					<p className={"chat-name"}>{`${member.name} ${(member.surname || "")}`}</p>
					<p className={"last-message"}>{firstMessage?.content?.length > 45 ? firstMessage.content?.slice(0, 45) + "...": firstMessage?.content}</p>
				</div>
			</div>
		</NavLink>

	);
};

export default ChatIcon;
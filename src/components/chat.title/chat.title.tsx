import React from "react";
import { IChat } from "../../interfaces/IChat";
import "./chat.title.styles.css";
import ChatImage from "../chat.image/chat.image";
import UserStore from "../../store/user.store";

const ChatTitle:React.FC<IChat> = (chat) => {
	const [member] = Array.from(chat.members.values()).filter(mem => mem.id !== UserStore.user?.id);
	return (
		<div className={"chat-title-block"}>
			<div className="chat-title">
				<ChatImage avatar={member.avatar} name={member.name} surname={member.surname || ""}/>
				<p className={"member-name-and-surname-chat-title"}>{`${member.name} ${member.surname || ""}`}</p>
			</div>
		</div>
	);
};

export default ChatTitle;
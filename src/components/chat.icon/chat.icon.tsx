import React from "react";
import ChatImage from "../chat.image/chat.image";
import { Chat } from "../../objects/chat";
import "./chat.icon.styles.css";

const ChatIcon:React.FC<Chat> = (chat) => {
	const [member] = chat.members.values();
	return (
		<div className={"chat-icon"}>
			<ChatImage avatar={member.avatar} surname={member.surname} name={member.name}/>
			<p className={"chat-name"}>{`${member.name} ${(member.surname || "")}`}</p>
		</div>
	);
};

export default ChatIcon;
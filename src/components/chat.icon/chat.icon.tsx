import React from "react";
import ChatImage from "../chat.image/chat.image";
import { Chat } from "../../objects/chat";


const ChatIcon:React.FC<Chat> = (chat) => {
	const [member] = chat.members.values();
	return (
		<div className={"chat-icon"}>
			<ChatImage avatar={member.avatar} surname={member.surname} name={member.name} alt={"Chat image"}/>
			<p>{member.name}</p>
		</div>
	);
};

export default ChatIcon;
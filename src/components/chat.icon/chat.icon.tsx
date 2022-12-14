import React from "react";
import ChatImage from "../chat.image/chat.image";
import "./chat.icon.styles.css";
import { IChat } from "../../interfaces/IChat";
import UserStore from "../../store/user.store";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";

const ChatIcon:React.FC<{chat:IChat}> = observer(({chat}) => {
	const [member] = Array.from(chat.members.values()).filter(mem => mem.id !== UserStore.user?.id);
	const messages = Array.from(chat.messages.values()).filter(mem => mem.id !== UserStore.user?.id);
	const latestMessage = messages[messages.length -1];

	return (
		<NavLink
			to={`/${chat.id}`}
			className={(state) => state.isActive ? "chat-icon-active" : "chat-icon"}
		>
			<div className={"chat-icon-content"}>
				<ChatImage avatar={member.avatar} surname={member.surname} name={member.name}/>
				<div className="chat-name-and-last-message">
					<p className={"chat-name"}>{`${member.name} ${(member.surname ?? "")}`}</p>
					<p className={"last-message"}>
						{latestMessage?.content}
					</p>
				</div>
			</div>
		</NavLink>

	);
});

export default ChatIcon;
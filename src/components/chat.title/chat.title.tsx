import React from "react";
import { IChat } from "../../interfaces/IChat";
import "./chat.title.styles.css";
import ChatImage from "../chat.image/chat.image";
import UserStore from "../../store/user.store";
import sprite from "../../assets/spite.svg";
import { Navigate, useNavigate } from "react-router";
import moment from "moment";
import { observer } from "mobx-react-lite";

const ChatTitle:React.FC<IChat> = observer((chat) => {
	const navigate = useNavigate();
	const [member] = Array.from(chat.members.values()).filter(mem => mem.id !== UserStore.user?.id);
	return (
		<div className={"chat-title-block"}>
			<button className={"back-to-chats-button"} onClick={() => navigate("/")}>
				<svg>
					<use href={sprite+"#arrow"}/>
				</svg>
			</button>
			<div className="chat-title-block">
				<div className="chat-title-content">
					<ChatImage avatar={member.avatar} name={member.name} surname={member.surname || ""}/>
					<div className="chat-name-and-last-online-at">
						<p className={"member-name-and-surname-chat-title"}>{`${member.name} ${member.surname || ""}`}</p>
						<p className="last-online-at-time">{member.lastOnlineAt === "online" ? "Online" : `Online - ${moment(member.lastOnlineAt).fromNow()}`}</p>
					</div>
				</div>
			</div>
		</div>
	);
});

export default ChatTitle;
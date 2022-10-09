import React, { useEffect, useState } from "react";
import ChatImage from "../chat.image/chat.image";
import UserStore from "../../store/user.store";
import sprite from "../../assets/spite.svg";
import ChatSearch from "../chat.search/chat.search";
import ChatsStore from "../../store/chats.store";
import ChatIcon from "../chat.icon/chat.icon";
import ChatsService from "../../api/services/chats.service";
import "./chats.list.styles.css";

const ChatsList = () => {
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const getChats = async () =>{
			const chats = await ChatsService.getChats();
			if(chats) ChatsStore.setChatsFromApi(chats);
		}
		getChats().finally(() => setLoading(false));
	}, []);

	if(loading) return (
		<div className={"chats-list-block"}>

		</div>
	)

	return (
		<div className={"chats-list-block"}>
			<div className={"chats-block-header"}>
				<ChatImage avatar={UserStore.user?.avatar} name={UserStore.user?.name || ""} surname={UserStore.user?.surname || ""}/>
				<p className={"chats-block-title"}>Chats</p>
				<svg className="add-chat-icon">
					<use href={sprite+"#add-chat-icon"}/>
				</svg>
			</div>
			<ul className={"chats-list"}>
				<ChatSearch/>
				{
					Array.from(ChatsStore.chats.values()).map((chat) => <ChatIcon chat={chat} key={chat.id}/>)
				}
			</ul>

		</div>
	);
};

export default ChatsList;
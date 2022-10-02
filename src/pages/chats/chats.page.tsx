import React, { useEffect, useState } from "react";
import ChatsStore from "../../store/chats.store";
import ChatIcon from "../../components/chat.icon/chat.icon";
import ChatsService from "../../api/services/chats.service";
import "./chats.page.styles.css";
import sprite from "../../assets/spite.svg";
import ChatSearch from "../../components/chat.search/chat.search";
import { observer } from "mobx-react-lite";

const ChatsPage = observer(() => {
	const [loading, setLoading] = useState<boolean>(true)
	const activeChat = ChatsStore.activeChat;

	useEffect(() => {
		const getChats = async () =>{
			const chats = await ChatsService.getChats();
			if(chats) ChatsStore.setChatsFromApi(chats);
		}
		getChats().then(() => setLoading(false));
	}, [])
	return (
		<div className={"chats-page"}>
			{loading
				? <p>Loading</p>
				: <div className={"chats-list-block"}>
					<div className={"chats-block-header"}>
						<p className={"chats-block-title"}>Chats</p>
						<svg className="add-chat-icon">
							<use href={sprite+"#add-chat-icon"}/>
						</svg>
					</div>
					<ul className={"chats-list"}>
						<ChatSearch/>
						{
							Array.from(ChatsStore.chats.values()).map((chat) => <ChatIcon chat={chat}/>)
						}
					</ul>

				</div>
			}

		</div>
	);
});

export default ChatsPage;
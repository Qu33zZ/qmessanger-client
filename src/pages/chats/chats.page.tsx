import React, { useEffect } from "react";
import ChatsStore from "../../store/chats.store";
import ChatIcon from "../../components/chat.icon/chat.icon";
import ChatsService from "../../api/services/chats.service";

const ChatsPage = () => {
	useEffect(() => {
		const getChats = async () =>{
			const chats = await ChatsService.getChats();
		}
	}, [])
	return (
		<div>
			<p>Chats</p>
			<div className={"chats-list"}>
				{
					Array.from(ChatsStore.chats).map((chat) => <ChatIcon {...chat}/>)
				}
			</div>
		</div>
	);
};

export default ChatsPage;
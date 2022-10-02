import React from 'react';
import ChatsStore from "../../store/chats.store";
import ChatIcon from "../../components/chat.icon/chat.icon";

const ChatsPage = () => {

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
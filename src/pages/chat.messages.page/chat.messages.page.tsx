import React, { useEffect, useState } from "react";
import ChatsStore from "../../store/chats.store";
import { Navigate, useParams } from "react-router";
import Loader from "../../ui/loader/loader";
import ChatsList from "../../components/chats.list/chats.list";
import ChatMessages from "../../components/chat.messages/chat.messages";
import "./chat.messages.styles.css";
import ChatTitle from "../../components/chat.title/chat.title";
import { observer } from "mobx-react-lite";

const ChatMessagesPage = observer(() => {

	const {chatId} = useParams();
	const activeChat = ChatsStore.chats.get(chatId || "");



	if(!activeChat){
		return (
			<Navigate to={"/"}/>
		)
	}

	return (
		<div className={"chat-messages-page"}>
			<ChatsList/>
			<ChatTitle {...activeChat}/>

			<ChatMessages key={chatId} activeChat={activeChat}/>

		</div>
	);
});

export default ChatMessagesPage;
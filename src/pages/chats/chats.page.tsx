import React, { useEffect } from "react";
import "./chats.page.styles.css";
import { observer } from "mobx-react-lite";
import ChatsList from "../../components/chats.list/chats.list";
import UserStore from "../../store/user.store";
import SocketClient from "../../api/socket.client";

const ChatsPage = observer(() => {
	useEffect(() =>{
		if(UserStore.user) new SocketClient();
	}, []);

	return (
		<div className={"chats-page"}>
			<ChatsList/>
			<div className={"select-chat"}><p>Select a chat</p></div>
		</div>
	);
});

export default ChatsPage;
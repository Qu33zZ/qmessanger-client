import React from "react";
import "./chats.page.styles.css";
import { observer } from "mobx-react-lite";
import ChatsList from "../../components/chats.list/chats.list";

const ChatsPage = observer(() => {
	return (
		<div className={"chats-page"}>
			<ChatsList/>
		</div>
	);
});

export default ChatsPage;
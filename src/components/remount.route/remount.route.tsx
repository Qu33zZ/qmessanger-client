import React from "react";
import { useParams } from "react-router";
import ChatMessagesPage from "../../pages/chat.messages.page/chat.messages.page";
import { observer } from "mobx-react-lite";


const RemountRouteElement:React.FC = observer(() => {
	const {chatId} = useParams()

	return (
		<ChatMessagesPage key={chatId}/>
	);
});

export default RemountRouteElement;
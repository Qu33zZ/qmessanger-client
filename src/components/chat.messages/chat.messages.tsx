import React, { useEffect, useState } from "react";
import ChatsStore from "../../store/chats.store";
import { Message as MessageObject } from "../../objects/message";
import Message  from "../message/message";
import "./chat.messages.style.css";
import { observer } from "mobx-react-lite";

const ChatMessages = observer(() => {
	const [loaded, setLoaded] = useState<boolean>(false);
	const activeChat = ChatsStore.activeChat;
	console.log(activeChat);



	useEffect(() => {
		console.log(`Active chat ${activeChat}`);
		const getChatMessages = async () =>{
			console.log("Fetching messages....")
			if(activeChat){
				const messages = await activeChat.getMessages();
				activeChat.messages = new Map<string, MessageObject>(messages.map(message => [message.id, new MessageObject(message)]));
			}else{console.log("No active chat")}
		};
		getChatMessages().then(() => {console.log("Finish fetching message"); setLoaded(true)});
	}, []);

	if(!activeChat) return (
		<div className={"unselect-chat-messages"}>
			<p>Select chat</p>
		</div>
	);

	if(!loaded) return (
		<div className={"unselect-chat-messages"}>
			<p>Loading...</p>
		</div>
	)

	return (
		<div className={"chat-messages"}>
			{loaded
				? <p>Loading...</p>
				: (
					(!activeChat.messages || activeChat.messages.size === 0 )
						? <p>This chat is empty</p>
						: Array.from(activeChat.messages.values()).map(message => <Message {...message}/>)
				)
			}
		</div>
	);
});

export default ChatMessages;
import React, { useEffect, useState } from "react";
import Message  from "../message/message";
import "./chat.messages.style.css";
import { observer } from "mobx-react-lite";
import { IChat } from "../../interfaces/IChat";
import Loader from "../../ui/loader/loader";

interface IChatMessagesProps{
	activeChat:IChat
}
const ChatMessages:React.FC<IChatMessagesProps> = observer(({activeChat}) => {
	const [loading, setLoading] = useState<boolean>(true);
	console.log("loading", loading)
	useEffect(() => {
		const fetchMessages = async () => {
			if(activeChat){
				const messages = await activeChat.getMessages();
				activeChat.setMessages(messages);
			}
		};
		fetchMessages().finally(() => {
			setLoading(false);
		});
	}, []);


	if(!activeChat.messages || activeChat.messages.size === 0) return (
		<div className="unselect-chat-messages">
			<p>This chat is empty</p>
		</div>
	);

	return (
		loading
			?
				<div className="unselect-chat-messages">
					<Loader/>
				</div>
			:
				<div className={"chat-messages"}>
				{
					Array.from(activeChat.messages.values()).map(message => <Message {...message} key={message.id}/>)
				}
				</div>
		);

});

export default ChatMessages;
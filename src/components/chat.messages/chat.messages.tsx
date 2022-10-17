import React, { SetStateAction, useEffect, useRef, useState } from "react";
import Message  from "../message/message";
import "./chat.messages.style.css";
import { observer } from "mobx-react-lite";
import { IChat } from "../../interfaces/IChat";
import Loader from "../../ui/loader/loader";
import { Message as MessageObject } from "../../objects/message";
import MessageMenu from "../message.menu/message.menu";

interface IChatMessagesProps{
	activeChat:IChat;
}

export interface IMessageMenuState{
	xPos:number;
	yPos:number;
	message:MessageObject | null;
}

const ChatMessages:React.FC<IChatMessagesProps> = observer(({activeChat}) => {
	const [menuState, setMenuState] = useState<IMessageMenuState>({xPos:0, yPos:0, message:null});
	const [loading, setLoading] = useState<boolean>(true);
	const messagesEl = useRef<HTMLDivElement>(null);

	//scroll on open or on new message
	useEffect(() => {
		if(messagesEl.current) messagesEl.current.scroll({ top: messagesEl.current.scrollHeight, behavior:"auto" });
	}, [activeChat])

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
				<div className={`unselect-chat-messages`}>
					<Loader/>
				</div>
			:
				<div ref={messagesEl} className={`chat-messages ${menuState.message ? "scroll-lock" : "custom-scroll"}`}>
				{
					Array.from(activeChat.messages.values()).map(message => <Message message={message} key={message.id} setMenuState={setMenuState}/>)
				}
				{
					menuState.message && <MessageMenu
						message={menuState.message}
						xPos={menuState.xPos}
						yPos={menuState.yPos}
						setMessageMenu={setMenuState}
				    />
				}
				</div>
		);

});

export default ChatMessages;
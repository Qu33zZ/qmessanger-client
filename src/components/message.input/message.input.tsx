import React, { ChangeEvent, useRef, useState, KeyboardEvent } from "react";
import sprite from "../../assets/spite.svg";
import "./styles.message.input.css";
import { IChat } from "../../interfaces/IChat";
import MessageReplySelected from "../message.reply.selected/message.reply.selected";
import { observer } from "mobx-react-lite";
import ChatsStore from "../../store/chats.store";

interface IMessageInputProps{
	chat:IChat;
}

const MessageInput:React.FC<IMessageInputProps> = observer(({chat}) => {
	const [messageContent, setMessageContent] = useState<string>("");
	const messageInputRef = useRef<HTMLTextAreaElement>(null);

	const resizeInput = (e:ChangeEvent<HTMLTextAreaElement>)=>{
		setMessageContent(e.currentTarget.value);

		if(e.currentTarget.scrollHeight > 200) return e.currentTarget.style.overflowY = "auto";

		e.currentTarget.style.height = "0px";
		e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
	};

	const handleEnterPress = (e:KeyboardEvent<HTMLTextAreaElement>) =>{
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if(document.activeElement === e.currentTarget){
				sendMessage();
			}
		}
	};

	const sendMessage = async () =>{
		if(messageContent.length === 0) return;
		if(chat.selectedMessageForReply){
			await chat.sendMessage(messageContent, chat.selectedMessageForReply.id);
			ChatsStore.unselectMessageForReply(chat.id);
		}else{
			await chat.sendMessage(messageContent);
		}
		setMessageContent("");
	};

	return (
		<div className={"message-input-area"}>
			{chat.selectedMessageForReply && <MessageReplySelected message={chat.selectedMessageForReply}/>}
			<div className="message-content-input-block">
				<textarea ref={messageInputRef}
				          className={"message-input custom-scroll"}
				          placeholder={"Type your message"}
				          value={messageContent}
				          onChange={resizeInput}
				          onKeyPress={handleEnterPress}
				/>
				<button className="send-message" onClick={sendMessage}>
					<svg className="plane-icon">
						<use href={sprite+"#plane"}/>
					</svg>
				</button>
			</div>
		</div>
	);
});

export default MessageInput;
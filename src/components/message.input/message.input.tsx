import React, { ChangeEvent, useRef, useState, KeyboardEvent } from "react";
import sprite from "../../assets/spite.svg";
import "./styles.message.input.css";
import { IChat } from "../../interfaces/IChat";

interface IMessageInputProps{
	chat:IChat;
}
const MessageInput:React.FC<IMessageInputProps> = ({chat}) => {

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
			if(document.activeElement === e.currentTarget) sendMessage();
		}
	};

	const sendMessage = async () =>{
		if(messageContent.length === 0) return;
		await chat.sendMessage(messageContent);
		setMessageContent("")
	};

	return (
		<div className={"message-input-area"}>
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
	);
};

export default MessageInput;
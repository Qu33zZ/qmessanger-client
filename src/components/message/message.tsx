import React, { useRef, MouseEvent, useState, SetStateAction } from "react";
import { Message as MessageObject} from "../../objects/message";
import UserStore from "../../store/user.store";
import "./message.styles.css";
import { IMessageMenuState } from "../chat.messages/chat.messages";

interface IMessageProps{
	message:MessageObject,
	setMenuState:React.Dispatch<SetStateAction<IMessageMenuState>>
}

const Message:React.FC<IMessageProps> = ({message, setMenuState}) => {
	const handleMenuOpen = (e:MouseEvent<HTMLDivElement>) =>{
		e.preventDefault();
		setMenuState({
			xPos:e.pageX,
			yPos:e.pageY,
			message:message
		});
	};

	return (
		<div
			onContextMenu={handleMenuOpen}
			className={message?.author?.id === UserStore.user?.id ? "my-message" : "message"
		}>
			{message.content}
		</div>
	);
};

export default Message;
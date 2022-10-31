import React, { MouseEvent, SetStateAction } from "react";
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
		console.log("X --- ", e.pageX, "Y --- ", e.pageY);
		setMenuState({
			xPos:e.pageX,
			yPos:e.pageY,
			message:message
		});
	};

	if(message.repliedTo){
		return (
			<div className={`message-reply-container ${message?.author?.id === UserStore.user?.id ? "me-replying" : "not-me-replying"}`}>
				<div className="reply">
					{message.repliedTo.content}
				</div>
				<div
					onContextMenu={handleMenuOpen}
					className={message?.author?.id === UserStore.user?.id ? "my-message" : "message"}
				>
					{message.content}
				</div>
			</div>
		)
	}
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
import React, { MouseEvent, SetStateAction } from "react";
import { Message as MessageObject} from "../../objects/message";
import UserStore from "../../store/user.store";
import "./message.styles.css";
import { IMessageMenuState } from "../chat.messages/chat.messages";
import moment from "moment";

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

	if(message.repliedTo){
		return (
			<div className={`message-reply-container ${message?.author?.id === UserStore.user?.id ? "me-replying" : "not-me-replying"}`}>
				<div className="reply">
					<p className="content">{message.repliedTo.content}</p>
					<p className="time">{moment(message.createdAt).format("HH:mm")}</p>
				</div>
				<div
					onContextMenu={handleMenuOpen}
					className={message?.author?.id === UserStore.user?.id ? "my-message" : "message"}
				>
					<p className="content">{message.content}</p>
					<p className="time">{moment(message.createdAt).format("HH:mm")}</p>
				</div>
			</div>
		)
	}

	return (
		<div
			onContextMenu={handleMenuOpen}
			className={message?.author?.id === UserStore.user?.id ? "my-message" : "message"
		}>
			<p className="content">{message.content}</p>
			<p className="time">{moment(message.createdAt).format("HH:mm")}</p>
		</div>
	);
};

export default Message;
import React, { MouseEvent, SetStateAction } from "react";
import { Message as MessageObject} from "../../objects/message";
import UserStore from "../../store/user.store";
import "./message.styles.css";
import { IMessageMenuState } from "../chat.messages/chat.messages";
import moment from "moment";
import UserAvatarIcon from "../user.avatar.icon/user.avatar.icon";

interface IMessageProps{
	prevMessage:MessageObject;
	message:MessageObject;
	setMenuState:React.Dispatch<SetStateAction<IMessageMenuState>>;
}

const Message:React.FC<IMessageProps> = ({prevMessage, message, setMenuState}) => {
	const isFirstMessageFromUser = prevMessage?.author?.id !== message?.author?.id;
	const isMessageMine = message?.author?.id === UserStore.user?.id;
	const handleMenuOpen = (e:MouseEvent<HTMLDivElement>) =>{
		e.preventDefault();
		setMenuState({
			xPos:e.pageX,
			yPos:e.pageY,
			message:message
		});
	};

	const userAvatar =  isFirstMessageFromUser ? <UserAvatarIcon {...message.author} width={30} height={30}/> : null;
	if(message.repliedTo){
		return (
			<div className={`message-bubble ${isMessageMine ? "my-message" : "not-my-message"} ${isFirstMessageFromUser ? "first-message-from-user" : ""}`}>
				{!isMessageMine && userAvatar}
				<div className="reply-container">
					<div className="replied-to-message-content">
						<p className="content">{message.repliedTo.content}</p>
						<p className="time">{moment(message.createdAt).format("HH:mm")}</p>
					</div>
					<div
						onContextMenu={handleMenuOpen}
						className={"message-content"}
					>
						<p className="content">{message.content}</p>
						<p className="time">{moment(message.createdAt).format("HH:mm")}</p>
					</div>
				</div>
				{isMessageMine && userAvatar}
			</div>
		)
	}

	return (
		<div className={`message-bubble ${isMessageMine ? "my-message" : "not-my-message"} ${isMessageMine ? "my-message" : "not-my-message"} ${isFirstMessageFromUser ? "first-message-from-user" : ""}`}>
			{!isMessageMine && userAvatar}
			<div
				className={`message-content`}
				onContextMenu={handleMenuOpen}
			>
				<p className="content">{message.content}</p>
				<p className="time">{moment(message.createdAt).format("HH:mm")}</p>
			</div>
			{isMessageMine && userAvatar}
		</div>
	);
};

export default Message;
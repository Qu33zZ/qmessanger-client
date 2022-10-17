import React from "react";
import { Message } from "../../objects/message";
import { observer } from "mobx-react-lite";
import "./message.reply.selected.styles.css";

interface IMessageReplySelectedProps{
	message:Message;
}
const MessageReplySelected:React.FC<IMessageReplySelectedProps> = observer(({message}) => {
	return (
		<div className={"selected-message-for-reply"}>
			<p className={"author-of-selected-message"}>{message.author.name}</p>
			<p className={"content-of-selected-message"}>{message.content}</p>
		</div>
	);
});

export default MessageReplySelected;
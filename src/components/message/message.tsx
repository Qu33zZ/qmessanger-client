import React, { LegacyRef, useRef } from "react";
import { IMessage } from "../../interfaces/IMessage";
import UserStore from "../../store/user.store";
import "./message.styles.css";

const Message:React.FC<IMessage> = (message) => {
	return (
		<div className={message?.author?.id === UserStore.user?.id ? "my-message" : "message"}>
			{message.content}
		</div>
	);
};

export default Message;
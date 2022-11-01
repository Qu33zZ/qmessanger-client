import React from "react";
import { CONFIG } from "../../config";
import "./chat.image.styles.css";

interface IChatImageProps{
	avatar:string | undefined;
	name:string;
	surname:string | undefined;
}

const ChatImage:React.FC<IChatImageProps> = ({avatar, name, surname}) => {
	return (
			avatar
				? <img className={"chat-image"} src={`${CONFIG.api.server_url}${CONFIG.api.static_base_endpoint}/users/avatars/${avatar}`}/>
				: <div className="chat-image-with-name">{name.charAt(0)}{surname?.charAt(0) ?? ""}</div>
	);
};

export default ChatImage;
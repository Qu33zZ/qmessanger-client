import React from "react";

interface IChatImageProps{
	avatar:string | undefined;
	name:string;
	surname:string | undefined;
}

const ChatImage:React.FC<IChatImageProps> = ({avatar, name, surname}) => {
	return (
			avatar
				? <img className={"chat-image"}/>
				: <div className="chat-icon-with-name">{name.charAt(0)+surname?.charAt(0)}</div>
	);
};

export default ChatImage;
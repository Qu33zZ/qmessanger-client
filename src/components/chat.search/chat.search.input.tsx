import React from "react";
import "./chat.search.input.styes.css";

const ChatSearchInput:React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = (props) => {
	return (
		<input className={"chat-search"} {...props}/>
	);
};

export default ChatSearchInput;
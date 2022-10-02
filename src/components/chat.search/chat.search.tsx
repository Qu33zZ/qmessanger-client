import React from "react";
import ChatSearchInput from "./chat.search.input";
import "./chat.search.styles.css";
import sprite from "../../assets/spite.svg";

const ChatSearch = () => {
	return (
		<div className={"chats-search"}>
			<svg className={"search-icon"}>
				<use href={sprite+"#search"}/>
			</svg>
			<ChatSearchInput placeholder={"Search"}/>
		</div>
	);
};

export default ChatSearch;
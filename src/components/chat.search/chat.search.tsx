import React, { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import ChatSearchInput from "./chat.search.input";
import "./chat.search.styles.css";
import sprite from "../../assets/spite.svg";
import ChatsStore from "../../store/chats.store";
import UserStore from "../../store/user.store";
import { IChat } from "../../interfaces/IChat";
import { IUser } from "../../interfaces/IUser";
import userService from "../../api/services/user.service";

interface IChatSearchProps{
	setChatsFromSearch:React.Dispatch<SetStateAction<IChat[] | null>>;
	setUsersFromSearch:React.Dispatch<SetStateAction<IUser[] | null>>;
}

const ChatSearch:React.FC<IChatSearchProps> = ({setChatsFromSearch, setUsersFromSearch}) => {

	const searchChat = (e:ChangeEvent<HTMLInputElement>) => {
		if(e.currentTarget.value.length === 0){
			setChatsFromSearch(null);
			setUsersFromSearch(null);
			return;
		}

		//if authorized user want to find another user and starts writing his username
		if(e.currentTarget.value.startsWith("@")){
			const lookForUsers = async () =>{
				const username = e.currentTarget.value.substring(1);
				if(username.length === 0){
					return setUsersFromSearch([]);
				}
				const possibleUsers = await userService.lookForUsersByUsername(username);
				setUsersFromSearch(possibleUsers);
			}
			return lookForUsers();
		}

		//search chats in store
		const chats = ChatsStore.chats;
		const possibleChats = Array.from(chats.values()).filter(chat => {
			const [member] = Array.from(chat.members.values()).filter(mem => mem.id !== UserStore.user?.id);
			const chatName = `${member.name} ${member.surname}`;
			return chatName.toLowerCase().includes(e.currentTarget.value.toLowerCase());
		});
		setChatsFromSearch(possibleChats);
	};

	return (
		<div className={"chats-search"}>
			<svg className={"search-icon"}>
				<use href={sprite+"#search"}/>
			</svg>
			<ChatSearchInput
				placeholder={"Search"}
				onChange={searchChat}
			/>
		</div>
	);
};

export default ChatSearch;
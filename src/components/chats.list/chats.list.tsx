import React, { useEffect, useState } from "react";
import ChatImage from "../chat.image/chat.image";
import UserStore from "../../store/user.store";
import sprite from "../../assets/spite.svg";
import ChatSearch from "../chat.search/chat.search";
import ChatsStore from "../../store/chats.store";
import ChatIcon from "../chat.icon/chat.icon";
import ChatsService from "../../api/services/chats.service";
import "./chats.list.styles.css";
import Loader from "../../ui/loader/loader";
import { IChat } from "../../interfaces/IChat";
import { IUser } from "../../interfaces/IUser";
import UserIcon from "../user.icon/user.icon";
import UserAvatarIcon from "../user.avatar.icon/user.avatar.icon";
import { Link } from "react-router-dom";

const ChatsList = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [chatsFromSearch, setChatsFromSearch] = useState<IChat[] | null>(null);
	const [usersFromSearch, setUsersFromSearch] = useState<IUser[] | null>(null);

	useEffect(() => {
		const getChats = async () => {
			const chats = await ChatsService.getChats();
			if (chats) ChatsStore.setChatsFromApi(chats);
		};
		getChats().finally(() => setLoading(false));
	}, []);

	if (loading)
		return (
			<div className={"chats-list-block"}>
				<Loader />
			</div>
		);

	// search results for chats search
	const chatsFromSearchElement =
		chatsFromSearch?.length === 0 ? (
			<p>Chats not found</p>
		) : (
			chatsFromSearch?.map((chat) => <ChatIcon chat={chat} key={chat.id} />)
		);

	// search results for users search
	const usersFromSearchElement =
		usersFromSearch?.length === 0 ? (
			<p>Users not found</p>
		) : (
			usersFromSearch?.map((user) => (
				<UserIcon user={user}/>
			))
		);

	// element with search results for chats OR users search
	const displaySearchElement = (
		usersFromSearch ? usersFromSearchElement : (chatsFromSearch ? chatsFromSearchElement : null)
	)

	return (
		<div className={"chats-list-block"}>
			<div className={"chats-block-header"}>
				<Link to={"/profile"}>
					<UserAvatarIcon
						avatar={UserStore.user?.avatar}
						name={UserStore.user?.name || ""}
						surname={UserStore.user?.surname || ""}
					/>
				</Link>
				<p className={"chats-block-title"}>Chats</p>
				<svg className="add-chat-icon">
					<use href={sprite + "#add-chat-icon"}/>
				</svg>
			</div>
			<ul className={"chats-list"}>
				<ChatSearch setChatsFromSearch={setChatsFromSearch} setUsersFromSearch={setUsersFromSearch}/>
				{
					displaySearchElement
						? displaySearchElement
						: Array.from(ChatsStore.chats.values()).map((chat) => <ChatIcon chat={chat} key={chat.id}/>)
				}
			</ul>
		</div>
	);
};

export default ChatsList;

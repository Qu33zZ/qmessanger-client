import { makeAutoObservable } from "mobx";
import { IChat } from "../interfaces/IChat";
import { IChatFromAPI } from "../interfaces/IChatFromAPI";
import { Chat } from "../objects/chat";

class ChatsStore{
	chats:Map<string, IChat> = new Map<string, IChat>();

	constructor() {
		makeAutoObservable(this, {}, {deep:true});
	};

	setChatsFromApi(chats:IChatFromAPI[]):void{
		const formatedChats = this.formatChatsFromApi(chats);
		this.chats = formatedChats;
	};

	private formatChatsFromApi(chats:IChatFromAPI[]):Map<string, Chat>{
		return new Map<string, Chat>(chats.map(chat => [chat.id, new Chat(chat)]));
	}

}

export default new ChatsStore();
import { makeAutoObservable } from "mobx";
import { IChat } from "../interfaces/IChat";
import { IChatFromAPI } from "../interfaces/IChatFromAPI";
import { Chat } from "../objects/chat";
import { Message } from "../objects/message";


class ChatsStore{
	// activeChat:IChat | null = null;
	chats:Map<string, IChat> = new Map<string, IChat>();

	constructor() {
		makeAutoObservable(this, {}, {deep:true});
	};

	editChatMessages(chatId:string, messages:Map<string, Message>){
		const chat = this.chats.get(chatId);
		if(!chat) return;

		const chatCopy = Object.assign(Object.create(Object.getPrototypeOf(chat)), chat);
		chatCopy.messages = messages;

		this.chats.set(chatId, chatCopy);
	};

	setChatsFromApi(chats:IChatFromAPI[]):void{
		const formatedChats = this.formatChatsFromApi(chats);
		this.chats = formatedChats;
	};

	private formatChatsFromApi(chats:IChatFromAPI[]):Map<string, Chat>{
		return new Map<string, Chat>(chats.map(chat => [chat.id, new Chat(chat)]));
	};

}

export default new ChatsStore();
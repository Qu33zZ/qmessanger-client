import { makeAutoObservable, ObservableMap } from "mobx";
import { IChat } from "../interfaces/IChat";
import { IChatFromAPI } from "../interfaces/IChatFromAPI";
import { Chat } from "../objects/chat";
import { Message } from "../objects/message";
import { observable } from "mobx";


class ChatsStore{
	chats:ObservableMap<string, IChat> = observable.map<string, IChat>();

	constructor() {
		makeAutoObservable(this, undefined, {deep:true});
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

	addChat(chat:IChatFromAPI):void{
		const [formatedChat] = this.formatChatsFromApi([chat]).values();
		this.chats.set(formatedChat.id, formatedChat);
	};

	deleteMessage(message:Message){
		this.chats.get(message.chat.id)?.messages?.delete(message.id);
	}

	selectMessageForReply(message:Message){
		const chat = this.chats.get(message.chat.id);
		const chatCopy = Object.assign(Object.create(Object.getPrototypeOf(chat)), chat);

		if(chat){
			chatCopy.selectedMessageForReply = message;
			this.chats.set(chat.id, chatCopy);
		}
	};

	unselectMessageForReply(chatId:string){
		const chat = this.chats.get(chatId);
		if(chat){
			const chatCopy = Object.assign(Object.create(Object.getPrototypeOf(chat)), chat);
			chatCopy.selectedMessageForReply = null;
			this.chats.set(chat.id, chatCopy);
		}
	}
	private formatChatsFromApi(chats:IChatFromAPI[]):ObservableMap<string, IChat>{
		return observable.map<string, IChat>(chats.map(chat => [chat.id, new Chat(chat)]));
	};

}

export default new ChatsStore();
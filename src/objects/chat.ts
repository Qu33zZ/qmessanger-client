import { IChat } from "../interfaces/IChat";
import { IChatFromAPI } from "../interfaces/IChatFromAPI";
import { IMessage } from "../interfaces/IMessage";
import { IUser } from "../interfaces/IUser";
import { Message } from "./message";
import ChatsStore from "../store/chats.store";
import MessagesService from "../api/services/messages.service";
import { observable, ObservableMap } from "mobx";


export class Chat implements IChat{
	id:string;
	members:ObservableMap<string, IUser>;
	messages:ObservableMap<string, Message>;
	selectedMessageForReply:Message | null;
	createdAt:Date;

	constructor(chat:IChatFromAPI) {
		this.id = chat.id;
		this.members=observable.map<string, IUser>(chat.members.map(member => [member.id, member]));
		this.messages=observable.map<string, Message>(chat.messages.map(message => [message.id, new Message(message)]));
		this.createdAt=chat.createdAt;
		this.selectedMessageForReply = null;
	};


	setMessages(newMessages:IMessage[]){
		const formatedMessages = this.formatMessages(newMessages);
		this.messages = formatedMessages;
		ChatsStore.editChatMessages(this.id, formatedMessages);
	};

	private formatMessages(messages:IMessage[]):ObservableMap<string, Message>{
		return observable.map<string, Message>(messages.map(msg => [msg.id, new Message(msg)]));
	};

	async getMessages():Promise<IMessage[]>{
		const messages = await MessagesService.fetchMessages(this.id);
		return messages;
	};

	async sendMessage(content:string, replyTo?:string):Promise<void>{
		await MessagesService.sendMessage(this.id, content, replyTo);
		// if(result) this.addNewMessage(result);
	}

	addNewMessage(message:Message){
		this.messages.set(message.id, message);
		ChatsStore.editChatMessages(this.id, this.messages);
	}
}
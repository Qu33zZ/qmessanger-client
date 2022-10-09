import { IChat } from "../interfaces/IChat";
import { IChatFromAPI } from "../interfaces/IChatFromAPI";
import { IMessage } from "../interfaces/IMessage";
import { IUser } from "../interfaces/IUser";
import { Message } from "./message";
import ChatsStore from "../store/chats.store";
import MessagesService from "../api/services/messages.service";

export class Chat implements IChat{
	id:string;
	members:Map<string, IUser>;
	messages:Map<string, Message>;
	createdAt:Date;

	constructor(chat:IChatFromAPI) {
		this.id = chat.id;
		this.members=new Map<string, IUser>(chat.members.map(member => [member.id, member]));
		this.messages=new Map<string, Message>(chat.messages.map(message => [message.id, new Message(message)]));
		this.createdAt=chat.createdAt;
	};


	setMessages(newMessages:IMessage[]){
		const formatedMessages = this.formatMessages(newMessages);
		this.messages = formatedMessages;
		ChatsStore.editChatMessages(this.id, formatedMessages);
	};

	private formatMessages(messages:IMessage[]):Map<string, Message>{
		return new Map<string, Message>(messages.map(msg => [msg.id, new Message(msg)]));
	};

	async getMessages():Promise<IMessage[]>{
		const messages = await MessagesService.fetchMessages(this.id);
		return messages;
	};

	setActiveView(){
		// ChatsStore.setActiveChat(this);
	}
}
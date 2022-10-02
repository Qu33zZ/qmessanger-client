import { IMessage } from "../interfaces/IMessage";
import { IChat } from "../interfaces/IChat";
import { IUser } from "../interfaces/IUser";
import MessagesService from "../api/services/messages.service";
import ChatsStore from "../store/chats.store";

export class Message implements IMessage{
	id:string;
	author:IUser;
	content:string;
	chat:IChat;
	createdAt:Date;

	constructor(message:IMessage){
		this.id=message.id;
		this.author=message.author;
		this.content=message.content;
		this.chat=message.chat;
		this.createdAt=message.createdAt;
	}

	async delete(){
		await MessagesService.deleteMessage(this.id);
		ChatsStore.chats.get(this.chat.id)?.messages?.delete(this.id);
	};

	async edit(content:string){
		await MessagesService.deleteMessage(this.id);
		this.content=content;
	};
}

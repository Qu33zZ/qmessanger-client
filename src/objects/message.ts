import { IMessage } from "../interfaces/IMessage";
import { IChat } from "../interfaces/IChat";
import { IUser } from "../interfaces/IUser";
import MessagesService from "../api/services/messages.service";
import ChatsStore from "../store/chats.store";
import UserStore from "../store/user.store";

export class Message implements IMessage{
	id:string;
	author:IUser;
	content:string;
	chat:IChat;
	repliedToId:string;
	repliedTo:IMessage
	createdAt:Date;

	constructor(message:IMessage){
		this.id=message.id;
		this.author=message.author;
		this.content=message.content;
		this.chat=message.chat;
		this.createdAt=message.createdAt;
		this.repliedTo = message.repliedTo;
		this.repliedToId = message.repliedToId;
	}

	async delete(){
		if(this.author.id === UserStore.user?.id){
			await MessagesService.deleteMessage(this.id);
		}
		ChatsStore.deleteMessage(this);
	};

	async edit(content:string):Promise<void>{
		await MessagesService.deleteMessage(this.id);
		this.content=content;
	};

	selectForReply(){
		ChatsStore.selectMessageForReply(this);
	};
}

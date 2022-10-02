import { IChat } from "../interfaces/IChat";
import { IChatFromAPI } from "../interfaces/IChatFromAPI";
import { IMessage } from "../interfaces/IMessage";
import { IUser } from "../interfaces/IUser";
import { Message } from "./message";

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

	async getMessages(){

	}
}
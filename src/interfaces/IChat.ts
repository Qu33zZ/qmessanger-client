import { IUser } from "./IUser";
import { Message } from "../objects/message";
import ChatsStore from "../store/chats.store";
import { IMessage } from "./IMessage";

export interface IChat{
	id:string;
	members:Map<string, IUser>;
	messages:Map<string, Message>;
	createdAt:Date;
	getMessages():Promise<IMessage[]>;
	setActiveView():void;
}
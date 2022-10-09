import { IUser } from "./IUser";
import { Message } from "../objects/message";
import { IMessage } from "./IMessage";

export interface IChat{
	id:string;
	members:Map<string, IUser>;
	messages:Map<string, Message>;
	createdAt:Date;
	getMessages():Promise<IMessage[]>;
	setActiveView():void;
	setMessages(newMessages:IMessage[]):void;
}
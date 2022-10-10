import { IUser } from "./IUser";
import { Message } from "../objects/message";
import { IMessage } from "./IMessage";

export interface IChat{
	id:string;
	members:Map<string, IUser>;
	messages:Map<string, Message>;
	createdAt:Date;
	getMessages():Promise<IMessage[]>;
	setMessages(newMessages:IMessage[]):void;
	sendMessage(content:string):Promise<void>
	addNewMessage(message:Message):void;
}
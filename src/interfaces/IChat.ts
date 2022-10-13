import { IUser } from "./IUser";
import { Message } from "../objects/message";
import { IMessage } from "./IMessage";
import { ObservableMap } from "mobx";

export interface IChat{
	id:string;
	members:Map<string, IUser>;
	messages:ObservableMap<string, Message>;
	createdAt:Date;
	getMessages():Promise<IMessage[]>;
	setMessages(newMessages:IMessage[]):void;
	sendMessage(content:string):Promise<void>
	addNewMessage(message:Message):void;
}
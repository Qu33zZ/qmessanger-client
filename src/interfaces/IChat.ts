import { IUser } from "./IUser";
import { Message } from "../objects/message";
import { IMessage } from "./IMessage";
import { ObservableMap } from "mobx";

export interface IChat{
	id:string;
	members:ObservableMap<string, IUser>;
	messages:ObservableMap<string, Message>;
	createdAt:Date;
	selectedMessageForReply:Message | null;
	getMessages():Promise<IMessage[]>;
	setMessages(newMessages:IMessage[]):void;
	sendMessage(content:string, replyTo?:string):Promise<void>
	addNewMessage(message:Message):void;
}
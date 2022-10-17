import { IChat } from "./IChat";
import { IUser } from "./IUser";

export interface IMessage{
	id:string;
	author:IUser;
	content:string;
	chat:IChat;
	repliedToId:string;
	repliedTo:IMessage
	createdAt:Date;
	selectForReply():void;
	edit(newContent:string):Promise<void>;
}
import { IChat } from "./IChat";
import { IUser } from "./IUser";

export interface IMessage{
	id:string;
	author:IUser;
	content:string;
	chat:IChat;
	createdAt:Date;
}
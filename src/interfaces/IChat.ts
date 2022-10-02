import { IUser } from "./IUser";
import { Message } from "../objects/message";

export interface IChat{
	id:string;
	members:Map<string, IUser>;
	messages:Map<string, Message>;
	createdAt:Date;
}
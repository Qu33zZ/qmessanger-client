import { IUser } from "./IUser";
import { IMessage } from "./IMessage";

export interface IChatFromAPI{
	id:string;
	members:IUser[];
	messages:IMessage[];
	createdAt:Date;
}
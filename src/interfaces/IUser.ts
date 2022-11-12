export interface IUser{
	id:string;
	email:string;
	username:string;
	name:string;
	surname?:string;
	avatar?:string;
	verified:boolean;
	lastOnlineAt:Date | "online";
}
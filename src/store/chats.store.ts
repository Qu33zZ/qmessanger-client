import { makeAutoObservable } from "mobx";
import { IChat } from "../interfaces/IChat";

class ChatsStore{
	chats:Map<string, IChat> = new Map<string, IChat>();

	constructor() {
		makeAutoObservable(this, {}, {deep:true});
	};



}

export default new ChatsStore();
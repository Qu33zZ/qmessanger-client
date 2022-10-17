import { makeAutoObservable } from "mobx";
import { IUser } from "../interfaces/IUser";

class UserStore{
	user:IUser | null = null;

	constructor() {
		makeAutoObservable(this, {}, {deep:true});
	}

	login(user:IUser){
		this.user = user;
	}

	logout(){
		this.user = null;
	}

}

export default new UserStore();
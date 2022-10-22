import { $authorizedApi } from "../axios.auth.instance";
import { IUser } from "../../interfaces/IUser";

class UserService{
	async getMe():Promise<IUser | null>{
		try{
			const userResponse = await $authorizedApi.get<IUser>("/users/@me");
			if(userResponse.status === 200){
				return userResponse.data;
			}
			return null;
		}catch (e){
			console.log(e);
			return null;
		}
	};

	async editMe(name:string, surname:string):Promise<IUser | null>{
		try{
			const userResponse = await $authorizedApi.put<IUser>("/users/@me", {name, surname:surname || null});
			if(userResponse.status === 200){
				return userResponse.data;
			}
			return null;
		}catch (e){
			console.log(e);
			return null;
		}
	};

	async lookForUsersByUsername(username:string):Promise<IUser[]>{
		try{
			const usersResponse = await $authorizedApi.get<IUser[]>(`/users/${username}`);
			if(usersResponse.status === 200){
				return usersResponse.data;
			}
			return [];
		}catch{
			return [];
		}
	};
}

export default new UserService();
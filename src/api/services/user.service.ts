import { $authorizedApi } from "../axios.auth.instance";
import { IUser } from "../../interfaces/IUser";
import { IUpdateUserDTO } from "../../interfaces/update.user.dto";

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

	async editMe(newUser:IUpdateUserDTO):Promise<IUser | null>{
		try{
			let data: IUpdateUserDTO | FormData = newUser;
			if(newUser.avatar){
				data = new FormData();
				Object.keys(newUser).forEach((key:string, index:number) =>{
					const value = newUser[key as keyof IUpdateUserDTO];
					if(value) (data as FormData).append(key, value);
				});
			}
			const userResponse = await $authorizedApi.put<IUser>("/users/@me", data);
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
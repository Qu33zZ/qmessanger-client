import { IChat } from "../../interfaces/IChat";
import { $authorizedApi } from "../axios.auth.instance";

class ChatsService{
	async getChats():Promise<IChat[] | null>{
		try{
			const chatsResponse = await $authorizedApi.get<IChat[]>("/chats");
			if(chatsResponse.status === 200){
				return chatsResponse.data;
			}
			return null;
		}catch (e){
			console.log(e);
			return null;
		}
	}
}

export default new ChatsService();
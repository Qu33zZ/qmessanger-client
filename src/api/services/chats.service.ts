import { IChat } from "../../interfaces/IChat";
import { $authorizedApi } from "../axios.auth.instance";
import { IChatFromAPI } from "../../interfaces/IChatFromAPI";

class ChatsService{
	async getChats():Promise<IChatFromAPI[] | null>{
		try{
			const chatsResponse = await $authorizedApi.get<IChatFromAPI[]>("/chats");
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
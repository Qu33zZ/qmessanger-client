import { $authorizedApi } from "../axios.auth.instance";
import { IMessage } from "../../interfaces/IMessage";

class MessagesService{

	async fetchMessages(chatId:string):Promise<IMessage[]>{
		try{
			const messagesResult = await $authorizedApi.get<IMessage[]>(`/messages/channels/${chatId}`);
			if(messagesResult.status === 200) return messagesResult.data;
			return [];
		}catch (e){
			console.log(e);
			return [];
		}
	}
	async deleteMessage(id:string):Promise<void>{
		try{
			const result = await $authorizedApi.delete(`/messages/${id}`);
		}catch (e){
			console.log(e)
		}

	}
}

export default new MessagesService();
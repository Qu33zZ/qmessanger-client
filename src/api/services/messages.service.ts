import { $authorizedApi } from "../axios.auth.instance";
import { IMessage } from "../../interfaces/IMessage";
import { Message } from "../../objects/message";

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

	};

	async sendMessage(chatId:string, content:string):Promise<Message | null>{
		try{
			const result = await $authorizedApi.post<IMessage>(`/messages/channels/:${chatId}`);
			if(result.status === 201) return new Message(result.data);
			return null;
		}catch (e){
			return null;
			console.log(e)
		}
	};

	async updateMessage(messageId:string, newContent:string){
		try{
			const result = await $authorizedApi.put<IMessage>(`/messages/:${messageId}`, {content:newContent});
			if(result.status === 200) return new Message(result.data);
			return null;
		}catch (e){
			return null;
			console.log(e)
		}
	}


}

export default new MessagesService();
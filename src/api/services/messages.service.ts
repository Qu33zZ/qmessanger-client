import { $authorizedApi } from "../axios.auth.instance";

class MessagesService{
	async deleteMessage(id:string):Promise<void>{
		try{
			const result = await $authorizedApi.delete(`/messages/${id}`);
		}catch (e){
			console.log(e)
		}

	}
}

export default new MessagesService();
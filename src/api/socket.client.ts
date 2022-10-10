import { io } from "socket.io-client";
import { CONFIG } from "../config";
import { Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { IMessage } from "../interfaces/IMessage";
import { Message } from "../objects/message";
import ChatsStore from "../store/chats.store";

class SocketClient{
	readonly socket: Socket;
	constructor() {
		const accessToken = Cookies.get("accessToken");

		const SOCKET = io(CONFIG.api.server_url + CONFIG.api.socket_base_endpoint,
			{
				extraHeaders:{
					authorization:`Bearer ${accessToken}`
				}
			}
		);
		this.socket = SOCKET;

		this.setupEvents();
	}
	setupEvents(){
		this.socket.on("message", this.handleNewMessage);
	}

	async handleNewMessage(message:IMessage){
		const messageObject = new Message(message);
		const messageChannelInStore = ChatsStore.chats.get(messageObject.chat.id);
		if(messageChannelInStore) messageChannelInStore.addNewMessage(messageObject);
	};
}

export default SocketClient;
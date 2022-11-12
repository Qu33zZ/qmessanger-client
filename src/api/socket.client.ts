import { io } from "socket.io-client";
import { CONFIG } from "../config";
import { Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { IMessage } from "../interfaces/IMessage";
import { Message } from "../objects/message";
import ChatsStore from "../store/chats.store";
import { IChatFromAPI } from "../interfaces/IChatFromAPI";
import { toast } from "react-toastify";
import { runInAction } from "mobx";

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
		this.connect();
		this.setupEvents();
	};

	connect(){
		const id = toast.loading("Connecting to the server", {position:"top-center"});
		try{
			this.socket.connect();
			setTimeout(() =>{
				toast.update(id, { render: "Successfully connected to the server", type: "success", isLoading: false, closeButton:true, autoClose:1000, position:"top-center"});
				console.log("Connected");
			}, 1500);
		}catch{
			toast.update(id, { render: "Unable connect to the server", type: "error", isLoading: false, closeButton:true, autoClose:1000, position:"top-center"});	
		}

	};

	setupEvents(){
		this.socket.on("message", this.handleNewMessage);
		this.socket.on("messageDelete", this.handleMessageDelete);
		this.socket.on("chatCreate", this.handleNewChat);
		this.socket.on("disconnect", this.handleDisconnect);
		this.socket.on("userOnline", this.userGoToOnline);
		this.socket.on("userOffline", this.userGoToOffline)
	};

	handleDisconnect(){
		toast("Disconnected from the web server", {type:"warning", position:"top-center"});
	}

	async userGoToOnline(userId:string){
		console.log(`Now ${userId} is offline!`);
		for(const chat of ChatsStore.chats.values()){
			const member = Array.from(chat.members.values()).find(mem => mem.id === userId);
			if(member){
				runInAction(() =>{
					member.lastOnlineAt = "online";
				})
			}
			
		}
	}

	async userGoToOffline({userId, lastOnlineAt}:{userId:string, lastOnlineAt:Date}){
		for(const chat of ChatsStore.chats.values()){
			const member = Array.from(chat.members.values()).find(mem => mem.id === userId);
			if(member){
				runInAction(() =>{
					member.lastOnlineAt = lastOnlineAt;
				})
			}
			
		}
	}

	async handleNewMessage(message:IMessage){
		const messageObject = new Message(message);
		const messageChannelInStore = ChatsStore.chats.get(messageObject.chat.id);
		if(messageChannelInStore){
			runInAction(() =>{
				messageChannelInStore.addNewMessage(messageObject);
			})
		} 
	};

	async handleMessageDelete(message:IMessage){
		const messageObject = new Message(message);
		await messageObject.delete();
	}

	async handleNewChat(chat:IChatFromAPI){
		ChatsStore.addChat(chat);
	}
}

export default SocketClient;
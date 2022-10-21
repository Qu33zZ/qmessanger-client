import React, { useEffect, useState } from "react";
import Router from "./router";
import UserService from "./api/services/user.service";
import UserStore from "./store/user.store";
import Loader from "./ui/loader/loader";
import SocketClient from "./api/socket.client";

const App = () => {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() =>{
		const authorizeUsingAccessToken = async () =>{
			const user = await UserService.getMe();
			console.log("get me")
			if(user) return UserStore.login(user);
		};

		authorizeUsingAccessToken().finally(
			() => {
				setLoading(false);
				if(UserStore.user) new SocketClient();
			}
		);
	}, [])
	return (
		loading
			?   <Loader/>
			: <Router/>
	);
};

export default App;
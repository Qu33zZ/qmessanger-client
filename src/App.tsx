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
			if(user) UserStore.login(user);
		};
		authorizeUsingAccessToken().finally(
			() => {
				new SocketClient();
				setLoading(false);
			}
		);
	})
	return (
		loading
			?   <Loader/>
			: <Router/>
	);
};

export default App;
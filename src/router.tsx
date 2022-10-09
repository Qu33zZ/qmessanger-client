import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/main/main.page";
import UserProfilePage from "./pages/user.profile/user.profile.page";
import PhoneConfirmPage from "./pages/phone.confirm/phone.confirm.page";
import AuthPage from "./pages/auth/auth.page";
import ChatsPage from "./pages/chats/chats.page";
import ChatMessagesPage from "./pages/chat.messages.page/chat.messages.page";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainPage/>} path={"/start"}/>
				<Route element={<AuthPage/>} path={"/auth"}/>
				<Route element={<PhoneConfirmPage/>} path={"/phone-confirm"}/>
				<Route element={<UserProfilePage/>} path={"/profile"}/>
				<Route element={<ChatsPage/>} path={"/"}/>
				<Route element={<ChatMessagesPage/>} path={"/:chatId"}/>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
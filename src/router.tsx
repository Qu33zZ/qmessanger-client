import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/main/main.page";
import UserProfilePage from "./pages/user.profile/user.profile.page";
import PhoneConfirmPage from "./pages/phone.confirm/phone.confirm.page";
import AuthPage from "./pages/auth/auth.page";
import ChatsPage from "./pages/chats/chats.page";
import ChatMessagesPage from "./pages/chat.messages.page/chat.messages.page";
import PrivateRoute from "./components/private.route/private.route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<MainPage/>} path={"/start"}/>
				<Route element={<AuthPage/>} path={"/auth"}/>
				<Route element={<PhoneConfirmPage/>} path={"/email-confirm"}/>
				<Route element={<PrivateRoute children={<UserProfilePage/>}/>} path={"/profile"}/>
				<Route element={<PrivateRoute children={<ChatsPage/>}/>} path={"/"}/>
				<Route element={<PrivateRoute children={<ChatMessagesPage/>}/>} path={"/:chatId"}/>
			</Routes>
			<ToastContainer
				containerId={"main-container"}
				position="bottom-right"
				autoClose={5000}
				newestOnTop={true}
				closeOnClick
				pauseOnHover
				theme="dark"
			/>
		</BrowserRouter>
	);
};

export default Router;
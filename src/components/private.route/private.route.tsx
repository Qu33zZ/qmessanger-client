import React from "react";
import { PathRouteProps, Navigate, Route } from "react-router";
import UserStore from "../../store/user.store";

interface IPrivateRouteParams{
	children:React.ReactElement;
}

const PrivateRoute:React.FC<IPrivateRouteParams> = ({children}) => {
	const user = UserStore.user;
	if(!user){
		return <Navigate to={"/auth"}/>
	}
	return children;
};

export default PrivateRoute;
import { $api } from "../axios.default.instance";
import { ILoginResponse } from "../../interfaces/ILogin.response";

class AuthService{
	async login(email:string){
		try{
			const response = await $api.post("/auth/login", {email});
			if(response.status === 200){
				return response.data;
			}else return null;
		}catch (e){
			console.log(e);
			return null;
		}
	};

	//refresh access token
	async refresh():Promise<ILoginResponse | null>{
		try{
			const response = await $api.post("/auth/refresh");
			if(response.status === 200){
				return response.data;
			}else return null;
		}catch (e){
			console.log(e);
			return null;
		}
	}

	//confirm login using code from email-verification
	async confirmLogin(userId:string, code:string):Promise<ILoginResponse | null>{
		try {
			const response = await $api.post<ILoginResponse>(`/auth/confirmLogin/${userId}/${code}`);
			return response.data;
		}catch (e){
			console.log(e);
			return null;
		}
	};
}

export default new AuthService();
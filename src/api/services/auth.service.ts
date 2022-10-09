import { $api } from "../axios.default.instance";
import { ILoginResponse } from "../../interfaces/ILogin.response";

class AuthService{
	async login(phoneNumber:string){
		try{
			const response = await $api.post("/auth/login", {phoneNumber});
			if(response.status === 200){
				return response.data;
			}else return null;
		}catch (e){
			console.log(e);
			return null;
		}
	};

	async refresh(){
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
	//confirm login using code from sms-verification
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
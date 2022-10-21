import axios from "axios";
import Cookies from "js-cookie";
import authService from "./services/auth.service";
import { CONFIG } from "../config";

export const $authorizedApi = axios.create({
	baseURL:CONFIG.api.server_url + CONFIG.api.rest_base_endpoint,
	withCredentials:true
});

$authorizedApi.interceptors.request.use((reqConfig) =>{
	const token = Cookies.get("accessToken");
	if(token) reqConfig.headers = {...reqConfig.headers, authorization:`Bearer ${token}`};
	return reqConfig;
}, error => error)

$authorizedApi.interceptors.response.use(
	(data) => data,
	(error) => {
		const reqConfig = Object.assign({}, error.config);
		if(error?.response?.status === 401 && !reqConfig?.retried) {
			return new Promise((resolve, reject) =>{
				reqConfig.retried = true;
				authService.refresh().then((result)=>{
					console.log(result);
					if(result){
						Cookies.set("accessToken", result.session.accessToken);
						Cookies.set("refreshToken", result.session.refreshToken);
						$authorizedApi.request(reqConfig)
							.then(data => resolve(data))
					}else {
						reject("Can't refresh auth token")
					}
				})
			});
		}
		return Promise.reject(error)

	});

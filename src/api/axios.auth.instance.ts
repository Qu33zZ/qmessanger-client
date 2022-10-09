import axios from "axios";
import Cookies from "js-cookie";
import authService from "./services/auth.service";

export const $authorizedApi = axios.create({
	baseURL:"http://localhost:5000/api/",
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
		if (error?.response?.status === 401 && !reqConfig?.retried) {
			return new Promise((resolve, reject) =>{
				reqConfig.retried = true;
				authService.refresh().then((result)=>{
					Cookies.set("accessToken", result?.session?.accessToken);
					Cookies.set("refreshToken", result?.session?.refreshToken);
				    resolve($authorizedApi.request(reqConfig));
				});
			});
		}

		return Promise.reject(error)

	});

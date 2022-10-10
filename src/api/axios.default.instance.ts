import axios from "axios";
import { CONFIG } from "../config";

export const $api = axios.create({
	baseURL:CONFIG.api.server_url + CONFIG.api.rest_base_endpoint,
	withCredentials:true
})
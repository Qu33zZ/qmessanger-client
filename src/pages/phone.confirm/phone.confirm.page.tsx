import {useState, useRef, CompositionEvent, useEffect, ChangeEvent, SyntheticEvent} from 'react';
import womenSit from "../../assets/women_sit.png";
import boySit from "../../assets/boy_sit.png";
import BaseButton from "../../ui/base.button/base.button";
import "./email.confirm.styles.css";
import DotsInput from "../../components/input.dots/dots.input";
import { useNavigate } from "react-router";
import AuthService from "../../api/services/auth.service";
import UserStore from "../../store/user.store";
import Cookies from "js-cookie";

const PhoneConfirmPage = () => {
	const [userId, setUserId] = useState<string>();
	const [code, setCode] = useState<string>("");
	const navigate = useNavigate();

	const confirmLogin = async () =>{
		if(!userId || code.length === 0) return;

		const confirmedAuthResult = await AuthService.confirmLogin(userId, code);
		
		if(confirmedAuthResult){
			Cookies.set("accessToken", confirmedAuthResult.session.accessToken);
			Cookies.set("refreshToken", confirmedAuthResult.session.refreshToken);
			UserStore.login(confirmedAuthResult?.user);
			
			if(!confirmedAuthResult.user.verified){
				navigate("/profile");
			}else{
				navigate("/")
			} 
		}
	};

	useEffect(() =>{
		const authResult = new URLSearchParams(window.location.search);
		const userIdFromQuery = authResult.get("userId");

		if(!userIdFromQuery) return navigate("/auth");
		setUserId(userIdFromQuery);
	}, [])

	return (
		<div className={"base-page email-confirm-page"}>
			<h1 className={"page-title-name"}>QMessanger</h1>
			<p className={"email-description-text"}><span>Enter confirmation code</span><br/>We sent your login confirmation code to your email</p>
			<img src={womenSit} alt="Women" className={"women"}/>
			<img src={boySit} alt="Boy" className={"boy"}/>
			<div className={"email-confirm-code-area"}>
				<DotsInput value={code} setValue={setCode}/>
			</div>
			<BaseButton
				style={{margin:"auto auto 115px auto"}}
				onClick={confirmLogin}
			>
				Continue
			</BaseButton>
		</div>
	);
};

export default PhoneConfirmPage;
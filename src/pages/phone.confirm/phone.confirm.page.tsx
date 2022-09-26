import React, {useState, useRef, CompositionEvent, useEffect, ChangeEvent, SyntheticEvent} from 'react';
import womenSit from "../../assets/women_sit.png";
import boySit from "../../assets/boy_sit.png";
import BaseButton from "../../ui/base.button/base.button";
import "./phone.confirm.styles.css";
import DotsInput from "../../components/input.dots/dots.input";
import { useNavigate } from "react-router";
import AuthService from "../../api/services/auth.service";
import UserStore from "../../store/user.store";
import Cookies from "js-cookie";

const PhoneConfirmPage = () => {
	const [code, setCode] = useState<string>("");
	const [userId, setUserId] = useState<string>();

	const navigate = useNavigate();

	const confirmLogin = async () =>{
		if(!userId || code.length === 0) return;
		const confirmedAuthResult = await AuthService.confirmLogin(userId, code);
		if(confirmedAuthResult){
			Cookies.set("accessToken", confirmedAuthResult.session.accessToken);
			Cookies.set("refreshToken", confirmedAuthResult.session.refreshToken);
			UserStore.login(confirmedAuthResult?.user);
			navigate("/profile")
		}
		console.log(confirmedAuthResult)
	};

	useEffect(() =>{
		const authResult = new URLSearchParams(window.location.search);
		const codeToEnter = authResult.get('code');
		const userIdFromQuery = authResult.get("userId");
		if(!codeToEnter || !userIdFromQuery) return navigate("/auth");



		//while unavailable to send sms to user auth code returns from server we automatically
		//enter confirmation code from login response
		setCode(codeToEnter);
		setUserId(userIdFromQuery);

	}, [])

	return (
		<div className={"base-page"}>
			<h1 className={"page-title-name"}>QMessanger</h1>
			<p className={"phone-description-text"}><span>Enter confirmation code</span><br/>We have sent you an SMS with the code to +62 1309 - 1710 - 1920</p>
			<img src={womenSit} alt="Women" className={"women"}/>
			<img src={boySit} alt="Boy" className={"boy"}/>
			<div className={"phone-input-area"}>
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
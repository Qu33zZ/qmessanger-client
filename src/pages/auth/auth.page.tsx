import React, { useState } from "react";
import womenSit from "../../assets/women_sit.png";
import boySit from "../../assets/boy_sit.png";
import BaseButton from "../../ui/base.button/base.button";
import "./auth.page.styles.css";
import PhoneInput from "../../components/phone.code.dropdown/phone.input";
import { CountryMobileCodes } from "../../assets/country.mobile.codes";
import AuthService from "../../api/services/auth.service";
import { useNavigate } from "react-router";
import BaseInput from "../../ui/base.input/base.input";

const AuthPage = () => {
	const [email, setEmail] = useState<string>("");
	const navigate = useNavigate();

	const login = async () =>{
		if(email.length === 0) return;
		const loginResult = await AuthService.login(email);
		navigate(`/phone-confirm?&userId=${loginResult.userId}`);
	};

	return (
		<div className={"base-page main-page"}>
			<h1 className={"page-title-name"}>QMessanger</h1>
			<p className={"phone-description-text"}><span>Enter Your Phone Number</span><br/>Please confirm your country code and enter your phone number</p>
			<img src={womenSit} alt="Women" className={"women"}/>
			<img src={boySit} alt="Boy" className={"boy"}/>
			<div className={"email-input-area"}>
				<BaseInput
					placeholder={"Email"}
					onChange={(e) => setEmail(e.currentTarget.value)}
				/>
			</div>
			<BaseButton
				style={{margin:"auto auto 115px auto"}}
				onClick={login}
			>
				Continue
			</BaseButton>
		</div>
	);
};

export default AuthPage;
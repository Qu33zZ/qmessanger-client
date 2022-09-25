import React, { useState } from "react";
import womenSit from "../../assets/women_sit.png";
import boySit from "../../assets/boy_sit.png";
import BaseButton from "../../ui/base.button/base.button";
import "./auth.page.styles.css";
import PhoneInput from "../../components/phone.code.dropdown/phone.input";
import { CountryMobileCodes } from "../../assets/country.mobile.codes";
import AuthService from "../../api/services/auth.service";
import { useNavigate } from "react-router";

const AuthPage = () => {
	const [phone, setPhone] = useState<string>("");
	const [countryCode, setCountryCode] = useState<keyof typeof CountryMobileCodes>("+380");
	const navigate = useNavigate();

	const login = async () =>{
		if(phone.length === 0 || !countryCode) return;

		const loginResult = await AuthService.login(`${countryCode}${phone}`);
		navigate(`/phone-confirm?code=${loginResult.code}&userId=${loginResult.userId}`);
	};

	return (
		<div className={"base-page main-page"}>
			<h1 className={"page-title-name"}>QMessanger</h1>
			<p className={"phone-description-text"}><span>Enter Your Phone Number</span><br/>Please confirm your country code and enter your phone number</p>
			<img src={womenSit} alt="Women" className={"women"}/>
			<img src={boySit} alt="Boy" className={"boy"}/>
			<div className={"phone-input-area"}>
				<PhoneInput setPhone={setPhone} setCountryCode={setCountryCode} countryCode={countryCode}/>
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
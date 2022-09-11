import React from 'react';
import womenSit from "../../assets/women_sit.png";
import boySit from "../../assets/boy_sit.png";
import BaseButton from "../../ui/base.button/base.button";
import "./auth.page.styles.css";
import PhoneInput from "../../components/phone.code.dropdown/phone.input";

const AuthPage = () => {
	return (
		<div className={"base-page main-page"}>
			<h1 className={"page-title-name"}>QMessanger</h1>
			<p className={"phone-description-text"}><span>Enter Your Phone Number</span><br/>Please confirm your country code and enter your phone number</p>
			<img src={womenSit} alt="Women" className={"women"}/>
			<img src={boySit} alt="Boy" className={"boy"}/>
			<div className={"phone-input-area"}>
				<PhoneInput/>
			</div>
			<BaseButton
				style={{margin:"auto auto 115px auto"}}
			>
				Continue
			</BaseButton>
		</div>
	);
};

export default AuthPage;
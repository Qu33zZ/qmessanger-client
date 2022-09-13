import React, {useState, useRef, CompositionEvent, useEffect, ChangeEvent, SyntheticEvent} from 'react';
import womenSit from "../../assets/women_sit.png";
import boySit from "../../assets/boy_sit.png";
import BaseButton from "../../ui/base.button/base.button";
import "./phone.confirm.styles.css";
import DotsInput from "../../components/input.dots/dots.input";

const PhoneConfirmPage = () => {
	const [code, setCode] = useState<string>("");


	useEffect(() => console.log(code), [code])

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
			>
				Continue
			</BaseButton>
		</div>
	);
};

export default PhoneConfirmPage;
import React, {useState, ChangeEvent, useRef} from 'react';
import womenSit from "../../assets/women_sit.png";
import boySit from "../../assets/boy_sit.png";
import BaseButton from "../../ui/base.button/base.button";
import "./phone.confirm.styles.css";

const PhoneConfirmPage = () => {
	const [code, setCode] = useState<string>("");
	const inputRef = useRef<HTMLDivElement | null>(null);
	const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setCode(prevState => `${prevState}${e.target.value}`);
		if(!inputRef || !inputRef.current) return;
		console.log("Next")

		const inputs = Array.from(inputRef.current?.children);
		const index = inputs.indexOf(e.target);

		if(e.currentTarget.value.length === 1){

			// if(index === inputs.length-1) return e.currentTarget.blur();
			(inputs[index+1] as HTMLInputElement).focus();
		};
		if(e.currentTarget.value.length === 0){
			// if(index <= 0) return e.currentTarget.blur();
			(inputs[index-1] as HTMLInputElement).focus();
		}

	};

	return (
		<div className={"base-page"}>
			<h1 className={"page-title-name"}>QMessanger</h1>
			<p className={"phone-description-text"}><span>Enter confirmation code</span><br/>We have sent you an SMS with the code to +62 1309 - 1710 - 1920</p>
			<img src={womenSit} alt="Women" className={"women"}/>
			<img src={boySit} alt="Boy" className={"boy"}/>
			<div className={"phone-confirm-code--area"}>
				<div className={"dots-input"} ref={inputRef}>
					<input placeholder={'•'} maxLength={1} className={"dot-input"} onChange={handleInput}/>
					<input placeholder={'•'} maxLength={1} className={"dot-input"} onChange={handleInput}/>
					<input placeholder={'•'} maxLength={1} className={"dot-input"} onChange={handleInput}/>
					<input placeholder={'•'} maxLength={1} className={"dot-input"} onChange={handleInput}/>
					<input placeholder={'•'} maxLength={1} className={"dot-input"} onChange={handleInput}/>
					<input placeholder={'•'} maxLength={1} className={"dot-input"} onChange={handleInput}/>
				</div>

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
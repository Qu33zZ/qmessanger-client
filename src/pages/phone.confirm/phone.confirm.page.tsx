import React, {useState, useRef, CompositionEvent, useEffect, ChangeEvent, SyntheticEvent} from 'react';
import womenSit from "../../assets/women_sit.png";
import boySit from "../../assets/boy_sit.png";
import BaseButton from "../../ui/base.button/base.button";
import "./phone.confirm.styles.css";

const PhoneConfirmPage = () => {
	const [code, setCode] = useState<string>("");
	const inputRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => console.log(code), [code])

	const handleInput = (e:CompositionEvent<HTMLInputElement>) => {
		e.preventDefault();
		const currentInput = e.currentTarget;

		if(!inputRef || !inputRef.current) return e.preventDefault();

		const inputs = Array.from(inputRef.current?.children);
		const index = inputs.indexOf(e.currentTarget);

		if(index >= inputs.length-1) return;

		setCode(prevState => `${prevState}${e.nativeEvent.data}`);

		if(currentInput.value.length === 0) currentInput.value += e.nativeEvent.data;
		else if(currentInput.value.length >= 1){
			const nextInput = inputs[index+1] as HTMLInputElement;
			nextInput.value = e.nativeEvent.data;
			if(index < inputs.length-1) nextInput.focus();
		}

		if(currentInput.value.length === 0){
			setCode(prevState => `${prevState.slice(0, -1)}`);
			if(index > 0) (inputs[index-1] as HTMLInputElement).focus();
		};
	};

	return (
		<div className={"base-page"}>
			<h1 className={"page-title-name"}>QMessanger</h1>
			<p className={"phone-description-text"}><span>Enter confirmation code</span><br/>We have sent you an SMS with the code to +62 1309 - 1710 - 1920</p>
			<img src={womenSit} alt="Women" className={"women"}/>
			<img src={boySit} alt="Boy" className={"boy"}/>
			<div className={"phone-confirm-code--area"}>
				<div className={"dots-input"} ref={inputRef}>
					<input placeholder={'•'} maxLength={2} type={"number"} className={"dot-input"} onBeforeInput={handleInput}/>
					<input placeholder={'•'} maxLength={2} type={"number"} className={"dot-input"} onBeforeInput={handleInput}/>
					<input placeholder={'•'} maxLength={2} type={"number"} className={"dot-input"} onBeforeInput={handleInput}/>
					<input placeholder={'•'} maxLength={2} type={"number"} className={"dot-input"} onBeforeInput={handleInput}/>
					<input placeholder={'•'} maxLength={2} type={"number"} className={"dot-input"} onBeforeInput={handleInput}/>
					<input placeholder={'•'} maxLength={2} type={"number"} className={"dot-input"} onBeforeInput={handleInput}/>
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
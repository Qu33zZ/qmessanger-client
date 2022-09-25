import React, {ChangeEvent, CompositionEvent, useRef} from 'react';
import "./dots.input.styles.css";

interface IDotsInputProps{
	value:string;
	setValue:React.Dispatch<React.SetStateAction<string>>;
	inputsCount?:number;
};

const DotsInput:React.FC<IDotsInputProps> = ({value, setValue, inputsCount = 6}) => {
	const inputParentRef = useRef<HTMLDivElement | null>(null);

	const handleInput = (e:CompositionEvent<HTMLInputElement>) => {
		e.preventDefault();
		const currentInput = e.currentTarget;
		const numberRegexp = new RegExp(/[0-9]{1}/gi);
		if(!numberRegexp.test(e.data)) return;
		if(!inputParentRef.current) return e.preventDefault();

		const inputs = Array.from(inputParentRef.current?.children);
		const index = inputs.indexOf(e.currentTarget);

		if(index >= inputs.length-1) return;

		setValue(prevState => `${prevState}${e.nativeEvent.data}`);

		if(currentInput.value.length === 0) currentInput.value += e.nativeEvent.data;
		else if(currentInput.value.length >= 1){
			const nextInput = inputs[index+1] as HTMLInputElement;
			nextInput.value = e.nativeEvent.data;
			if(index < inputs.length-1) nextInput.focus();
		};
	};

	const handleDelete = (e:ChangeEvent<HTMLInputElement>) =>{
		if(e.currentTarget.value.length > 0) return;
		if(!inputParentRef.current) return;

		const inputs = Array.from(inputParentRef.current?.children);
		const index = inputs.indexOf(e.currentTarget);

		setValue((prevCode) => prevCode.slice(0, -1));

		if(index === 0) return;

		(inputs[index-1] as HTMLInputElement).focus();
	};


	return (
		<div className={"dots-input"} ref={inputParentRef}>
			{Array(inputsCount).fill(Math.random).map((item, index) => <input placeholder={'•'} maxLength={2} type={"number"} className={"dot-input"} value={value[index]} onBeforeInput={handleInput} onChange={handleDelete} key={index}/>)}
		</div>
	);
};

export default DotsInput;
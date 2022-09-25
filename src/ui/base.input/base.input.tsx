import React from "react";
import "./base.input.styles.css";

const BaseInput:React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = (props) => {
	return (
		<input className={"base-input"} {...props}/>
	);
};

export default BaseInput;
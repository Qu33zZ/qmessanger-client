import React from 'react';
import "./base.button.styles.css";

const BaseButton:React.FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = (props) => {
	return (
		<button className={"base-button"} {...props}>

		</button>
	);
};

export default BaseButton;
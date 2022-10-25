import React from "react";
import sprite from "../../assets/spite.svg";
import "./close.button.styles.css";

const CloseButton:React.FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = (props) => {
	return (
		<button className={"close-button"} {...props}>
			<svg>
				<use href={sprite+"#close"}/>
			</svg>
		</button>
	);
};

export default CloseButton;
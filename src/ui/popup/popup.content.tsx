import React from 'react';
import "./popup.content.styles.css";

interface IPopupContent{
	children:React.ReactNode | React.ReactNode[];
}

const PopupContent:React.FC<IPopupContent> = ({children}) => {
	return (
		<div className={"popup-content"} onClick={(e) =>{e.stopPropagation()}}>
			{children}
		</div>
	);
};

export default PopupContent;
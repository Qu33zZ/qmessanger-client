import React, {useState} from 'react';
import PopupContent from "./popup.content";
import "./popup.styles.css"

interface IPopupProps{
	opened:boolean,
	setOpened:React.Dispatch<React.SetStateAction<boolean>>;
	children:React.ReactNode | React.ReactNode[];
}

const Popup:React.FC<IPopupProps> = ({children, opened, setOpened}) => {
	const closePopup = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
		event.stopPropagation();
		setOpened(false);
	}
	return (
		<div className={`popup ${opened && "opened"}`} onClick={closePopup}>
			<PopupContent>
				{children}
			</PopupContent>
		</div>
	);
};

export default Popup;
import React, { SetStateAction, useEffect, useRef } from "react";
import { Message } from "../../objects/message";
import "./message.menu.styles.css";
import UserStore from "../../store/user.store";
import sprite from "../../assets/spite.svg";
import { IMessageMenuState } from "../chat.messages/chat.messages";

interface IMessageMenuProps{
	message:Message;
	xPos:number;
	yPos:number;
	setMessageMenu:React.Dispatch<SetStateAction<IMessageMenuState>>
};
const MessageMenu:React.FC<IMessageMenuProps> = ({message, yPos, xPos, setMessageMenu}) => {
	console.log("dispatch", typeof setMessageMenu)
	const menuRef = useRef<HTMLUListElement>(null);
	if(menuRef.current){
		const verticalMiddle =
			window.innerHeight -
			(menuRef.current.parentElement?.offsetHeight || 0) +
			(menuRef.current.parentElement?.offsetHeight || 0)/2;
		const horizontalMiddle = window.innerWidth -
			(menuRef.current.parentElement?.offsetWidth || 0) +
			(menuRef.current.parentElement?.offsetWidth || 0)/2;
		if(yPos > verticalMiddle) yPos -= menuRef.current.offsetHeight;
		if(xPos > horizontalMiddle) xPos -= menuRef.current.offsetWidth;
	}

	return (
		<ul ref={menuRef} className={"message-menu"} style={{top:yPos, left:xPos}}>
			{
				message.author.id === UserStore.user?.id &&
				<li
			        className={"message-menu-item"}
				    onClick={()=> {
					    message.delete();
					    setMessageMenu({ message:null, xPos:0, yPos:0})
				    }
				}>
				  <svg>
				    <use href={sprite+"#delete"}/>
				  </svg>
				  <p>Delete</p>
				</li>
			}
			<li className={"message-menu-item"}>
				<svg>
					<use href={sprite+"#delete"}/>
				</svg>
				<p>Copy text</p>
			</li>
			<li className={"message-menu-item"}>
				<svg>
					<use href={sprite+"#delete"}/>
				</svg>
				<p>Reply</p>
			</li>
		</ul>
	);
};

export default MessageMenu;
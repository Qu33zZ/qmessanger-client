import React, { SetStateAction, useEffect, useLayoutEffect, useRef } from "react";
import { Message } from "../../objects/message";
import "./message.menu.styles.css";
import UserStore from "../../store/user.store";
import sprite from "../../assets/spite.svg";
import { IMessageMenuState } from "../chat.messages/chat.messages";
import useOuterClick from "../../hooks/outerClick";

interface IMessageMenuProps{
	message:Message;
	xPos:number;
	yPos:number;
	setMessageMenu:React.Dispatch<SetStateAction<IMessageMenuState>>;
};

const MessageMenu:React.FC<IMessageMenuProps> = ({message, yPos, xPos, setMessageMenu}) => {
	const outerClickRef = useOuterClick(() => setMessageMenu(messageMenuState => ({...messageMenuState, message:null})));

	useLayoutEffect(() => {
		if (outerClickRef.current) {
			const verticalMiddle =
				window.innerHeight -
				(outerClickRef.current.parentElement?.offsetHeight || 0) +
				(outerClickRef.current.parentElement?.offsetHeight || 0)/2;
			const horizontalMiddle = window.innerWidth -
				(outerClickRef.current.parentElement?.offsetWidth || 0) +
				(outerClickRef.current.parentElement?.offsetWidth || 0)/2;
			if(yPos > verticalMiddle) yPos -= outerClickRef.current.offsetHeight;
			if(xPos > horizontalMiddle) xPos -= outerClickRef.current.offsetWidth;
		}
	}, []);
	if(outerClickRef.current){

	}

	return (
		<ul ref={outerClickRef} className={"message-menu"} style={{top:yPos, left:xPos}}>
			{
				message.author.id === UserStore.user?.id &&
				<li
			        className={"message-menu-item"}
				    onClick={()=> {
					    message.delete();
					    setMessageMenu({ message:null, xPos:0, yPos:0});
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
					<use href={sprite+"#copy"}/>
				</svg>
				<p>Copy text</p>
			</li>
			<li className={"message-menu-item"}
			    onClick={
					()=> {
						message.selectForReply();
						setMessageMenu({ message:null, xPos:0, yPos:0});
			        }
				}
			>
				<svg>
					<use href={sprite+"#reply"}/>
				</svg>
				<p>Reply</p>
			</li>
		</ul>
	);
};

export default MessageMenu;
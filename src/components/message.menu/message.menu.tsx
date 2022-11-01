import React, { SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Message } from "../../objects/message";
import "./message.menu.styles.css";
import UserStore from "../../store/user.store";
import sprite from "../../assets/spite.svg";
import { IMessageMenuState } from "../chat.messages/chat.messages";
import useOuterClick from "../../hooks/outerClick";
import { useAsObservableSource } from "mobx-react-lite";
import Loader from "../../ui/loader/loader";

interface IMessageMenuProps{
	message:Message;
	xPos:number;
	yPos:number;
	setMessageMenu:React.Dispatch<SetStateAction<IMessageMenuState>>;
};

const MessageMenu:React.FC<IMessageMenuProps> = ({message, yPos, xPos, setMessageMenu}) => {
	const outerClickRef = useOuterClick(() => setMessageMenu(messageMenuState => ({...messageMenuState, message:null})));
	const positionRef = useRef<{x:number, y:number}>({x:xPos, y:yPos});
	const [loaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		const verticalMiddle = window.innerHeight/2
		const horizontalMiddle = window.innerWidth/2;
		console.log("Vertical middle --- ", verticalMiddle, "Рorizontal middle --- ", horizontalMiddle)
		if(yPos > verticalMiddle) positionRef.current.y -= 125;
		if(xPos > horizontalMiddle) positionRef.current.x -= 200;
		setLoaded(true);
	});

	if(!loaded){
		return <></>;
	}
	return (
		<ul ref={outerClickRef} className={"message-menu"} style={{top:positionRef.current.y, left:positionRef.current.x}}>
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
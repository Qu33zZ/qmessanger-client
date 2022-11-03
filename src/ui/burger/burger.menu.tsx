import "./burger.menu.styles.css";

interface IMenuProps{
	opened:boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export const BurgerMenu:React.FC<IMenuProps> = ({opened, setOpened}) => {
	const handleMenuClick = () =>{
		setOpened((prevState) => !prevState);
	};

	return (
		<div onClick={handleMenuClick} className={`burger-menu ${opened && "active"}`}>
			<span/>
		</div>
	);
};

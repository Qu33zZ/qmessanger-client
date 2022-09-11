import React from 'react';
import "./main.page.styles.css";
import BaseButton from "../../ui/base.button/base.button";
import {useNavigate} from "react-router";
import womenSit from "../../assets/women_sit.png";
import boySit from "../../assets/boy_sit.png";

const MainPage = () => {
	const navigate = useNavigate();

	return (
		<div className={"base-page main-page"}>
			<h1 className={"page-title-name"}>QMessanger</h1>
			<p className={"description-text"}>Most modern messagner in the whole world</p>
			<img src={womenSit} alt="Women" className={"women"}/>
			<img src={boySit} alt="Boy" className={"boy"}/>

			<BaseButton
				onClick={(e) => {e.preventDefault(); navigate("/auth")}}
				style={{margin:"auto auto 115px auto"}}
			>
				Start messaging
			</BaseButton>
		</div>
	);
};

export default MainPage;
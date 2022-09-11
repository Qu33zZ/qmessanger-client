import React, {useState} from 'react';
import {CountryMobileCodes} from "../../assets/country.mobile.codes";
import "./phone.input.styles.css";

const PhoneInput =  () => {
	const [phone, setPhone] = useState<string>("");
	const [countryCode, setCountryCode] = useState<keyof typeof CountryMobileCodes>("+380");
	const [mobileCodesDropdownOpened, setMobileCodesDropdownOpened] = useState<boolean>(false);

	return (
		<div className={"phone-input-area"}>
			<button className={"phone-country-code-dropdown"} onClick={() => setMobileCodesDropdownOpened(prevState => !prevState)}>
				<p className="country-flag">{CountryMobileCodes[countryCode]}</p><p>{countryCode}</p>
				{
					mobileCodesDropdownOpened &&
                    <ul className={"mobile-codes-menu-list"}>
	                    {Object.keys(CountryMobileCodes).map((country) =>
		                    <li onClick={() => setCountryCode(country as keyof typeof CountryMobileCodes)}><p className={"country-flag"}>{CountryMobileCodes[country as keyof typeof CountryMobileCodes]}</p><p>{country}</p></li>
	                    )}
                    </ul>
				}
			</button>

			<input className={"phone-input"} type="tel" placeholder={"Phone Number"}/>
		</div>

	);
};

export default PhoneInput;
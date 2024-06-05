/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import Constant from "../../constant";
import { useTranslation } from "react-i18next";
import Translate from "../../component/Translate"

export default function RegisterStep1() {
    const history = useHistory()
    const parsed = queryString.parse(history?.location?.search);
    const [inputPhonenumber, setInputPhonenumber] = useState("")
    const { t, i18n } = useTranslation();
    const [inputPassword, setInputPassword] = useState("")
    const [inputFirstname, setInputFirstname] = useState("")
    const [inputLastname, setInputLastname] = useState("")
    const [inputRef, setInputRef] = useState(parsed?.ref)
    const [warningPhone, setWarningPhone] = useState("")
    const [warningPassword, setWarningPassword] = useState("")
    const [warningFirstName, setWarningFirstName] = useState("")
    const [warningLastName, setWarningLastName] = useState("")
    const [typePhone, setTypePhone] = useState("TH");
    const [placeholderText, setPlaceholderText] = useState(t("ThaiPhoneNumber"));
    const [phoneCheck, setPhoneCheck] = useState("")
    useEffect(() => {
        setPlaceholderText(t("ThaiPhoneNumber"))
    }, [t])

    const _clickNextStep = () => {
        if (inputPhonenumber === "") {
            setWarningPhone(t("EnterYourPhoneNumber"));
        } else if (inputPassword === "") {
            setWarningPassword(t("PleaseEnterYourPassword"));
        } else if (inputFirstname === "") {
            setWarningFirstName(t("PleaseEnterYourName"))
        } else if (inputLastname === "") {
            setWarningLastName(t("PleaseEnterLastYame"))
        } else {
            history.push(Constant.PAGE_REGISTER_STEP2, {
                inputPhonenumber,
                inputPassword,
                inputFirstname,
                inputLastname,
                inputRef
            })
        }

    }

    const handleChangePhone = useCallback((event) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            setInputPhonenumber(event?.target?.value)
        }
        if (event.target.value.length < 10 && typePhone === "TH") {
            setPhoneCheck(t("TelephoneNumber10"));
        } else {
            setPhoneCheck(t("PleaseEnterComplete13"));
        }
    });

    const handleChangePassword = useCallback((event) => {
        if (event.target.value.length < 4) {
            setWarningPassword(t("TheSecurityCode4"));
        } else {
            setWarningPassword("");
        }
        setInputPassword(event?.target?.value)

    });

    const _selectTypePhone = (type) => {
        if (type === "TH") {
            setPlaceholderText(t("ThaiPhoneNumber"))
        } else {
            setPlaceholderText(t("LaoPhoneNumber"))
        }
        setInputPhonenumber("")
        setTypePhone(type)
    }


    return (
        <div>
            <main className="register-page flexCenter">
                <a href={Constant?.LINK_WORDPRESS}>
                    <img
                        src="/assets/icons/home-icon.svg"
                        id="mobile-home-button"
                        alt="home-icon"
                    />
                </a>

                <img className="logo" style={{ width: 250 }} src={Constant?.LOGO_WEB} alt="logo" />

                <div className="progress-step-container flexCenter">
                    <div className="progress-step flexCenter">
                        <div className="step-active flexCenter">1</div>
                        <small>{t("account")}</small>
                    </div>
                    <hr />
                    <div className="progress-step flexCenter">
                        <div className="step flexCenter">2</div>
                        <small>{t("bankAccount")}</small>
                    </div>
                </div>
                <div className="text-container" style={{ textAlign: "center" }}>
                    <h3>{t("Register")}</h3>
                </div>
                <div className='register-form'>
                    <div className="phone-input">
                        <div className="input-container flexCenter">
                            <select onChange={(event) => _selectTypePhone(event.target?.value)} className="type-phone">
                                <option value={"TH"}>TH</option>
                                {/* <option value={"LA"}>LA</option> */}
                            </select>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                maxLength={typePhone === "TH" ? 10 : 13}
                                value={inputPhonenumber}
                                placeholder={placeholderText}
                                onChange={(event) => handleChangePhone(event)}
                            />
                        </div>
                    </div>
                    <span style={{ color: "red" }} >
                        {inputPhonenumber !== "" ? "" : warningPhone}
                        {inputPhonenumber !== "" ? typePhone === "TH" ?
                            (inputPhonenumber.length < 10 ? phoneCheck : "") :
                            (inputPhonenumber.length < 13 ? phoneCheck : "") : ""
                        }
                    </span>
                    <div className="phone-input">
                        <div className="input-container flexCenter">
                            <img src="/assets/icons/lock-alt.svg" alt="phone icon" />
                            <label htmlFor="phone" />
                            <input
                                name="password"
                                id="password"
                                type="password"
                                placeholder={t("PleaseEnterYourPassword")}
                                value={inputPassword}
                                onChange={(e) => handleChangePassword(e)}
                            />
                        </div>
                    </div>
                    <span style={{ color: "red" }}>{inputPassword !== "" ? warningPassword : warningPassword}</span>
                    <div className="phone-input">
                        <div className="input-container flexCenter">
                            <img src="/assets/icons/icons8-user-24.png" alt="user icon" />
                            <label htmlFor="s_firstname" />
                            <input
                                name="s_firstname"
                                id="s_firstname"
                                type="text"
                                placeholder={t("PleaseEnterYourName")}
                                onChange={(e) => setInputFirstname(e?.target?.value)}
                            />
                        </div>
                    </div>
                    <span style={{ color: "red" }}>{inputFirstname !== "" ? "" : warningFirstName}</span>
                    <div className="phone-input">
                        <div className="input-container flexCenter">
                            <img src="/assets/icons/icons8-user-24.png" alt="user icon" />
                            <label htmlFor="s_lastname" />
                            <input
                                name="s_lastname"
                                id="s_lastname"
                                type="text"
                                placeholder={t("PleaseEnterLastYame")}
                                onChange={(e) => setInputLastname(e?.target?.value)}
                            />
                        </div>
                    </div>
                    <span style={{ color: "red" }}>{inputLastname !== "" ? "" : warningLastName}</span>
                </div>

                <button type='button' onClick={() => _clickNextStep()} className="next-step-button">{t("Next")}</button>

                <p style={{ marginTop: 8, textAlign: "center" }}>
                    {t("YouAlreadyHaveAnAccount")}
                    <a href={Constant?.PAGE_LOGIN_MOBILE}>{t("Login")}</a>
                </p>
                <div>
                    <Translate />
                </div>
            </main >
        </div >
    )
}

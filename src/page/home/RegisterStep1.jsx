/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react'
import { useHistory } from "react-router-dom";
import queryString from "query-string";

import Constant from "../../constant";
export default function RegisterStep1() {
    const history = useHistory()
    const parsed = queryString.parse(history?.location?.search);


    const [inputPhonenumber, setInputPhonenumber] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [inputFirstname, setInputFirstname] = useState("")
    const [inputLastname, setInputLastname] = useState("")
    const [inputRef, setInputRef] = useState(parsed?.ref)
    const [warningPhone, setWarningPhone] = useState("")
    const [warningPassword, setWarningPassword] = useState("")
    const [warningFirstName, setWarningFirstName] = useState("")
    const [warningLastName, setWarningLastName] = useState("")

    const _clickNextStep = () => {
        if (inputPhonenumber === "") {
            setWarningPhone("กรุณากรอกเบอร์โทร");
        } else if (inputPassword === "") {
            setWarningPassword("กรุณาป้อนรหัสผ่าน");
        } else if (inputFirstname === "") {
            setWarningFirstName("กรุณาป้อนชื่อ")
        } else if (inputLastname === "") {
            setWarningLastName("กรุณาป้อนนามสกุล")
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
    });
    return (
        <div>
            <main className="register-page flexCenter">
                <a href={Constant?.HOME}>
                    <img
                        src="/assets/icons/home-icon.svg"
                        id="mobile-home-button"
                        alt="home-icon"
                    />
                </a>
                <img className="logo" src="/assets/images/newicon/TTcc-01.png" alt="logo" />

                <div className="progress-step-container flexCenter">
                    <div className="progress-step flexCenter">
                        <div className="step-active flexCenter">1</div>
                        <small>กรอกเบอร์</small>
                    </div>
                    <hr />
                    <div className="progress-step flexCenter">
                        <div className="step flexCenter">2</div>
                        <small>บัญชีธนาคาร</small>
                    </div>
                </div>
                <div className="text-container" style={{ textAlign: "center" }}>
                    <h3>สมัครสมาชิก</h3>
                </div>
                <div className="phone-input">
                    <div className="input-container flexCenter">
                        <img src="/assets/icons/phone.svg" alt="phone icon" />
                        <label for="phone" />
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            maxlength={20}
                            value={inputPhonenumber}
                            placeholder="เบอร์โทรศัพท์"
                            onChange={(event) => handleChangePhone(event)}
                        />
                    </div>
                    <span style={{ color: "red" }}>{inputPhonenumber !== "" ? "" : warningPhone}</span>
                </div>
                <div className="phone-input">
                    <div className="input-container flexCenter">
                        <img src="/assets/icons/lock-alt.svg" alt="phone icon" />
                        <label for="phone" />
                        <input
                            name="password"
                            id="password"
                            type="text"
                            placeholder="รหัสผ่าน"
                            onChange={(e) => setInputPassword(e?.target?.value)}
                        />
                    </div>
                </div>
                <span style={{ color: "red" }}>{inputPassword !== "" ? "" : warningPassword}</span>
                <div className="phone-input">
                    <div className="input-container flexCenter">
                        <img src="/assets/icons/icons8-user-24.png" alt="user icon" />
                        <label for="s_firstname" />
                        <input
                            name="s_firstname"
                            id="s_firstname"
                            type="text"
                            placeholder="ซื่อ"
                            onChange={(e) => setInputFirstname(e?.target?.value)}
                        />
                    </div>
                    <span style={{ color: "red" }}>{inputFirstname !== "" ? "" : warningFirstName}</span>
                </div>
                <div className="phone-input">
                    <div className="input-container flexCenter">
                        <img src="/assets/icons/icons8-user-24.png" alt="user icon" />
                        <label for="s_lastname" />
                        <input
                            name="s_lastname"
                            id="s_lastname"
                            type="text"
                            placeholder="นามสกุล"
                            onChange={(e) => setInputLastname(e?.target?.value)}
                        />
                    </div>
                    <span style={{ color: "red" }}>{inputLastname !== "" ? "" : warningLastName}</span>
                </div>
                <button type='button' onClick={() => _clickNextStep()} className="next-step-button">ถัดไป</button>
                <p style={{ marginTop: 8 }}>
                    คุณมีบัญชีอยู่แล้ว
                    <a href={Constant?.PAGE_LOGIN_MOBILE}>เข้าสู่ระบบ</a>
                </p>
            </main>
        </div>
    )
}

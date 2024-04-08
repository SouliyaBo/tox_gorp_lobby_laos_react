import React,{useState} from 'react'
import queryString from "query-string";

import { useHistory } from "react-router-dom";
import Constant from "../../constant";
export default function RegisterStep1() {
	const parsed = queryString.parse(history?.location?.search);

    const history = useHistory()

    const [inputPhonenumber, setInputPhonenumber] = useState()
	const [inputPassword, setInputPassword] = useState()
	const [inputFirstname, setInputFirstname] = useState()
	const [inputLastname, setInputLastname] = useState()
	const [inputRef, setInputRef] = useState(parsed?.ref)
    const _clickNextStep = () => {
        history.push(Constant.PAGE_REGISTER_STEP2,{
            inputPhonenumber,
            inputPassword,
            inputFirstname,
            inputLastname,
            inputRef
        })
    }
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

                <div className="banner">
                    <img src="/assets/images/login-banner.png" alt="login-banner" />
                </div>

                <div className="slide-game ">
                    <img src="/assets/images/login-game-1.png" alt="game" />
                    <img src="/assets/images/login-game-2.png" alt="game" />
                    <img src="/assets/images/login-game-3.png" alt="game" />
                </div>

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
                <div className="text-container" style={{textAlign: "center"}}>
                    <h3>สมัครสมาชิก</h3>
                </div>
                <div className="phone-input">
                    <div className="input-container flexCenter">
                        <img src="/assets/icons/phone.svg" alt="phone icon" />
                        <label for="phone" />
                        <input
                            name="phone"
                            id="phone"
                            type="text"
                            maxlength="13"
                            placeholder="เบอร์โทรศัพท์"
							onChange={(e) => setInputPhonenumber(e?.target?.value)}
                        />
                    </div>
                </div>
                <div className="phone-input">
                    <div className="input-container flexCenter">
                        <img src="/assets/icons/phone.svg" alt="phone icon" />
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
                <div className="phone-input">
                    <div className="input-container flexCenter">
                        <img src="/assets/icons/phone.svg" alt="phone icon" />
                        <label for="phone" />
                        <input
                            name="s_firstname"
                            id="s_firstname"
                            type="text"
                            placeholder="ซื่อ"
                            onChange={(e) => setInputFirstname(e?.target?.value)}
                        />
                    </div>
                </div>
                <div className="phone-input">
                    <div className="input-container flexCenter">
                        <img src="/assets/icons/phone.svg" alt="phone icon" />
                        <label for="phone" />
                        <input
                            name="s_lastname"
                            id="s_lastname"
                            type="text"
                            placeholder="นามสกุล"
                            onChange={(e) => setInputLastname(e?.target?.value)}
                        />
                    </div>
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

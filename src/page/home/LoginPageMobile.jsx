import React, { useState } from "react";
import constant from "../../constant";
import _LoginController from "../../api/login";

export default function LoginPageMobile() {
    const [userNameInput, setUserNameInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    const [messageCreate, setMessageCreate] = useState();

    const { handleLogin } = _LoginController();

    // ===== LoginController =====>
    const _Login = async () => {
        const _res = await handleLogin(userNameInput, passwordInput);
        if (_res) setMessageCreate(_res?.statusDesc);
    };

    return (
        <div>
            <main className="login-page flexCenter">
                <a href={constant?.HOME}>
                    <img
                        src="../assets/icons/home-icon.svg"
                        id="mobile-home-button"
                        alt="home-icon"
                    />
                </a>
                <img
                    className="logo"
                    src="/assets/images/newicon/TTcc-01.png"
                    alt="banner"
                />

                <h1>เข้าสู่ระบบ</h1>

                <div className="phone-input">
                    {/* <small>กรุณากรอก เบอร์โทรศัพท์</small> */}
                    <div className="input-container flexCenter">
                        <img src="/assets/icons/phone.svg" alt="phone icon" />
                        <label for="phone" />
                        <input
                            name="phone"
                            id="phone"
                            type="number"
                            maxlength="9"
                            placeholder="เบอร์โทรศัพท์"
                            onChange={(e) => setUserNameInput(e?.target?.value)}
                        />
                    </div>
                </div>
                <div className="phone-input">
                    {/* <small>กรุณากรอก รหัสผ่าน</small> */}
                    <div className="input-container flexCenter">
                        <img src="../assets/icons/lock-alt.svg" alt="lock icon" />
                        <label for="password" />
                        <input
                            name="password"
                            id="password"
                            type="password"
                            placeholder="กรอกรหัสผ่าน"
                            onChange={(e) => setPasswordInput(e?.target?.value)}
                        />
                    </div>
                </div>

                {/* <div className="suggest-info" style={{ marginBottom: 20 }}>
                    Password คือเลขบัญชีธนาคารที่ลูกค้าสมัครเลยนะคะ
                </div> */}
                <div style={{ padding: 10, color: "red" }}>{messageCreate}</div>
                <div className="button-container flexCenter">
                    {/* <a href={constant?.AFTER_LOGIN_MOBILE}>  */}
                    <button
                        type="button"
                        style={{ cursor: "pointer" }}
                        id="loginBtn"
                        onClick={() => _Login()}
                    >
                        เข้าสู่ระบบ
                    </button>
                    {/* </a> */}
                    {/* <a href={constant?.PAGE_REGISTER_STEP1}>  */}
                    <button type="button" style={{ cursor: "pointer" }} id="signupBtn">
                        สมัครสมาชิก
                    </button>
                    {/* </a> */}
                </div>

                <a href="/">พบปัญหาติดต่อเรา</a>
            </main>
        </div>
    );
}

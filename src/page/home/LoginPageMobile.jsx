import React from 'react'
import constant from "../../constant"

export default function LoginPageMobile() {
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

                <div className="banner">
                    <img src="/assets/images/login-banner.png" alt="login-banner" />
                </div>

                <div className="slide-game ">
                    <img src="/assets/images/login-game-1.png" alt="game" />
                    <img src="/assets/images/login-game-2.png" alt="game" />
                    <img src="/assets/images/login-game-3.png" alt="game" />
                </div>

                <h1>เข้าสู่ระบบ</h1>

                <div className="phone-input">
                    <small>กรุณากรอก เบอร์โทรศัพท์</small>
                    <div className="input-container flexCenter">
                        <img src="/assets/icons/phone.svg" alt="phone icon" />
                        <label for="phone" />
                        <input
                            name="phone"
                            id="phone"
                            type="text"
                            maxlength="9"
                            placeholder="เบอร์โทรศัพท์"
                        />
                    </div>
                </div>
                <div className="phone-input">
                    <small>กรุณากรอก รหัสผ่าน</small>
                    <div className="input-container flexCenter">
                        <img src="../assets/icons/lock-alt.svg" alt="lock icon" />
                        <label for="password" />
                        <input
                            name="password"
                            id="password"
                            type="password"
                            placeholder="กรอกรหัสผ่าน"
                        />
                    </div>
                </div>

                <div className="suggest-info" style={{ marginBottom: 20 }}>
                    Password คือเลขบัญชีธนาคารที่ลูกค้าสมัครเลยนะคะ
                </div>

                <div className="button-container flexCenter">
                    <button type='button' style={{ cursor: 'pointer' }} id="loginBtn">เข้าสู่ระบบ</button>
                    <a href={constant?.PAGE_REGISTER_STEP1}> <button type='button' style={{ cursor: 'pointer' }} id="signupBtn">สมัครสมาชิก</button></a>
                </div>

                <a href="/">พบปัญหาติดต่อเรา</a>
            </main>
        </div>
    )
}

import React from 'react'
import { useHistory } from "react-router-dom";
import constant from "../../constant"
export default function RegisterStep1() {
    const history = useHistory()
    const _clickNextStep = () => {
        console.log("AAAA")
        history.push("/")
    }
    return (
        <div>
            <main className="register-page flexCenter">
                <a href={constant?.HOME}>
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
                    {/* <!-- <hr />
                  <div className="progress-step flexCenter">
                      <div className="step flexCenter">3</div>
                      <small>สำเร็จ</small>
                  </div> --> */}
                </div>

                <div className="text-container">
                    <h3>สมัครสมาชิก</h3>
                    <p>กรอกเบอร์</p>
                </div>

                <div className="phone-input">
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
                <a href={constant?.PAGE_REGISTER_STEP2} >
                    <button type='button' onClick={() => _clickNextStep()} className="next-step-button">ถัดไป</button>
                </a>
                <p style={{ marginTop: 8 }}>
                    คุณมีบัญชีอยู่แล้ว
                    <a href={constant?.PAGE_LOGIN_MOBILE}>เข้าสู่ระบบ</a>
                </p>
            </main>
        </div>
    )
}

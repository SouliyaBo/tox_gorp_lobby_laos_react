import React, { useState, useEffect } from "react";
import constant from "../../constant";
import _LoginController from "../../api/login";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

export default function LoginPageMobile() {
    const history = useHistory();
    const [userNameInput, setUserNameInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    const [messageCreate, setMessageCreate] = useState();
    const [deviceType, setDeviceType] = useState(false);

    const { handleLogin } = _LoginController();
    useEffect(() => {
        let hasTouchScreen = false;
        if ("maxTouchPoints" in navigator) {
            hasTouchScreen = navigator.maxTouchPoints > 0;
        } else if ("msMaxTouchPoints" in navigator) {
            hasTouchScreen = navigator.msMaxTouchPoints > 0;
        } else {
            const mQ = window.matchMedia && matchMedia("(pointer:coarse)");
            if (mQ && mQ.media === "(pointer:coarse)") {
                hasTouchScreen = !!mQ.matches;
            } else if ("orientation" in window) {
                hasTouchScreen = true; // deprecated, but good fallback
            } else {
                // Only as a last resort, fall back to user agent sniffing
                const UA = navigator.userAgent;
                hasTouchScreen =
                    /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                    /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
            }
        }
        if (hasTouchScreen) {
            setDeviceType("MOBILE");
            // console.log("Mobile: ");
        } else {
            setDeviceType("DESKTOP");
            // console.log("Desktop: ");
        }


    }, []);
    // ===== LoginController =====>
    const _Login = async () => {
        const _res = await handleLogin(userNameInput, passwordInput, deviceType,
            (response) => {
                if (response === false) {
                    Swal.fire({
                        icon: 'success',
                        title: "สำเร็จ",
                        showConfirmButton: false,
                        timer: 2000,
                        background: '#242424', // Change to the color you want
                        color: '#fff',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: "ทำรายการไม่สำเร็จ",
                        showConfirmButton: false,
                        timer: 2000,
                        background: '#242424',
                        color: '#fff',
                    });
                }
            });
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
                    src="/assets/images/Logo.png"
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
                <div className="phone-input" style={{ marginTop: 18 }}>
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
                    <button type="button" style={{ cursor: "pointer" }} onClick={() => history.push(constant?.PAGE_REGISTER_STEP1)} id="signupBtn">
                        สมัครสมาชิก
                    </button>
                    {/* </a> */}
                </div>

                <a href="/">พบปัญหาติดต่อเรา</a>
            </main>
        </div>
    );
}

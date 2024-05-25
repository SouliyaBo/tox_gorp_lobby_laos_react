/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";

import Constant from "../../constant";
import _LoginController from "../../api/login";
import { BackList } from "../../constant/bankList";
import { convertBankCode } from "../../helper";
import Swal from 'sweetalert2'
export default function RegisterStep2() {
    const history = useHistory();

    const { handleRegister } = _LoginController();

    const [inputBank, setInputBank] = useState('');
    const [bankCode, setBankCode] = useState(0);
    const [messageCreate, setMessageCreate] = useState();
    const [deviceType, setDeviceType] = useState(false);
    const [textWarning, setTextWarning] = useState(false);

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

    const CreateUser = async (nameInBank) => {
        console.log("nameInBank:: ", nameInBank)
        const _res = await handleRegister(
            nameInBank,
            history?.location?.state?.inputLastname,
            history?.location?.state?.inputPhonenumber,
            history?.location?.state?.inputPassword,
            inputBank,
            bankCode.toString(),
            history?.location?.state?.inputRef,
            deviceType,
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
            }
        );
        if (_res) setMessageCreate(_res?.statusDesc);
    };

    const handleChangeBank = useCallback((event) => {
        console.log("first: ", event?.target?.value)
        setInputBank(event?.target?.value);
    });

    const checkBank = () => {
        const bankCodeText = convertBankCode(bankCode);
        let data = JSON.stringify({
            "bankCode": bankCodeText, // bankCode
            "recipientAcctNo": inputBank // "015120001557906001"
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://2ov8dxycl0.execute-api.ap-southeast-1.amazonaws.com/api/v1/check-number-account',
            headers: {
                'User-Agent': 'Dart/3.1 (dart:io)',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'close',
                'Content-Type': 'application/json'
            },
            data: data
        };
        //
        axios.request(config)
            .then((response) => {
                if (response.data.data.respDesc !== "Success") {
                    setTextWarning("ไม่มีเลขบัญชีนี้ในธนาคาร")
                    console.log(response.data.data);
                } else {
                    CreateUser(response.data.data.receipient)
                }
            })
            .catch((error) => {
                console.log(error);
            });
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
                <img
                    className="logo"
                    src={Constant?.LOGO_WEB}
                    alt="logo"
                />

                <div
                    className="progress-step-container flexCenter"
                    onClick={() => history.push(Constant.PAGE_REGISTER_STEP1)}
                    onKeyDown={() => ""}
                >
                    <div className="progress-step flexCenter">
                        <div className="step flexCenter">1</div>
                        <small>กรอกเบอร์</small>
                    </div>
                    <hr />
                    <div className="progress-step flexCenter">
                        <div className="step-active flexCenter">2</div>
                        <small>บัญชีธนาคาร</small>
                    </div>
                </div>

                <div className="text-container" style={{ textAlign: "center" }}>
                    <h3>สมัครสมาชิก</h3>
                </div>
                <div className="banking-list">
                    <div style={{ opacity: bankCode === 2 ? 1 : 0.5 }} className={bankCode === 2 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(2)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/scb2.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 1 ? 1 : 0.5 }} className={bankCode === 1 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(1)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/kbank1.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 3 ? 1 : 0.5 }} className={bankCode === 3 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(3)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/ktb3.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 4 ? 1 : 0.5 }} className={bankCode === 4 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(4)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/bbl4.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 5 ? 1 : 0.5 }} className={bankCode === 5 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(5)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/bay5.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 6 ? 1 : 0.5 }} className={bankCode === 6 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(6)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/tmb6.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 8 ? 1 : 0.5 }} className={bankCode === 8 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(8)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/gsb8.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 10 ? 1 : 0.5 }} className={bankCode === 10 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(10)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/uob10.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 11 ? 1 : 0.5 }} className={bankCode === 11 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(11)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/kk11.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 12 ? 1 : 0.5 }} className={bankCode === 12 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(12)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/lh12.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 13 ? 1 : 0.5 }} className={bankCode === 13 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(13)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/ibank13.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 14 ? 1 : 0.5 }} className={bankCode === 14 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(14)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/tisco14.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 15 ? 1 : 0.5 }} className={bankCode === 15 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(15)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/ghb16.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 16 ? 1 : 0.5 }} className={bankCode === 16 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(16)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/cimb17.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 18 ? 1 : 0.5 }} className={bankCode === 18 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(18)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/baac18.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 19 ? 1 : 0.5, }}>
                        <img
                            onClick={() => setBankCode(19)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/icons/icon-bank-active/icbc19.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 20 ? 1 : 0.5 }} className={bankCode === 20 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(20)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/images/bank/jdb.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 21 ? 1 : 0.5 }} className={bankCode === 21 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(21)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/images/bank/lvb.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 22 ? 1 : 0.5 }} className={bankCode === 22 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(22)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/images/bank/idb.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 23 ? 1 : 0.5 }} className={bankCode === 23 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(23)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/images/bank/stb.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 24 ? 1 : 0.5 }} className={bankCode === 24 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(24)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/images/bank/apb.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 25 ? 1 : 0.5 }} className={bankCode === 25 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(25)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/images/bank/ldb.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                    <div style={{ opacity: bankCode === 26 ? 1 : 0.5 }} className={bankCode === 26 ? "active-bank" : ""}>
                        <img
                            onClick={() => setBankCode(26)}
                            onKeyDown={() => ""}
                            className="bank-item"
                            src="/assets/images/bank/bcel.png"
                            id="bank1"
                            alt="icon"
                        />
                    </div>
                </div>
                <div className='register-form'>
                    <div className="phone-input">
                        <div className="input-container flexCenter" style={{ marginTop: 10 }}>
                            <label for="phone" />
                            <select
                                id="customSelect"
                                value={bankCode}
                                placeholder="เลขบัญชีธนาคาร"
                                onChange={(event) =>
                                    setBankCode(Number.parseInt(event?.target?.value))
                                }
                            >
                                <option>กรุณาเลือกธนาคารของคุณ</option>
                                {BackList?.map((bank) => (
                                    <option key={bank?.code} value={bank?.code}>
                                        {bank?.bankName}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div className="input-container flexCenter" style={{ marginTop: 18 }}>
                            <input
                                style={{ paddingLeft: 8 }}
                                name="bank"
                                id="bank"
                                type="text"
                                placeholder="เลขบัญชีธนาคาร"
                                onChange={(e) => handleChangeBank(e)}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ padding: 10, color: "red" }}>{textWarning}</div>
                <div style={{ padding: 10, color: "red" }}>{messageCreate}</div>

                <button
                    type="button"
                    className="next-step-button"
                    // data-bs-toggle="modal"
                    // data-bs-target="#successRegisterModal"
                    // onClick={() => CreateUser()}
                    onClick={() => checkBank()}
                >
                    ยืนยัน สมัครสมาชิก
                </button>

                <div
                    className="modal fade"
                    id="successRegisterModal"
                    tabindex="-1"
                    aria-labelledby="successRegisterModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-border">
                        <div className="modal-content">
                            <div className="modal-header-container">
                                <div className="modal-header">
                                    <p className="modal-title">สมัครสมาชิกสำเร็จ</p>
                                    <img
                                        src="../assets/icons/icon-close-modal.svg"
                                        className="modal-icon-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="register-success-modal-content">
                                    <div className="suggest-info">
                                        Password คือเลขบัญชีธนาคารที่ลูกค้าสมัครเลย
                                        ขอให้เล่นให้สนุกเฮงเฮงรวยรวยนะคะ
                                    </div>
                                    <div className="border-input-gold">
                                        <div className="register-info-content">
                                            <div className="register-info-group">
                                                <p className="register-info-text">Username:</p>
                                                <p className="register-info-text-bold">0181449403</p>
                                            </div>
                                            <div className="register-info-group">
                                                <p className="register-info-text">Password:</p>
                                                <p className="register-info-text-bold">0181449403</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="next-step-button btn-register-success"
                                        id="btn-register-success"
                                    >
                                        เข้าสู่ระบบ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

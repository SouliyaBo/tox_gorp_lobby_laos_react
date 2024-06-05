/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'
import Constant from "../../constant";
import _LoginController from "../../api/login";
import { BackList } from "../../constant/bankList";
import { convertBankCode } from "../../helper";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function RegisterStep2() {
    const history = useHistory();
    const { t } = useTranslation();

    const { handleRegister } = _LoginController();
    const [inputBank, setInputBank] = useState('');
    const [bankCode, setBankCode] = useState(0);
    const [messageCreate, setMessageCreate] = useState();
    const [deviceType, setDeviceType] = useState(false);
    const [textWarning, setTextWarning] = useState(false);
    const [bankNameOption, setBankNameOption] = useState(t('ChooseABank'));
    const [backgroundDropdown, setBackgroundDropdown] = useState('#FFF');

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
        const _res = await handleRegister(
            nameInBank === "" ? history?.location?.state?.inputFirstname : nameInBank,
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
                        title: t("Complete"),
                        showConfirmButton: false,
                        timer: 2000,
                        background: '#242424', // Change to the color you want
                        color: '#fff',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: t("UnsuccessfulTransaction"),
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
        setInputBank(event?.target?.value);
    });

    const checkBank = () => {
        const bankCodeText = convertBankCode(bankCode);
        if (bankCodeText === "NOT_BANK_LAOS") {
            CreateUser("")
        } else { }
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

        axios.request(config)
            .then((response) => {
                console.log("response.data.data.respDesc:: ", response.data.data.respDesc)
                if (response.data.data.respDesc !== "Success") {
                    if (bankCodeText !== "NOT_BANK_LAOS") {
                        setTextWarning("ไม่มีเลขบัญชีนี้ในธนาคาร")
                    }
                } else {
                    CreateUser(response.data.data.receipient)
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSelectBank = (event) => {
        setBankCode(event?.code)
        setBankNameOption(event?.bankName)
        setBackgroundDropdown(event?.backgroundColor)
    }
    const _selectImageBank = (bank) => {
        setBankCode(bank?.code)
        setBankNameOption(bank?.bankName)
        setBackgroundDropdown(bank?.backgroundColor)

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
                        <small>{t("Username")}</small>
                    </div>
                    <hr />
                    <div className="progress-step flexCenter">
                        <div className="step-active flexCenter">2</div>
                        <small>{t("bankAccount")}</small>
                    </div>
                </div>

                <div className="text-container" style={{ textAlign: "center" }}>
                    <h3>{t("Register")}</h3>
                </div>
                <div className="banking-list">
                    {BackList?.map((bank) => (
                        <div style={{ opacity: bankCode === bank?.code ? 1 : 0.5 }} className={bankCode === bank?.code ? "active-bank" : ""}>
                            <img
                                onClick={() => _selectImageBank(bank)}
                                onKeyDown={() => ""}
                                className="bank-item"
                                src={bank?.image}
                                id="bank1"
                                alt="icon"
                            />
                        </div>
                    ))}
                </div>
                <div className='register-form'>
                    <div className="phone-input">
                        <div className="input-container" style={{ marginTop: 10, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <Dropdown style={{ margin: 0, height: 40 }}>
                                <Dropdown.Toggle
                                    align="start"
                                    style={{
                                        border: `1px solid ${backgroundDropdown}`,
                                        background: `linear-gradient(90deg, ${backgroundDropdown} 0%, rgb(17, 17, 17) 100%)`, width: 310, color: bankCode === 6 ? "#000" : "#FFF"
                                    }}>
                                    {bankNameOption}
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ overflow: "scroll", height: 300 }}>
                                    {BackList?.map((bank) => (
                                        <Dropdown.Item
                                            onClick={() => handleSelectBank(bank)}
                                            style={{
                                                color: "#FFF",
                                                height: 45,
                                                display: "flex",
                                                alignItems: "center",
                                                background: `linear-gradient(90deg, ${bank?.backgroundColor} 0%, rgb(17, 17, 17) 100%)`
                                            }}>
                                            <img style={{ width: 35, height: 35, marginRight: 18 }} src={bank?.image} id="bank1" alt="icon" />
                                            {bank?.bankName}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="input-container flexCenter" style={{ marginTop: 18 }}>
                            <input
                                style={{ paddingLeft: 8 }}
                                name="bank"
                                id="bank"
                                type="text"
                                placeholder={t("bankAccountNumber")}
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

                    onClick={() => checkBank()}
                >
                    {t("confirm")}
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
            </main >
        </div >
    );
}

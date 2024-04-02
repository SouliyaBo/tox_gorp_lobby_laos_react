import React from 'react'
import constant from "../../constant"
export default function RegisterStep2() {
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

                <div className="progress-step-container flexCenter">
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

                <div className="text-container">
                    <h3>สมัครสมาชิก</h3>
                    <p>กรอกเลขบัญชี</p>
                </div>

                <div className="banking-list" />

                <div className="phone-input">
                    <div className="input-container flexCenter">
                        <img src="../assets/icons/bank-icon.svg" alt="phone icon" />
                        <label for="phone" />
                        <input
                            name="phone"
                            id="phone"
                            type="text"
                            maxlength="9"
                            placeholder="เลขบัญชีธนาคาร"
                        />
                    </div>
                </div>

                <button type='button' className="next-step-button" data-bs-toggle="modal" data-bs-target="#successRegisterModal">ยืนยัน สมัครสมาชิก</button>

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
                                        Password คือเลขบัญชีธนาคารที่ลูกค้าสมัครเลย ขอให้เล่นให้สนุกเฮงเฮงรวยรวยนะคะ
                                    </div>
                                    <div className="border-input-gold">
                                        <div className="register-info-content">
                                            {/* <!-- <p className="register-info-title">ข้อมูลสมัคร</p> --> */}
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

                                    {/* <!-- <div className="suggest-info">
                                      รหัสคือเลขบัญชีธนาคารที่ลูกค้าสมัครเลยนะคะ ขอให้เล่นให้สนุกเฮงเฮงรวยรวยนะคะลูกค้า
                                  </div> --> */}

                                    <button type='button' className="next-step-button btn-register-success" id="btn-register-success">เข้าสู่ระบบ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

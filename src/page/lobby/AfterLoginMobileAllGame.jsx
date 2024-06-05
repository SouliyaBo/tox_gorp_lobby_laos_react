import React, { useState, useRef, useEffect } from 'react'
import { _clickTabDeposit } from "../../helper"
import Sidebar from "../../component/Sidebar";

export default function AfterLoginMobileAllGame() {
  const [content, setContent] = useState(Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`))
  const sidebarUseRef = useRef(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarAnimation, setSidebarAnimation] = useState(true);
  const [tabs, setTabs] = useState("ประวัติฝาก");
  const [tabName, setTabName] = useState("tab-deposit");


  const toggleSidebar = (event) => {
    event.stopPropagation();
    setSidebarVisible(true);
    setSidebarAnimation(true);
  };

  const closeSidebar = () => {
    setSidebarAnimation(false);
    setTimeout(() => {
      setSidebarVisible(false);
    }, 500);
  };

  return (
    <div>
      <main className="after-login-mobile-page">
        <header className="header flexBetween">
          <div className="left">
            <img
              onClick={(event) => toggleSidebar(event)} onKeyDown={() => ''}
              className="hamburger"
              src="../assets/images/icon-hamburger.svg"
              alt="hamburger icon"
            />
          </div>
          <div className="right">
            <div className="balance-container">
              <div className="balance">
                <div className="icon flexCenter">
                  <img src="../assets/icons/user-outline-white.svg" alt="icon" />
                </div>
                <div className="balance-text">
                  <p>0222646822</p>
                </div>
              </div>
              <div className="balance">
                <div className="icon flexCenter">
                  <img
                    src="../assets/icons/wallet-outline-white.svg"
                    alt="icon"
                  />
                </div>
                <div className="balance-text">
                  <p>0.00</p>
                </div>
              </div>
            </div>
            <div className="system-option flexCenter">
              <img
                className="thai-logo"
                src="../assets/images/logo-thai.svg"
                alt="thai logo"
              />
              <div className="logout-btn">
                <img src="../assets/icons/power-off.svg" alt="logout icon" />
                <p>ล็อกเอาท์</p>
              </div>
            </div>
          </div>
        </header>

        <div className="brand">
          <div className="slideshow-container-after-login">
            <div className="mySlides fade-slide">
              <img src="/assets/images/Cardgame/image 70.png" style={{ width: "100%" }} alt='' />
            </div>

            <a href='/#' className="prev" onclick="plusSlides(-1)">❮</a>
            <a href='/#' className="next" onclick="plusSlides(1)">❯</a>
          </div>

          <div style={{ textAlign: "center" }}>
            <span className="dot" onclick="currentSlide(1)" />
            <span className="dot" onclick="currentSlide(2)" />
            <span className="dot" onclick="currentSlide(3)" />
          </div>
        </div>
        <div style={{ height: "15px" }} />
        <div className="marquee-container">
          {/* biome-ignore lint/a11y/noDistractingElements: <explanation> */}
          <marquee className="description">
            เว็บตรง ไม่ผ่านเอเย่นต์ อันดับ 1 ฝาก-ถอน ไม่มีขั้นต่ำ ถอนสูงสุดวันละ
            100 ล้าน สล็อต บาคาร่า หวย กีฬา มีครบจบที่เดียว
          </marquee>
        </div>
        <section className="featured-game-wrapper" id="mobile-after-login">
          <div className="featured-game flexBetween">
            <img src="/assets/images/newicon/iconnew-01.png" alt="game icon" />
            <p>สล็อต</p>
          </div>
          <div className="featured-game flexBetween">
            <img src="/assets/images/newicon/iconnew-02.png" alt="game icon" />
            <p>คาสิโน</p>
          </div>
          <div className="featured-game flexBetween">
            <img src="/assets/images/newicon/iconnew-03.png" alt="game icon" />
            <p>ยิงปลา</p>
          </div>
          <div className="featured-game flexBetween">
            <img src="/assets/images/newicon/iconnew-04.png" alt="game icon" />
            <p>ป็อกเด้ง</p>
          </div>
          <div className="featured-game flexBetween">
            <img src="/assets/images/newicon/iconnew-05.png" alt="game icon" />
            <p>กีฬา</p>
          </div>
          <div className="featured-game flexBetween">
            <img src="/assets/images/newicon/iconnew-06.png" alt="game icon" />
            <p>เกมกราฟ</p>
          </div>
        </section>

        <section className="specific-all-games">
          {content.map((item, index) => (
            <div className="playing-mobile">
              <a
                href="/#"
                target="_blank"
                className="game-name"
                rel="noopener noreferrer"
              >
                เล่นเลย
              </a>
              <img
                src="../assets/images/image 45.png"
                alt="game logo"
              />
            </div>
          ))}
        </section>

        <footer className="footer">
          <div className="menu-wrapper">
            <button type='button' className="footer-item flexCenter">
              <img src="/assets/icons/home.svg" alt="login" />
              <p>หน้าหลัก</p>
            </button>
            <button
              type='button'
              className="footer-item flexCenter"
              data-bs-toggle="modal"
              data-bs-target="#promotionModal"
              data-bs-dismiss="modal"
            >
              <img src="/assets/icons/gift.svg" alt="login" />
              <p>โปรโมชั่น</p>
            </button>
            <button
              type='button'
              data-bs-toggle="modal"
              data-bs-target="#depositWithdraw"
              className="footer-item flexCenter"
            >
              <img src="/assets/icons/return-money.svg" alt="login" />
              <p>ฝาก-ถอน</p>
            </button>
            <button
              type='button'
              className="footer-item flexCenter"
              data-bs-toggle="modal"
              data-bs-target="#bagModal"
            >
              <img src="/assets/icons/money-bag.svg" alt="login" />
              <p>กระเป๋า</p>
            </button>
            <button type='button' className="footer-item flexCenter">
              <img src="/assets/icons/gain-money.svg" alt="login" />
              <p>รับทรัพย์</p>
            </button>
          </div>
        </footer>

        {/* <!-- Side Bar --> */}
        {sidebarVisible ? (
          <Sidebar sidebarUseRef={sidebarUseRef} sidebarAnimation={sidebarAnimation} closeSidebar={closeSidebar} setSidebarAnimation={setSidebarAnimation} setSidebarVisible={setSidebarVisible} sidebarVisible={sidebarVisible} />
        ) : (
          ""
        )}
        {/* <!-- Modal --> */}
        {/* <!-- start profile --> */}
        <div
          className="modal fade"
          id="profile"
          tabindex="-1"
          aria-labelledby="profile"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-border">
                <div className="modal-content">
                  <div className="modal-header-container">
                    <div className="modal-header">
                      <img
                        src="/assets/icons/icon-back-modal.svg"
                        className="modal-icon-back"
                        alt=""
                        data-bs-toggle="modal"
                        data-bs-dismiss="modal"
                      />
                      <p className="modal-title">โปรไฟล์</p>
                      <img
                        src="/assets/icons/icon-close-modal.svg"
                        className="modal-icon-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="modal-body">
                    <div className="change-profile-modal-content-mobile flexCenter">
                      <div className="card flexBetween">
                        <div className="left">
                          <p>ธนาคารกสิกรไทย</p>
                          <p>นาย xxxxx xxxxx</p>
                          <p>026-999999-9</p>
                        </div>
                        <div className="right">
                          <div className="bank">
                            <p>Kbank</p>
                            <img
                              src="/assets/icons/icon-bank-default/Ellipse 10.svg"
                              alt="bank logo"
                            />
                          </div>
                          <div className="balance">
                            <small>ยอดคงเหลือในระบบ</small>
                            <p>1000.00 บาท</p>
                          </div>
                          <div className="visa">
                            <img src="/assets/icons/visa.svg" alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="slider-container" style={{
                        display: 'flex',
                        justifyContent: 'center'
                      }}>
                        <div className="active-slider" />
                        <div className="slider" />
                      </div>
                      <div className="button-container flexCenter">
                        <div className="left flexCenter">ตั้งเป็นบัญชีหลัก</div>
                        <div
                          className="right flexCenter"
                          data-bs-toggle="modal"
                          data-bs-target="#addAccount"
                        >
                          เพิ่มบัญชี
                        </div>
                      </div>
                      <hr />
                      <div className="user-detail flexBetween">
                        <div className="left">
                          <p>Username</p>
                          <p>Password</p>
                        </div>
                        <div className="right">
                          <small>st1745562156</small>
                          <small>************</small>
                        </div>
                      </div>
                      <button type='button' className="change-password-container flexCenter">
                        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="51"
                          height="51"
                          viewBox="0 0 51 51"
                          fill="none"
                        >
                          <path
                            d="M25.033 21.7165C24.4104 21.0943 23.4014 21.0945 22.779 21.7171C22.1568 22.3397 22.157 23.3487 22.7796 23.9711L24.309 25.4996L22.7794 27.0294C22.157 27.6518 22.157 28.6607 22.7794 29.2832C23.4018 29.9056 24.4108 29.9056 25.0332 29.2832L26.5634 27.7529L28.0921 29.281C28.7148 29.9032 29.7237 29.903 30.3461 29.2804C30.9683 28.658 30.9681 27.6488 30.3455 27.0266L28.8174 25.4992L30.3457 23.9707C30.9681 23.3482 30.9681 22.3393 30.3457 21.7169C29.7233 21.0944 28.7143 21.0944 28.0919 21.7169L26.563 23.2458L25.033 21.7165Z"
                            fill="white"
                          />
                          <path
                            d="M11.0915 21.7171C11.7138 21.0945 12.7229 21.0943 13.3454 21.7165L14.8754 23.2458L16.4043 21.7169C17.0267 21.0944 18.0358 21.0944 18.6582 21.7169C19.2806 22.3393 19.2806 23.3482 18.6582 23.9707L17.1298 25.4992L18.6579 27.0266C19.2805 27.6488 19.2807 28.658 18.6585 29.2804C18.0362 29.903 17.0271 29.9032 16.4046 29.281L14.8759 27.7529L13.3457 29.2832C12.7233 29.9056 11.7142 29.9056 11.0918 29.2832C10.4694 28.6607 10.4694 27.6518 11.0918 27.0294L12.6215 25.4996L11.0921 23.9711C10.4695 23.3487 10.4693 22.3397 11.0915 21.7171Z"
                            fill="white"
                          />
                          <path
                            d="M35.0625 28.6875C34.1823 28.6875 33.4688 29.4011 33.4688 30.2812C33.4688 31.1614 34.1823 31.875 35.0625 31.875H38.7812C39.6614 31.875 40.375 31.1614 40.375 30.2812C40.375 29.4011 39.6614 28.6875 38.7812 28.6875H35.0625Z"
                            fill="white"
                          />
                          <path
                            d="M11.1546 10.625C7.33975 10.625 4.25 13.7177 4.25 17.5312V33.4688C4.25 37.2829 7.34202 40.375 11.1562 40.375H39.8438C43.6579 40.375 46.75 37.2829 46.75 33.4688V17.5312C46.75 13.7177 43.6602 10.625 39.8454 10.625H11.1546ZM7.4375 17.5312C7.4375 15.4768 9.10144 13.8125 11.1546 13.8125H39.8454C41.8986 13.8125 43.5625 15.4768 43.5625 17.5312V33.4688C43.5625 35.5226 41.8976 37.1875 39.8438 37.1875H11.1562C9.10244 37.1875 7.4375 35.5226 7.4375 33.4688V17.5312Z"
                            fill="white"
                          />
                        </svg>
                        <p>เปลี่ยนรหัสผ่าน</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end profile --> */}

        {/* <!-- start  modal add account --> */}
        <div
          className="modal fade"
          id="addAccount"
          tabindex="-1"
          aria-labelledby="addAccount"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-border">
                <div className="modal-content">
                  <div className="modal-header-container">
                    <div className="modal-header">
                      <img
                        src="/assets/icons/icon-back-modal.svg"
                        className="modal-icon-back"
                        alt=""
                        data-bs-toggle="modal"
                        data-bs-dismiss="modal"
                      />
                      <p className="modal-title" id="addAccount">เพิ่มบัญชี</p>
                      <img
                        src="/assets/icons/icon-close-modal.svg"
                        className="modal-icon-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="modal-body">
                    <div className="add-account-content flexCenter">
                      <div className="bank-section">
                        <p>กรุณาเลือกธนาคาร</p>
                        <div className="bank-list">
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 10.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 11.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 12.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 13.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 14.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 15.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 16.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 17.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 18.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 19.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 20.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 21.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 22.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 23.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 24.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 25.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 26.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 27.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 28.svg"
                            alt=""
                            className="bank-icon"
                          />
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 29.svg"
                            alt=""
                            className="bank-icon"
                          />
                        </div>
                      </div>

                      <div className="bank-number">
                        <p>กรุณากรอกเลขบัญชี</p>
                        <div className="bank-number-input flexCenter">
                          <div className="icon">
                            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <g clip-path="url(#clip0_912_2229)">
                                <path
                                  d="M1.6665 16.6665H18.3332V18.3332H1.6665V16.6665ZM3.33317 9.99984H4.99984V15.8332H3.33317V9.99984ZM7.49984 9.99984H9.1665V15.8332H7.49984V9.99984ZM10.8332 9.99984H12.4998V15.8332H10.8332V9.99984ZM14.9998 9.99984H16.6665V15.8332H14.9998V9.99984ZM1.6665 5.83317L9.99984 1.6665L18.3332 5.83317V9.1665H1.6665V5.83317ZM9.99984 6.6665C10.2209 6.6665 10.4328 6.57871 10.5891 6.42243C10.7454 6.26615 10.8332 6.05418 10.8332 5.83317C10.8332 5.61216 10.7454 5.4002 10.5891 5.24392C10.4328 5.08764 10.2209 4.99984 9.99984 4.99984C9.77882 4.99984 9.56686 5.08764 9.41058 5.24392C9.2543 5.4002 9.1665 5.61216 9.1665 5.83317C9.1665 6.05418 9.2543 6.26615 9.41058 6.42243C9.56686 6.57871 9.77882 6.6665 9.99984 6.6665Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_912_2229">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <input type="number" placeholder="เลขบัญชีธนาคาร" />
                        </div>
                      </div>

                      <button type='button' className="button-warning">ยืนยัน</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end  modal add account --> */}

        {/* <!-- start  modal ฝาก - ถอน --> */}
        <div
          className="modal fade"
          id="depositWithdraw"
          tabindex="-1"
          aria-labelledby="depositWithdraw"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      data-bs-toggle="modal"
                      data-bs-target="#bagModal"
                      alt=""
                    />
                    <p className="modal-title" id="depositWithdraw">ฝาก - ถอน</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="deposit-withdraw-modal-content">
                    <div className="card flexBetween">
                      <div className="left flexCenter">
                        <p>ธนาคารกสิกรไทย</p>
                        <p>นาย xxxxx xxxxx</p>
                        <p>026-999999-9</p>
                      </div>
                      <div className="right flexCenter">
                        <div className="flexCenter bank">
                          <h4>KBank</h4>
                          <div style={{
                            backgroundColor: '#fff',
                            borderRadius: '100%'
                          }}>
                            <img src="/assets/images/kbank 1.png" alt="kbank" />
                          </div>
                        </div>
                        <div className="balance">
                          <p>ยอดคงเหลือในระบบ</p>
                          <p>1000.00 บาท</p>
                        </div>
                        <div className="visa">
                          <img src="/assets/icons/visa.svg" alt="visa" />
                        </div>
                      </div>
                    </div>

                    <div className="slider-wrapper flexCenter">
                      <div className="active slider" />
                      <div className="slider" />
                    </div>

                    <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(3, 1fr)', color: 'white' }}>
                      <div
                        style={{ cursor: 'pointer' }}
                        data-bs-toggle="modal"
                        data-bs-target="#autoDeposit"
                        data-bs-dismiss="modal"
                      >
                        <div className="type-of-withdrawal">
                          <div className="withdrawal">
                            <img
                              src="/assets/images/credit-card-machine.svg"
                              alt="kkk"
                            />
                            <div>ฝากเงินออโต้</div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ cursor: 'pointer' }}
                        data-bs-toggle="modal"
                        data-bs-target="#leaveAdecimal"
                        data-bs-dismiss="modal"
                      >
                        <div className="type-of-withdrawal">
                          <div className="withdrawal">
                            <img
                              src="/assets/images/Leave a-decimal.svg"
                              alt="kkk"
                            />
                            <div>ฝากทศนิยม</div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ cursor: "pointer" }}
                        data-bs-toggle="modal"
                        data-bs-target="#withdraw"
                        data-bs-dismiss="modal"
                      >
                        <div className="type-of-withdrawal">
                          <div className="withdrawal">
                            <img
                              src="/assets/images/Withdraw-money.svg"
                              alt="kkk"
                            />
                            <div>ถอนเงิน</div>
                          </div>
                        </div>
                      </div>

                      <div
                        data-bs-toggle="modal"
                        data-bs-target="#qrplay"
                        data-bs-dismiss="modal"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="type-of-withdrawal">
                          <div className="withdrawal">
                            <img src="/assets/images/scan.svg" alt="kkk" />
                            <div>QR PAY</div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ cursor: "pointer" }}
                        data-bs-toggle="modal"
                        data-bs-target="#slipVerify"
                        data-bs-dismiss="modal"
                      >
                        <div className="type-of-withdrawal">
                          <div className="withdrawal">
                            <img src="/assets/images/verified.svg" alt="kkk" />
                            <div>Slip Verify</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      textAlign: 'center',
                      marginTop: '10px'
                    }}>
                      <div style={{ fontSize: "12px" }}>
                        พบปัญหา
                        <span
                          style={{
                            color: 'rgba(0, 252, 252, 1)',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            fontSize: '13px'
                          }}
                        >ติดต่อฝ่ายบริการลูกค้า</span
                        >
                      </div>
                    </div>

                    <button type='button' className="line-button flexCenter">
                      <img src="/assets/icons/icon-line.svg" alt="line icon" />
                      <p style={{ margin: 0 }}>ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end  modal ฝาก - ถอน --> */}

        {/* <!-- start  modal ฝากออโต้ --> */}
        <div
          className="modal fade"
          id="autoDeposit"
          tabindex="-1"
          aria-labelledby="autoDeposit"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#depositWithdraw"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title" id="autoDeposit">ฝากออโต้</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="detail-card-scb">
                    <div className="card-scb flexBetween">
                      <div className="left flexCenter">
                        <p style={{ margin: 0 }}>ธนาคารกสิกรไทย</p>
                        <p style={{ margin: 0 }}>นาย xxxxx xxxxx <span><img src="/assets/images/icon-coppy.svg" alt="" style={{ width: 20, height: 20, marginBottom: -3 }} /></span></p>
                        <p style={{ margin: 0 }}>026-999999-9</p>
                      </div>
                      <div className="right flexCenter">
                        <div className="flexCenter bank">
                          <h4>SCB</h4>
                          <div style={{ borderRadius: '100%' }}>
                            <img src="/assets/images/scb 1.png" alt="scb" />
                          </div>
                        </div>

                        <div className="visa">
                          <img src="/assets/icons/visa.svg" alt="visa" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slide-image">
                    <div className="active" />
                    <div className="none-active" />
                  </div>
                  <div>
                    <div className="button-validationt">
                      <div style={{ color: "white" }}>
                        กรุณาใช้เลขบัญชีที่สมัครโอนเข้ามาเท่านั้น
                      </div>
                    </div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    marginTop: '10px'
                  }}>
                    <div>
                      พบปัญหา
                      <span
                        style={{
                          color: 'rgba(0, 252, 252, 1)',
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        }}
                      >ติดต่อฝ่ายบริการลูกค้า</span
                      >
                    </div>
                  </div>
                  <div className="button-line" style={{
                    margin: '0 auto',
                    width: '95%'
                  }}>
                    <div>
                      <img src="/assets/icons/icon-line.svg" alt="line" />
                      <p style={{ margin: 0 }}>ไลน์บอท /แจ้งเตือนยอดฝาก - ถอน </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end  modal ฝาก - ถอน --> */}

        {/* <!-- start  modal ฝากทศนิยม --> */}
        <div
          className="modal fade"
          id="leaveAdecimal"
          tabindex="-1"
          aria-labelledby="leaveAdecimal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#depositWithdraw"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title" id="leaveAdecimal">ฝากทศนิยม</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div style={{
                    margin: '0 auto',
                    width: '95%',
                    padding: '20px',
                    marginTop: '20px',
                    fontSize: '14px'
                  }}>
                    <ul>
                      <li>ฝากขั้นต่ำ 1.00 บาท สูงสุด 2,000.00 บาท</li>
                    </ul>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="text-amount-money"
                      placeholder="กรอกจำนวนเงินที่ต้องการฝาก"
                    />
                    <p style={{ color: '#ff0000' }}>กรุณากรอกข้อมูล</p>
                  </div>
                  <div>
                    <div
                      className="confirm-the-amount"
                      style={{ cursor: 'pointer' }}
                      data-bs-toggle="modal"
                      data-bs-target="#leaveAdecimal1"
                      data-bs-dismiss="modal"
                    >
                      <div>ยืนยันจำนวนเงิน</div>
                    </div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    marginTop: '10px'
                  }}>
                    <div>
                      พบปัญหา
                      <span
                        style={{
                          color: 'rgba(0, 252, 252, 1)',
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        }}
                      >ติดต่อฝ่ายบริการลูกค้า</span
                      >
                    </div>
                  </div>
                  <div className="button-line" style={{ cursor: "pointer", width: "95%" }}>
                    <div style={{
                      padding: '5px',
                      borderRadius: '5px'
                    }}>
                      <img src="/assets/icons/icon-line.svg" alt="line" style={{ width: "20px", height: "20px" }} />
                      <p style={{ margin: 0 }}>ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end  modal ฝากทศนิยม --> */}

        {/* <!-- start  modal ฝากทศนิยม --> */}
        <div
          className="modal fade"
          id="leaveAdecimal1"
          tabindex="-1"
          aria-labelledby="leaveAdecimal1"
          aria-hidden="true"
        >
          <div className="modal-border">
            <div className="modal-content">
              <div className="modal-header-container">
                <div className="modal-header">
                  <img
                    src="/assets/icons/icon-back-modal.svg"
                    className="modal-icon-back"
                    alt=""
                    data-bs-toggle="modal"
                    data-bs-target="#depositWithdraw"
                    data-bs-dismiss="modal"
                  />
                  <p className="modal-title" id="leaveAdecimal1">ฝากทศนิยม</p>
                  <img
                    src="/assets/icons/icon-close-modal.svg"
                    className="modal-icon-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    alt=""
                  />
                </div>
              </div>
              <div className="modal-body">
                <div className="leaveAdecimal1 flexCenter">
                  <p className="">ยอดเงินที่ต้องโอน</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end  modal ฝากทศนิยม --> */}

        {/* <!-- ถอนเงิน start  modal --> */}

        <div
          className="modal fade"
          id="withdraw"
          tabindex="-1"
          aria-labelledby="withdraw"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#depositWithdraw"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title" id="withdraw">ถอนเงิน</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="withdraw-modal-content flexCenter">
                    <div className="card" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: '#FFF' }}>
                      <div className="left flexCenter">
                        <p style={{ margin: 0 }}>ธนาคารกสิกรไทย</p>
                        <p style={{ margin: 0 }}>นาย xxxxx xxxxx</p>
                        <p style={{ margin: 0 }}>026-999999-9</p>
                      </div>
                      <div className="right flexCenter">
                        <div className="flexCenter bank">
                          <h4>KBank</h4>
                          <div style={{ backgroundColor: "#fff", borderRadius: "100%" }}>
                            <img src="/assets/images/kbank 1.png" alt="kbank" />
                          </div>
                        </div>
                        <div className="balance">
                          <p style={{ margin: 0 }}>ยอดคงเหลือในระบบ</p>
                          <p style={{ margin: 0 }}>1000.00 บาท</p>
                        </div>
                        <div className="visa">
                          <img src="/assets/icons/visa.svg" alt="visa" />
                        </div>
                      </div>
                    </div>

                    <div className="slider-wrapper flexBetween">
                      <div className="active slider" />
                      <div className="slider" />
                    </div>

                    <div className="money-input flexBetween">
                      <p>จำนวนเงินที่ถอนได้</p>
                      <input type="text" placeholder="1000" />
                    </div>
                    <div className="money-input flexBetween">
                      <p style={{ color: "red" }}>กรุณาระบุจำนวนที่จะถอน</p>
                      <input type="text" placeholder="1000" />
                    </div>

                    <div className="button-warning">ถอนเงิน</div>

                    <p>พบปัญหา <a href="/">ติดต่อฝ่ายบริการลูกค้า</a></p>

                    <button type='button' className="line-button flexCenter">
                      <img src="/assets/icons/icon-line.svg" alt="line icon" />
                      <p style={{ margin: 0 }}>ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ถอนเงิน end modal --> */}

        {/* <!-- start  modal QR Pay --> */}
        <div
          className="modal fade"
          id="qrplay"
          tabindex="-1"
          aria-labelledby="qrplay"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#depositWithdraw"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title" id="qrplay">QR PAY</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="qr-pay-content-1">
                    <ul className="notic-text">
                      <li>ฝากขั้นต่ำ 100 บาท สูงสุด 50,000.00 บาท *</li>
                    </ul>

                    <div className="bank-selector">
                      <select className="vodiapicker">
                        <option
                          value="kbank"
                          className="test"
                          data-thumbnail="https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png"
                        >.</option>
                        <option
                          value="au"
                          data-thumbnail="https://www.uhub.co.th/assets/images/icons/mobile/scb-icon.png"
                        >.</option>
                      </select>

                      <div className="lang-select">
                        <button type='button' className="btn-select" value="">.</button>
                        <img
                          src="/assets/icons/icon-drow.svg"
                          alt=""
                          style={{ margin: "5px 0 0 -27px" }}
                        />
                        <div className="b">
                          <ul id="a">.</ul>
                        </div>
                      </div>

                      <input
                        type="text"
                        className="show-username-bank"
                        placeholder="นาย ปปปปป ปปปปป"
                      />
                    </div>

                    <div className="confirmation">
                      <input
                        type="text"
                        className="text-amount-money"
                        placeholder="กรอกจำนวนเงินที่ต้องการฝาก"
                      />
                      <button
                        type='button'
                        className="button-warning"
                        style={{ cursor: "pointer" }}
                        data-bs-toggle="modal"
                        data-bs-target="#showQR"
                        data-bs-dismiss="modal"
                      >
                        <div>ยืนยันจำนวนเงิน</div>
                      </button>
                    </div>

                    <div className="info-text">
                      <p>
                        พบปัญหา
                        <a
                          href="/"
                          style={{
                            color: 'rgba(0, 252, 252, 1)',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                          }}
                        >ติดต่อฝ่ายบริการลูกค้า</a
                        >
                      </p>
                    </div>
                    <div className="button-line" style={{ width: "95%" }}>
                      <div className="flexBetween" style={{ padding: "10px 10px", borderRadius: "5px" }}>
                        <img src="/assets/icons/icon-line.svg" alt="line" />
                        <p style={{ margin: 0 }}>ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end  modal QR Pay --> */}
        {/* <!-- start modal QR  --> */}
        <div
          className="modal fade"
          id="showQR"
          tabindex="-1"
          aria-labelledby="showQR"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#qrplay"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title" id="showQR">QR PAY</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="detail-qr">
                    <div className="div1">จำนวนเงินฝากผ่าน QR Code</div>
                    <div className="div2">111.11 บาท</div>
                    <div className="div3">
                      <img src="/assets/images/qrpay.png" alt="qr" />
                    </div>
                    <div className="div4">
                      <button type='button' className="save">
                        <img src="/assets/icons/farm.svg" alt="save" /> บันทึก
                      </button>
                      <button type='button' className="refresh">
                        <img src="/assets/icons/reload.svg" alt="save" /> รีเฟรช
                      </button>
                    </div>
                    <div className="div5">วิธีการชำระเงิน</div>
                    <div className="div6">
                      <p>1.บันทึกภาพ หรือ แคปหน้าจอ QR Code</p>
                      <p>2.เข้าแอปพลิเคชั่นธนาคารที่ต้องการทำรายการฝาก</p>
                      <p className="danger">
                        ต้องใช้บัญชีที่ผูกกับระบบทำรายการเข้ามาเท่านั้น
                      </p>
                      <p>3.กดเลือกสแกนจ่ายที่แอปธนาคารนั้น ๆ</p>
                      <p>
                        4.เลือกรูปภาพ QR Code ที่บันทึกหรือแคป เพื่อทำรายการจ่าย
                      </p>
                    </div>
                    <div style={{
                      textAlign: 'center',
                      marginTop: '10px'
                    }}>
                      <div>
                        พบปัญหา
                        <span
                          style={{
                            color: 'rgba(0, 252, 252, 1)',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                          }}
                        >ติดต่อฝ่ายบริการลูกค้า</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- end modal qr --> */}

        {/* <!-- slip verify modal --> */}
        <div
          className="modal fade"
          id="slipVerify"
          tabindex="-1"
          aria-labelledby="slipVerifyLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#depositWithdraw"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title">Slip Verify</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="slip-verify-content flexCenter">
                    <p className="warning-text">
                      *ใช้ในกรณีที่ธนาคารมีปัญหาหรือยอดฝากไม่เข้า*
                    </p>
                    <div className="bank-selector">
                      <label htmlFor="name">เลือกธนาคารบัญชีฝาก</label>
                      <div className="flexCenter" style={{ gap: "8px" }}>
                        <div className="flexCenter" style={{ width: "20%" }}>
                          <img
                            src="/assets/icons/icon-bank-default/Ellipse 10.svg"
                            alt="bank icon"
                            width="33"
                            height="33"
                          />
                          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.5442 17.1414L6.28711 10.9062H18.8013L12.5442 17.1414Z"
                              fill="#FF9900"
                            />
                          </svg>
                        </div>
                        <input
                          style={{ width: '80%' }}
                          type="text"
                          name="name"
                          id="name"
                          placeholder="นาย ปปปปป ปปปปป"
                        />
                      </div>
                    </div>

                    <div className="bank-input">
                      <label htmlFor="bank">เลือกธนาคารที่ทำรายการฝาก</label>
                      <input type="text" name="bank" placeholder="เลือกธนาคาร" />
                    </div>
                    <div className="bank-input">
                      <label htmlFor="bank">กรุณากรอกข้อมูล</label>
                      <input type="text" name="bank" placeholder="0" />
                      <small>กรอกจำนวนเงินตามสลิป</small>
                    </div>
                    <div className="bank-input">
                      <label htmlFor="bank">กรุณากรอกข้อมูล</label>
                      <input type="text" name="bank" placeholder="0" />
                      <small>วันที่ทำรายการฝาก</small>
                    </div>

                    <button type='button' className="button-warning">ยืนยันยอดฝาก</button>
                    <p>พบปัญหา <a href="/">ติดต่อฝ่ายบริการลูกค้า</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- slip verify end --> */}

        {/* <!-- true wallet end modal --> */}
        <div
          className="modal fade"
          id="trueWallet"
          tabindex="-1"
          aria-labelledby="trueWalletLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#depositWithdraw"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title">Truewallet</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="true-wallet-content flexCenter">
                    <div className="card flexBetween">
                      <div className="flexCenter left">
                        <p>ทรูมันนี่ วอทเล็ท</p>
                        <p>026-999999-9 <span><img src="/assets/images/icon-coppy.svg" alt="" style={{
                          width: '20px',
                          height: '20px',
                          marginBottom: '-3px'
                        }} /></span></p>
                        <p>นาย xxxxx xxxxx</p>
                      </div>
                      <div className="flexBetween right">
                        <div className="true-wallet-title flexBetween">
                          <p>True Wallet</p>

                          <div>
                            <img
                              src="/assets/images/true-money-wallet.svg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="visa">
                          <img src="/assets/icons/visa.svg" alt="visa" />
                        </div>
                      </div>
                    </div>

                    <div className="warning-box flexCenter">
                      กรุณาใช้เลขบัญชีที่สมัครโอนเข้ามาเท่านั้น
                    </div>

                    <p className="suggest-text">
                      พบปัญหา <a href="/">ติดต่อฝ่ายบริการลูกค้า</a>
                    </p>

                    <button type='button' className="line-button flexCenter">
                      <img src="/assets/icons/icon-line.svg" alt="line icon" />
                      <p style={{ margin: 0 }}>ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- true wallet end --> */}

        {/* <!-- history modal --> */}
        <div
          className="modal fade"
          id="historyModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <p className="modal-title">{tabs}</p>
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
                  <div className="history-modal-content">
                    <div className="history-tab">
                      <div className={
                        tabName === "tab-deposit"
                          ? "history-tab-item active"
                          : "history-tab-item"
                      }
                        onClick={() => _clickTabDeposit("tab-deposit", setTabs, setTabName)}
                        onKeyDown={() => ""} id="tab-deposit"
                      >
                        ฝาก
                      </div>
                      <div className={
                        tabName === "tab-withdraw"
                          ? "history-tab-item active"
                          : "history-tab-item"
                      }
                        onClick={() => _clickTabDeposit("tab-withdraw", setTabs, setTabName)}
                        onKeyDown={() => ""} id="tab-withdraw">ถอน</div>
                      <div className={
                        tabName === "tab-bonus"
                          ? "history-tab-item active"
                          : "history-tab-item"
                      }
                        onClick={() => _clickTabDeposit("tab-bonus", setTabs, setTabName)}
                        onKeyDown={() => ""} id="tab-bonus">โบนัส</div>
                    </div>
                    {/* <!-- ฝาก --> */}
                    <div className="history-deposit" style={{ display: tabName === "tab-deposit" ? "block" : "none" }}>
                      <div className="history-list">
                        <div className="history-list-left">
                          <label className="history-list-label">รายการฝาก</label>
                          <p className="history-list-label">55</p>
                          <p className="history-list-label">หมายเหตุ : ไม่รับโบนัส</p>
                        </div>
                        <div className="history-list-right">
                          <div className="history-status success">สำเร็จ</div>
                          <p className="history-date">2022-10-16 16.00</p>
                        </div>
                      </div>
                      <div className="history-list">
                        <div className="history-list-left">
                          <label className="history-list-label">รายการฝาก</label>
                          <p className="history-list-label">55</p>
                          <p className="history-list-label">หมายเหตุ : ไม่รับโบนัส</p>
                        </div>
                        <div className="history-list-right">
                          <div className="history-status success">สำเร็จ</div>
                          <p className="history-date">2022-10-16 16.00</p>
                        </div>
                      </div>
                      <div className="history-list border-0">
                        <div className="history-list-left">
                          <label className="history-list-label">รายการฝาก</label>
                          <p className="history-list-label">55</p>
                          <p className="history-list-label">หมายเหตุ : ไม่รับโบนัส</p>
                        </div>
                        <div className="history-list-right">
                          <div className="history-status success">สำเร็จ</div>
                          <p className="history-date">2022-10-16 16.00</p>
                        </div>
                      </div>
                    </div>

                    {/* <!-- ถอน --> */}
                    <div className="history-withdraw" style={{ display: tabName === "tab-withdraw" ? "block" : "none" }}>
                      <div className="history-list">
                        <div className="history-list-left">
                          <label className="history-list-label">รายการถอน</label>
                          <p className="history-list-label">55</p>
                          <p className="history-list-label">หมายเหตุ : ไม่รับโบนัส</p>
                        </div>
                        <div className="history-list-right">
                          <div className="history-status success">สำเร็จ</div>
                          <p className="history-date">2022-10-16 16.00</p>
                        </div>
                      </div>
                      <div className="history-list">
                        <div className="history-list-left">
                          <label className="history-list-label">รายการถอน</label>
                          <p className="history-list-label">55</p>
                          <p className="history-list-label">หมายเหตุ : ไม่รับโบนัส</p>
                        </div>
                        <div className="history-list-right">
                          <div className="history-status success">สำเร็จ</div>
                          <p className="history-date">2022-10-16 16.00</p>
                        </div>
                      </div>
                      <div className="history-list border-0">
                        <div className="history-list-left">
                          <label className="history-list-label">รายการถอน</label>
                          <p className="history-list-label">55</p>
                          <p className="history-list-label">หมายเหตุ : ไม่รับโบนัส</p>
                        </div>
                        <div className="history-list-right">
                          <div className="history-status success">สำเร็จ</div>
                          <p className="history-date">2022-10-16 16.00</p>
                        </div>
                      </div>
                    </div>

                    {/* <!-- โบนัส --> */}
                    <div className="history-bonus" style={{ display: tabName === "tab-bonus" ? "block" : "none" }}>
                      <div className="history-list">
                        <div className="history-list-left">
                          <label className="history-list-label">รายการโบนัส</label>
                          <p className="history-list-label">55</p>
                          <p className="history-list-label">หมายเหตุ : ไม่รับโบนัส</p>
                        </div>
                        <div className="history-list-right">
                          <div className="history-status success">สำเร็จ</div>
                          <p className="history-date">2022-10-16 16.00</p>
                        </div>
                      </div>
                      <div className="history-list">
                        <div className="history-list-left">
                          <label className="history-list-label">รายการโบนัส</label>
                          <p className="history-list-label">55</p>
                          <p className="history-list-label">หมายเหตุ : ไม่รับโบนัส</p>
                        </div>
                        <div className="history-list-right">
                          <div className="history-status success">สำเร็จ</div>
                          <p className="history-date">2022-10-16 16.00</p>
                        </div>
                      </div>
                      <div className="history-list border-0">
                        <div className="history-list-left">
                          <label className="history-list-label">รายการโบนัส</label>
                          <p className="history-list-label">55</p>
                          <p className="history-list-label">หมายเหตุ : ไม่รับโบนัส</p>
                        </div>
                        <div className="history-list-right">
                          <div className="history-status success">สำเร็จ</div>
                          <p className="history-date">2022-10-16 16.00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- history modal end --> */}

        {/* <!-- promotion modal --> */}
        <div
          className="modal fade"
          id="promotionModal"
          tabindex="-1"
          aria-labelledby="promotionModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#bagModal"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title">โปรโมชั่น</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="promotion-modal-content">
                    <div className="promotion-modal-body">
                      <div className="promotion-modal-image-container">
                        <img
                          src="/assets/images/image-promotion-modal.svg"
                          className="promotion-modal-image"
                          alt=""
                        />
                      </div>
                      <p className="promotion-content-title">สมาชิกใหม่หมุนกงล้อฟรี</p>
                      <p className="promotion-content-text">วันเกิด หมุนกงล้อฟรี !!</p>
                      <p className="promotion-content-text">
                        (สอบถามข้อมูลเพิ่มเติมได้ที่แอดมิน)
                      </p>
                    </div>
                    <div className="promotion-modal-footer">
                      <div className="promotion-modal-footer-content">
                        <p className="promotion-modal-footer-title">สถานะโปรโมชั่น</p>
                        <div className="promotion-checkbox-group">
                          <input
                            type="radio"
                            className="promotion-default-radio"
                            name="promotion-status"
                            id="get-promotion"
                          />
                          <label
                            className="promotion-checkbox-title"
                            htmlFor="get-promotion"
                          >
                            <div className="promotion-custom-radio" />
                            รับโบนัส
                          </label>
                          <input
                            type="radio"
                            className="promotion-default-radio"
                            name="promotion-status"
                            id="not-get-promotion"
                          />
                          <label
                            className="promotion-checkbox-title"
                            htmlFor="not-get-promotion"
                          >
                            <div className="promotion-custom-radio" />
                            ไม่รับโบนัส
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- promotion modal end --> */}

        {/* <!-- change password modal --> */}
        <div
          className="modal fade"
          id="changePasswordModal"
          tabindex="-1"
          aria-labelledby="changePasswordModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#bagModal"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title">เปลี่ยนรหัส</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="change-password-modal-content">
                    <div className="border-input-gold">
                      <input
                        type="text"
                        placeholder="กรุณากรอกรหัสผ่านเดิม"
                        className="input-for-border-gold"
                      />
                    </div>
                    <div className="change-password-hr">
                      <div className="hr" />
                    </div>
                    <div className="border-input-gold">
                      <input
                        type="text"
                        placeholder="กรุณากรอกรหัสผ่านใหม่"
                        className="input-for-border-gold"
                      />
                    </div>
                    <div className="border-input-gold">
                      <input
                        type="text"
                        placeholder="กรุณากรอกรหัสผ่านใหม่อีกครั้ง"
                        className="input-for-border-gold"
                      />
                    </div>

                    <button type="button" className="button-warning">ยืนยัน</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- change password modal end --> */}

        {/* <!-- Earn Bag Modal --> */}
        <div
          className="modal fade"
          id="bagModal"
          tabindex="-1"
          aria-labelledby="bagModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <p className="modal-title">กระเป๋า</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="bag-modal-content">
                    <div className="bag-modal-slide-container">
                      <img src="/assets/images/bag-background.png" alt="" />
                    </div>

                    <div className="bag-modal-menu">
                      <div
                        className="bag-modal-menu-item"
                        id="promotion-modal-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#promotionModal"
                        data-bs-dismiss="modal"
                      >
                        <div className="bag-menu-img-container">
                          <img
                            className="bag-menu-icon"
                            src="/assets/icons/icon-promotion.svg"
                            alt=""
                          />
                        </div>
                        <p className="bag-modal-menu-title">โปรโมชั่น</p>
                      </div>
                      <div
                        className="bag-modal-menu-item"
                        data-bs-toggle="modal"
                        data-bs-target="#depositWithdraw"
                        data-bs-dismiss="modal"
                      >
                        <div className="bag-menu-img-container">
                          <img
                            className="bag-menu-icon"
                            src="/assets/icons/icon-withdraw.svg"
                            alt=""
                          />
                        </div>
                        <p className="bag-modal-menu-title">ฝาก - ถอน</p>
                      </div>
                      <div
                        className="bag-modal-menu-item"
                        data-bs-toggle="modal"
                        data-bs-target="#earnMoneyModal"
                        data-bs-dismiss="modal"
                      >
                        <div className="bag-menu-img-container">
                          <img
                            className="bag-menu-icon"
                            src="/assets/icons/icon-earn-money.svg"
                            alt=""
                          />
                        </div>
                        <p className="bag-modal-menu-title">สร้างรายได้</p>
                      </div>
                      <div
                        className="bag-modal-menu-item"
                        id="code-modal-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#codeModal"
                        data-bs-dismiss="modal"
                      >
                        <div className="bag-menu-img-container">
                          <img
                            className="bag-menu-icon"
                            src="/assets/icons/icon-ticket.svg"
                            alt=""
                          />
                        </div>
                        <p className="bag-modal-menu-title">กรอกโค้ด</p>
                      </div>
                      <div
                        className="bag-modal-menu-item"
                        data-bs-toggle="modal"
                        data-bs-target="#spinnerModal"
                        data-bs-dismiss="modal"
                      >
                        <div className="bag-menu-img-container">
                          <img
                            className="bag-menu-icon"
                            src="/assets/icons/icon-spinner.svg"
                            alt=""
                          />
                        </div>
                        <p className="bag-modal-menu-title">กงล้อ</p>
                      </div>
                      <div
                        className="bag-modal-menu-item"
                        data-bs-toggle="modal"
                        data-bs-target="#creditModal"
                        data-bs-dismiss="modal"
                      >
                        <div className="bag-menu-img-container">
                          <img
                            className="bag-menu-icon"
                            src="/assets/icons/icon-teasure.svg"
                            alt=""
                          />
                        </div>
                        <p className="bag-modal-menu-title">เครดิตฟรี</p>
                      </div>
                      <div
                        className="bag-modal-menu-item"
                        data-bs-toggle="modal"
                        data-bs-target="#cashback"
                        data-bs-dismiss="modal"
                      >
                        <div className="bag-menu-img-container">
                          <img
                            className="bag-menu-icon"
                            src="/assets/icons/icon-back-cash.svg"
                            alt=""
                          />
                        </div>
                        <p className="bag-modal-menu-title">คืนยอดเสีย</p>
                      </div>
                      <div
                        className="bag-modal-menu-item"
                        data-bs-toggle="modal"
                        data-bs-target="#diamondModal"
                        data-bs-dismiss="modal"
                      >
                        <div className="bag-menu-img-container">
                          <img
                            className="bag-menu-icon"
                            src="/assets/icons/icon-diamond.svg"
                            alt=""
                          />
                        </div>
                        <p className="bag-modal-menu-title">แลกเพรช</p>
                      </div>
                      <div
                        className="bag-modal-menu-item"
                        data-bs-toggle="modal"
                        data-bs-target="#tournamentModal"
                        data-bs-dismiss="modal"
                      >
                        <div className="bag-menu-img-container">
                          <img
                            className="bag-menu-icon"
                            src="/assets/icons/icon-trophy.svg"
                            alt=""
                          />
                        </div>
                        <p className="bag-modal-menu-title">ทัวร์นาเมนต์</p>
                      </div>
                      <div className="bag-modal-menu-item">
                        <div className="bag-menu-img-container">
                          <img
                            className="bag-menu-icon"
                            src="/assets/icons/icon-road-map.svg"
                            alt=""
                          />
                        </div>
                        <p className="bag-modal-menu-title">Road Map</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End bag modal --> */}

        {/* <!-- earn money modal --> */}
        <div
          className="modal fade"
          id="earnMoneyModal"
          tabindex="-1"
          aria-labelledby="earnMoneyModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#bagModal"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title">สร้างรายได้</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="earn-modal-content">
                    <div className="earn-qr-container">
                      <div className="border-input-gold">
                        <div className="earn-qr-content">
                          <img
                            className="earn-qr-img"
                            src="/assets/images/qr-code-image.svg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-input-gold">
                      <div className="link-shared">
                        <p className="link-shared-title">ลิ้งค์แนะนำเพื่อน</p>
                        <p className="link-shared-subtitle">
                          คุณจะได้รับรายได้ฟรีจากการแนะนำเพื่อน
                        </p>
                        <input type="text" className="link-shared-input" />

                        <div className="link-shared-btn-group">
                          <div className="border-input-gold border-btn">
                            <button type="button" className="btn-copy-link">
                              คัดลอกลิ้งค์
                            </button>
                          </div>
                          <button type="button" className="btn-share-link">แชร์</button>
                        </div>
                      </div>
                    </div>

                    <div className="earn-menu-content">
                      <div className="border-input-gold">
                        <div
                          className="earn-menu-item"
                          data-bs-toggle="modal"
                          data-bs-target="#earnMoneyDetailModal"
                          data-bs-dismiss="modal"
                        >
                          <img
                            className="earn-menu-item-img"
                            src="/assets/images/img-total-plays.svg"
                            alt=""
                          />
                          <p className="earn-menu-item-title">ยอดเล่น</p>
                          <p className="earn-menu-item-subtitle">
                            ยอดเล่นของเพื่อนทั้งหมด
                          </p>
                        </div>
                      </div>
                      <div className="border-input-gold">
                        <div className="earn-menu-item">
                          <img
                            className="earn-menu-item-img"
                            src="/assets/images/img-total-lose.png"
                            alt=""
                          />
                          <p className="earn-menu-item-title">ยอดเสีย</p>
                          <p className="earn-menu-item-subtitle">
                            ยอดเสียของเพื่อนทั้งหมด
                          </p>
                        </div>
                      </div>
                      <div className="border-input-gold">
                        <div className="earn-menu-item">
                          <img
                            className="earn-menu-item-img"
                            src="/assets/images/img-total-deposit.svg"
                            alt=""
                          />
                          <p className="earn-menu-item-title">ยอดฝาก</p>
                          <p className="earn-menu-item-subtitle">
                            ยอดฝากของเพื่อนทั้งหมด
                          </p>
                        </div>
                      </div>
                      <div className="border-input-gold">
                        <div className="earn-menu-item">
                          <img
                            className="earn-menu-item-img"
                            src="/assets/icons/icon-teasure.svg"
                            alt=""
                          />
                          <p className="earn-menu-item-title">รับเครดิตฟรี</p>
                          <p className="earn-menu-item-subtitle">
                            เครดิตฟรีจากการแนะนำ
                          </p>
                        </div>
                      </div>
                      <div className="border-input-gold">
                        <div className="earn-menu-item">
                          <img
                            className="earn-menu-item-img"
                            src="/assets/images/member-suggest.png"
                            alt=""
                          />
                          <p className="earn-menu-item-title">สมาชิกแนะนำ</p>
                          <p className="earn-menu-item-subtitle">ดูรายละเอียด</p>
                        </div>
                      </div>
                    </div>

                    <div className="read-earn-rule">
                      หากมีข้อสงสัยเพิ่มเติม
                      <a href="https://www.google.com/" target="_blank" rel='noreferrer'
                      >อ่านกฏกติกา</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="earnMoneyDetailModal"
          tabindex="-1"
          aria-labelledby="earnMoneyDetailModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#bagModal"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title">สร้างรายได้</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="earn-modal-content">
                    <div className="earn-tab-container">
                      <div className="border-input-gold">
                        <div className="earn-tab">
                          <div id="earn-tab-overview" className="earn-tab-item active">
                            ภาพรวม
                          </div>
                          <div className="border-input-gold earn-tab-item-2">
                            <div id="earn-tab-income" className="earn-tab-item">
                              รายได้
                            </div>
                          </div>
                          <div id="earn-tab-withdraw-income" className="earn-tab-item">
                            ถอนรายได้
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="earn-detail-data" id="earn-detail-overview">
                      <div className="filter-date">
                        <p className="filter-label">ภาพรวมวันที่</p>
                        <input
                          className="filter-date-input"
                          type="date"
                          name=""
                          id=""
                        />
                      </div>

                      <div className="border-input-gold">
                        <div className="table-earn-date">
                          <div className="border-input-gold">
                            <div className="th-earn-container">
                              <span className="th-earn">วันที่</span>
                              <span className="th-earn">สมัคร</span>
                              <span className="th-earn">ฝากเงิน</span>
                              <span className="th-earn">รายได้</span>
                            </div>
                          </div>

                          <div className="tr-earn-container">
                            <div className="tr-earn">
                              <span className="td-earn">1/01/66</span>
                              <span className="td-earn">110</span>
                              <span className="td-earn">40</span>
                              <span className="td-earn">11,668</span>
                            </div>
                            <div className="tr-earn">
                              <span className="td-earn">1/01/66</span>
                              <span className="td-earn">110</span>
                              <span className="td-earn">40</span>
                              <span className="td-earn">11,668</span>
                            </div>
                            <div className="tr-earn">
                              <span className="td-earn">1/01/66</span>
                              <span className="td-earn">110</span>
                              <span className="td-earn">40</span>
                              <span className="td-earn">11,668</span>
                            </div>
                            <div className="tr-earn">
                              <span className="td-earn">1/01/66</span>
                              <span className="td-earn">110</span>
                              <span className="td-earn">40</span>
                              <span className="td-earn">11,668</span>
                            </div>
                            <div className="tr-earn">
                              <span className="td-earn">1/01/66</span>
                              <span className="td-earn">110</span>
                              <span className="td-earn">40</span>
                              <span className="td-earn">11,668</span>
                            </div>
                            <div className="tr-earn">
                              <span className="td-earn">1/01/66</span>
                              <span className="td-earn">110</span>
                              <span className="td-earn">40</span>
                              <span className="td-earn">11,668</span>
                            </div>
                            <div className="tr-earn">
                              <span className="td-earn">1/01/66</span>
                              <span className="td-earn">110</span>
                              <span className="td-earn">40</span>
                              <span className="td-earn">11,668</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="filter-date">
                        <p className="filter-label">ภาพรวมทั้งเดือน</p>
                        <select className="filter-date-input">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                      </div>

                      <div className="border-input-gold">
                        <div className="table-earn-date">
                          <div className="border-input-gold">
                            <div className="th-earn-container">
                              <span className="th-earn">เดือน</span>
                              <span className="th-earn">สมัคร</span>
                              <span className="th-earn">ฝากเงิน</span>
                              <span className="th-earn">รายได้</span>
                            </div>
                          </div>

                          <div className="tr-earn-container">
                            <div className="tr-earn">
                              <span className="td-earn">January</span>
                              <span className="td-earn">10,120</span>
                              <span className="td-earn">1,336</span>
                              <span className="td-earn">83,550</span>
                            </div>
                            <div className="tr-earn">
                              <span className="td-earn">January</span>
                              <span className="td-earn">10,120</span>
                              <span className="td-earn">1,336</span>
                              <span className="td-earn">83,550</span>
                            </div>
                            <div className="tr-earn">
                              <span className="td-earn">January</span>
                              <span className="td-earn">10,120</span>
                              <span className="td-earn">1,336</span>
                              <span className="td-earn">83,550</span>
                            </div>
                            <div className="tr-earn">
                              <span className="td-earn">January</span>
                              <span className="td-earn">10,120</span>
                              <span className="td-earn">1,336</span>
                              <span className="td-earn">83,550</span>
                            </div>
                            <div className="tr-earn">
                              <span className="td-earn">January</span>
                              <span className="td-earn">10,120</span>
                              <span className="td-earn">1,336</span>
                              <span className="td-earn">83,550</span>
                            </div>
                            <div className="tr-earn">
                              <span className="td-earn">January</span>
                              <span className="td-earn">10,120</span>
                              <span className="td-earn">1,336</span>
                              <span className="td-earn">83,550</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="earn-detail-data" id="earn-detail-income">
                      <div className="filter-date">
                        <p className="filter-label" style={{ fontSize: '12px' }}>ประวัติรายได้</p>
                        <input
                          className="filter-date-input"
                          type="date"
                          name=""
                          id=""
                          style={{ width: "89px" }}
                        />
                        <select className="filter-date-input" style={{ width: "89px" }}>
                          <option value="">.</option>
                        </select>
                      </div>

                      <div className="border-input-gold">
                        <div className="table-earn-date">
                          <div className="border-input-gold">
                            <div className="th-earn-container">
                              <span className="th-earn">วัน/เวลา</span>
                              <span className="th-earn">ยูสเซอร์</span>
                              <span className="th-earn">ระดับขั้น</span>
                              <span className="th-earn">จำนวนเงิน</span>
                              <span className="th-earn">ชนิด</span>
                              <span className="th-earn">หมวด</span>
                            </div>
                          </div>

                          <div className="tr-earn-container" />
                        </div>
                      </div>
                    </div>

                    <div className="earn-detail-data" id="earn-detail-withdraw-income">
                      <div className="border-input-gold">
                        <div className="form-withdraw-income">
                          <div className="form-withdraw-group">
                            <label className="form-withdraw-label"
                            >รายได้ปัจจุบัน</label
                            >
                            <input type="text" className="form-withdraw-input" />
                          </div>
                          <div className="form-withdraw-group">
                            <label className="form-withdraw-label"
                            >จำนวนเงินที่ต้องการถอน</label
                            >
                            <input
                              type="text"
                              placeholder="ถอนไม่มีขั้นต่ำ"
                              className="form-withdraw-input"
                            />
                          </div>

                          <button type="button" className="btn-withdraw-income">
                            ถอนรายได้
                          </button>
                        </div>
                      </div>
                      <div className="filter-date">
                        <p className="filter-label">ประวัติรายได้</p>
                        <input
                          className="filter-date-input"
                          type="date"
                          name=""
                          id=""
                        />
                      </div>

                      <div className="border-input-gold">
                        <div className="table-earn-date">
                          <div className="border-input-gold">
                            <div className="th-earn-container">
                              <span className="th-earn">วัน/เวลา</span>
                              <span className="th-earn">ยูสเซอร์</span>
                              <span className="th-earn">จำนวนเงิน</span>
                              <span className="th-earn">สถานะ</span>
                            </div>
                          </div>

                          <div className="tr-earn-container">
                            <div className="tr-earn">
                              <span className="td-earn">1/01/66</span>
                              <span className="td-earn">xcczsaw</span>
                              <span className="td-earn">10,120</span>
                              <span className="td-earn">รับแล้ว</span>
                            </div>
                            <div className="tr-earn">
                              <span className="td-earn">1/01/66</span>
                              <span className="td-earn">xcczsaw</span>
                              <span className="td-earn">10,120</span>
                              <span className="td-earn">รับแล้ว</span>
                            </div>
                            <div className="tr-earn">
                              <span className="td-earn">1/01/66</span>
                              <span className="td-earn">xcczsaw</span>
                              <span className="td-earn">10,120</span>
                              <span className="td-earn">รับแล้ว</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="read-earn-rule">
                      หากมีข้อสงสัยเพิ่มเติม
                      <a href="https://www.google.com/" target="_blank" rel="noreferrer"
                      >อ่านกฏกติกา</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- earn money modal end --> */}

        {/* <!-- code modal --> */}
        <div
          className="modal fade"
          id="codeModal"
          tabindex="-1"
          aria-labelledby="codeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#bagModal"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title">กรอกโค้ด</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="code-modal-content">
                    <input
                      type="text"
                      placeholder="กรุณากรอกโค้ด"
                      className="input-box"
                    />

                    <button type="button" className="button-warning">ยืนยัน</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- code modal end --> */}

        {/* <!-- spinner modal --> */}
        <div
          className="modal fade"
          id="spinnerModal"
          tabindex="-1"
          aria-labelledby="spinnerModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#bagModal"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title">กงล้อ</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="spinner-modal-content">
                    <p className="spinner-modal-title">แต้มทั้งหมด : 0.00</p>
                    <p className="spinner-modal-subtitle">
                      10 แต้ม หมุนกงล้อได้ 1 ครั้ง
                    </p>
                    <div className="spinner-modal-body">
                      <img
                        className="spinner-modal-img"
                        src="/assets/images/image-spinner.svg"
                        alt=""
                      />
                      <button type="button" className="btn-spinner">หมุนกงล้อ</button>
                      <p className="spinner-modal-subtitle2">เครดิตกงล้อ : 0.00</p>
                      <input
                        type="text"
                        placeholder="จำนวนเงิน"
                        className="input-box"
                      />
                      <p className="spinner-modal-text-danger">
                        แลกเงินเข้าเครดิต ขั้นต่ำ 100.00
                      </p>

                      <button type="button" className="button-confirm-warning">
                        แลกเงินเข้าเครดิต
                      </button>
                      <div className="spinner-rule-container">
                        <p className="spinner-rule-text">อ่านกฎกติกา</p>
                        <img
                          className="spinner-icon-info"
                          src="/assets/icons/icon-info.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- spinner modal end --> */}

        {/* <!-- credit modal --> */}
        <div
          className="modal fade"
          id="creditModal"
          tabindex="-1"
          aria-labelledby="creditModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#bagModal"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title">เครดิตฟรี</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="credit-modal-content">
                    <div className="border-input-gold">
                      <div className="credit-modal-body">
                        {/* <!-- show this if no credit --> */}
                        {/* <!-- <div className="no-credit">
                        <div className="no-credit-right">
                          <p className="no-credit-text">ไม่พบรายการ</p>
                          <p className="no-credit-text">เครดิตฟรี</p>
                        </div>
                      </div> --> */}

                        {/* <!-- show this if thre is free credit --> */}
                        <div className="free-credit">
                          <div className="credit-point-content">
                            <img
                              className="credit-point-img"
                              src="/assets/images/coin.png"
                              alt=""
                            />
                            <p className="credit-point-text">+100</p>
                          </div>
                          <div className="credit-button-content">
                            <p className="credit-button-title">สามารถรับเครดิตฟรีได้</p>
                            <button type='button' className="btn-credit-confirm">ยินยัน</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- credit modal end --> */}

        {/* <!-- start cashback --> */}
        <div
          className="modal fade"
          id="cashback"
          tabindex="-1"
          aria-labelledby="cashback"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#bagModal"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title">Cashback</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="change-cashback-modal-content">
                    <div className="card-cashback">
                      <div
                        data-bs-toggle="modal"
                        data-bs-target="#cashbackDetail"
                        data-bs-dismiss="modal"
                      >
                        <div className="card-body">
                          <div className="name-cashback-game">
                            <img src="/assets/images/cashback-1.svg" alt="" />
                            <div className="text">
                              <p className="name-game">สล๊อต</p>
                              <p className="balance">คืนยอดเสีย 5.0%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="name-cashback-game">
                          <img src="/assets/images/cashback-2.svg" alt="" />
                          <div className="text">
                            <p className="name-game">บาคาร่า</p>
                            <p className="balance">คืนยอดเสีย 5.0%</p>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="name-cashback-game">
                          <img src="/assets/images/cashback-3.svg" alt="" />
                          <div className="text">
                            <p className="name-game">ยิงปลา</p>
                            <p className="balance">คืนยอดเสีย 5.0%</p>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="name-cashback-game">
                          <img src="/assets/images/cashback-4.svg" alt="" />
                          <div className="text">
                            <p className="name-game">ป้อกเด้ง</p>
                            <p className="balance">คืนยอดเสีย 5.0%</p>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="name-cashback-game">
                          <img src="/assets/images/cashback-5.svg" alt="" />
                          <div className="text">
                            <p className="name-game">หวย</p>
                            <p className="balance">คืนยอดเสีย 5.0%</p>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="name-cashback-game">
                          <img src="/assets/images/cashback-6.svg" alt="" />
                          <div className="text">
                            <p className="name-game">กีฬา</p>
                            <p className="balance">คืนยอดเสีย 5.0%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end cashback --> */}

        {/* <!-- start cashback detail --> */}
        <div
          className="modal fade"
          id="cashbackDetail"
          tabindex="-1"
          aria-labelledby="cashbackDetail"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#cashback"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title">Cashback</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="change-cashback-detail-modal-content">
                    <div className="detail">
                      <div className="title">ยอดเสียเกมส์ สล็อต</div>
                      <div className="accumulated-lot-amount">
                        <div className="text-amount">
                          <div className="text-left">ยอดเสียสะสม 0</div>
                          <div className="text-right">Cashback 5.00 %</div>
                        </div>
                        <div className="text-amount">
                          <div className="text-left">ยอดเสียสะสม 0</div>
                          <div className="text-right history-background">ประวัติการรับ</div>
                        </div>
                      </div>
                      <div className="your-loss">ยอดเสียของคุณ</div>
                      <div className="loss">0</div>
                      <div className="updated">อัพเดทล่าสุด 09-09-65 12.00 น.</div>
                      <div className="btn">
                        <button type='button' className="receive-credit">รับเข้าเครดิต</button>
                        <button type='button' className="withdraw-to-accont">ถอนเข้าบัญชี</button>
                      </div>
                      <div className="description">
                        <p className="text-left">ขั้นต่ำ 1 สูงสุด 10000</p>
                        <p className="text-right">ปิดใช้งานก่อนเข้าบัญชี</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end cashback detail --> */}

        {/* <!-- diamond modal --> */}
        <div
          className="modal fade"
          id="diamondModal"
          tabindex="-1"
          aria-labelledby="diamondModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#bagModal"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title">เพชรฟรี</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="credit-modal-content">
                    <div className="border-input-gold">
                      <div className="credit-modal-body">
                        {/* <!-- show this if no credit --> */}
                        {/* <!-- <div className="no-credit">
                        <div className="no-credit-right">
                          <p className="no-credit-text">ไม่พบรายการ</p>
                          <p className="no-credit-text">เพชรฟรี</p>
                        </div>
                      </div> --> */}

                        {/* <!-- show this if thre is free credit --> */}
                        <div className="free-credit">
                          <div className="credit-point-content">
                            <img
                              className="credit-point-img"
                              src="/assets/images/gem.svg"
                              alt=""
                            />
                            <p className="credit-point-text">+100</p>
                          </div>
                          <div className="credit-button-content">
                            <p className="credit-button-title">สามารถรับเพชรฟรีได้</p>
                            <button type='button' className="btn-credit-confirm">ยินยัน</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- diamond modal end --> */}

        {/* <!-- tournament modal --> */}
        <div
          className="modal fade"
          id="tournamentModal"
          tabindex="-1"
          aria-labelledby="tournamentModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-border">
              <div className="modal-content">
                <div className="modal-header-container">
                  <div className="modal-header">
                    <img
                      src="/assets/icons/icon-back-modal.svg"
                      className="modal-icon-back"
                      alt=""
                      data-bs-toggle="modal"
                      data-bs-target="#bagModal"
                      data-bs-dismiss="modal"
                    />
                    <p className="modal-title">ทัวร์นาเมนท์</p>
                    <img
                      src="/assets/icons/icon-close-modal.svg"
                      className="modal-icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="tournament-modal-content">
                    <div className="top-recharge-select-container">
                      <div className="top-recharge-select">
                        <img
                          className="select-icon"
                          id="icon-top-play"
                          src="/assets/icons/icon-top-play.svg"
                          alt=""
                        />
                        <img
                          className="select-icon"
                          id="icon-top-recharge"
                          src="/assets/icons/icon-top-recharge.svg"
                          alt=""
                        />
                        <img
                          className="select-icon"
                          id="icon-top-lose"
                          src="/assets/icons/icon-top-lose.svg"
                          alt=""
                        />
                        <select
                          className="top-recharge-select-content"
                          id="top-rank-select"
                        >
                          <option value="top-play">ยอดเล่นสูงสุด 30 อันดับ</option>
                          <option value="top-recharge">
                            ยอดเติมสูงสุด 30 อันดับ
                          </option>
                          <option value="top-lose">ยอดเสียสูงสุด 30 อันดับ</option>
                        </select>
                      </div>
                    </div>

                    <p className="top-rank">TOP RANK</p>
                    <div className="slide-rank">
                      <div className="slide-rank-item top1">
                        <img
                          className="rank-icon"
                          src="/assets/icons/icon-top1.svg"
                          alt=""
                        />
                        <img
                          className="rank-profile"
                          src="/assets/images/image-top1.svg"
                          alt=""
                        />
                        <p className="rank-item-text">ST14526641</p>
                        <p className="rank-item-text">095-xxx-xxxx</p>
                        <p className="rank-item-text">1,500,000 บาท</p>
                      </div>
                      <div className="slide-rank-item top2">
                        <img
                          className="rank-icon"
                          src="/assets/icons/icon-top2.svg"
                          alt=""
                        />
                        <img
                          className="rank-profile"
                          src="/assets/images/image-top2.svg"
                          alt=""
                        />
                        <p className="rank-item-text">ST14526641</p>
                        <p className="rank-item-text">095-xxx-xxxx</p>
                        <p className="rank-item-text">1,200,000 บาท</p>
                      </div>
                      <div className="slide-rank-item top3">
                        <img
                          className="rank-icon"
                          src="/assets/icons/icon-top3.svg"
                          alt=""
                        />
                        <img
                          className="rank-profile"
                          src="/assets/images/image-top3.svg"
                          alt=""
                        />
                        <p className="rank-item-text">ST14526641</p>
                        <p className="rank-item-text">095-xxx-xxxx</p>
                        <p className="rank-item-text">1,000,000 บาท</p>
                      </div>
                      <div className="slide-rank-item">
                        <img
                          className="rank-profile"
                          src="/assets/images/st-vegas-logo.png"
                          alt=""
                        />
                        <p className="rank-item-text">ST14526641</p>
                        <p className="rank-item-text">095-xxx-xxxx</p>
                        <p className="rank-item-text">500,000 บาท</p>
                      </div>
                      <div className="slide-rank-item">
                        <img
                          className="rank-profile"
                          src="/assets/images/st-vegas-logo.png"
                          alt=""
                        />
                        <p className="rank-item-text">ST14526641</p>
                        <p className="rank-item-text">095-xxx-xxxx</p>
                        <p className="rank-item-text">500,000 บาท</p>
                      </div>
                      <div className="slide-rank-item">
                        <img
                          className="rank-profile"
                          src="/assets/images/st-vegas-logo.png"
                          alt=""
                        />
                        <p className="rank-item-text">ST14526641</p>
                        <p className="rank-item-text">095-xxx-xxxx</p>
                        <p className="rank-item-text">500,000 บาท</p>
                      </div>
                      <div className="slide-rank-item">
                        <img
                          className="rank-profile"
                          src="/assets/images/st-vegas-logo.png"
                          alt=""
                        />
                        <p className="rank-item-text">ST14526641</p>
                        <p className="rank-item-text">095-xxx-xxxx</p>
                        <p className="rank-item-text">500,000 บาท</p>
                      </div>
                      <div className="slide-rank-item">
                        <img
                          className="rank-profile"
                          src="/assets/images/st-vegas-logo.png"
                          alt=""
                        />
                        <p className="rank-item-text">ST14526641</p>
                        <p className="rank-item-text">095-xxx-xxxx</p>
                        <p className="rank-item-text">500,000 บาท</p>
                      </div>
                      <div className="slide-rank-item">
                        <img
                          className="rank-profile"
                          src="/assets/images/st-vegas-logo.png"
                          alt=""
                        />
                        <p className="rank-item-text">ST14526641</p>
                        <p className="rank-item-text">095-xxx-xxxx</p>
                        <p className="rank-item-text">500,000 บาท</p>
                      </div>
                      <div className="slide-rank-item">
                        <img
                          className="rank-profile"
                          src="/assets/images/st-vegas-logo.png"
                          alt=""
                        />
                        <p className="rank-item-text">ST14526641</p>
                        <p className="rank-item-text">095-xxx-xxxx</p>
                        <p className="rank-item-text">500,000 บาท</p>
                      </div>
                    </div>

                    <div className="table-rank">
                      <div className="table-rank-item">
                        <div className="no-rank">11</div>
                        <div className="rank-detail">
                          <div className="rank-phone">095-xxx-xxxx</div>
                          <div className="rank-detail-title">ยอด</div>
                          <div className="rank-money">351,353</div>
                        </div>
                      </div>
                      <div className="table-rank-item">
                        <div className="no-rank">12</div>
                        <div className="rank-detail">
                          <div className="rank-phone">095-xxx-xxxx</div>
                          <div className="rank-detail-title">ยอด</div>
                          <div className="rank-money">351,353</div>
                        </div>
                      </div>
                      <div className="table-rank-item">
                        <div className="no-rank">13</div>
                        <div className="rank-detail">
                          <div className="rank-phone">095-xxx-xxxx</div>
                          <div className="rank-detail-title">ยอด</div>
                          <div className="rank-money">351,353</div>
                        </div>
                      </div>
                      <div className="table-rank-item">
                        <div className="no-rank">14</div>
                        <div className="rank-detail">
                          <div className="rank-phone">095-xxx-xxxx</div>
                          <div className="rank-detail-title">ยอด</div>
                          <div className="rank-money">351,353</div>
                        </div>
                      </div>
                      <div className="table-rank-item">
                        <div className="no-rank">15</div>
                        <div className="rank-detail">
                          <div className="rank-phone">095-xxx-xxxx</div>
                          <div className="rank-detail-title">ยอด</div>
                          <div className="rank-money">351,353</div>
                        </div>
                      </div>
                      <div className="table-rank-item">
                        <div className="no-rank">16</div>
                        <div className="rank-detail">
                          <div className="rank-phone">095-xxx-xxxx</div>
                          <div className="rank-detail-title">ยอด</div>
                          <div className="rank-money">351,353</div>
                        </div>
                      </div>
                      <div className="table-rank-item">
                        <div className="no-rank">17</div>
                        <div className="rank-detail">
                          <div className="rank-phone">095-xxx-xxxx</div>
                          <div className="rank-detail-title">ยอด</div>
                          <div className="rank-money">351,353</div>
                        </div>
                      </div>
                      <div className="table-rank-item">
                        <div className="no-rank">18</div>
                        <div className="rank-detail">
                          <div className="rank-phone">095-xxx-xxxx</div>
                          <div className="rank-detail-title">ยอด</div>
                          <div className="rank-money">351,353</div>
                        </div>
                      </div>
                      <div className="table-rank-item">
                        <div className="no-rank">19</div>
                        <div className="rank-detail">
                          <div className="rank-phone">095-xxx-xxxx</div>
                          <div className="rank-detail-title">ยอด</div>
                          <div className="rank-money">351,353</div>
                        </div>
                      </div>
                      <div className="table-rank-item">
                        <div className="no-rank">20</div>
                        <div className="rank-detail">
                          <div className="rank-phone">095-xxx-xxxx</div>
                          <div className="rank-detail-title">ยอด</div>
                          <div className="rank-money">351,353</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- tournament modal end --> */}

        {/* <!-- End Modal --> */}
      </main>
    </div>
  )
}

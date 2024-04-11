import React, { useState, useRef, useEffect } from "react";

const Sidebar = ({ sidebarUseRef, sidebarAnimation, closeSidebar, setSidebarAnimation, setSidebarVisible, sidebarVisible }) => {

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const pageClickEvent = (e) => {
            // If the active element exists and is clicked outside of
            if (sidebarUseRef.current !== "") {
                setSidebarAnimation(false);
                setTimeout(() => {
                    setSidebarVisible(false);
                }, 500);
            }
        };

        if (sidebarVisible) {
            window.addEventListener("click", pageClickEvent);
        }

        return () => {
            window.removeEventListener("click", pageClickEvent);
        };
    }, [sidebarVisible]);

    return (
        <div>
            <div className="sidebar-container" ref={sidebarUseRef}>
                <aside
                    className="sidebar"
                    style={{
                        animation: `${sidebarAnimation ? "slideInFromLeft" : "slideInToLeft"
                            } 0.5s ease-in-out`,
                    }}
                >
                    <div
                        className="icon-turn-back"
                        onClick={() => closeSidebar()}
                        onKeyDown={() => ""}
                    >
                        <img src="/assets/images/turn-back 1.png" alt="logo" />
                    </div>
                    <img src="/assets/images/newicon/TTcc-01.png" alt="logo" />
                    <div className="flexBetween font-14">
                        <p>Username:</p>
                        <p>ST1561651</p>
                    </div>
                    <div className="flexBetween font-14">
                        <p>Phone :</p>
                        <p>095-222-9999</p>
                    </div>
                    <div className="balance">
                        <small>ยอดเงินคงเหลือ</small>
                        <p>1,000.00</p>
                    </div>

                    <div className="flexBetween" style={{ gap: 13 }}>
                        <button
                            type="button"
                            className="gradient-border sidebar-button flexCenter"
                            style={{ width: "50%" }}
                            data-bs-toggle="modal"
                            data-bs-target="#profile"
                        >
                            โปรไฟล์
                        </button>
                        <button
                            type="button"
                            className="gradient-border sidebar-button flexCenter"
                            data-bs-toggle="modal"
                            data-bs-target="#depositWithdraw"
                            style={{ width: "50%" }}
                        >
                            ฝาก-ถอน
                        </button>
                    </div>
                    <div className="flexBetween" style={{ gap: 1 }}>
                        <button
                            type="button"
                            className="gradient-border sidebar-button flexCenter"
                            style={{ width: "50%" }}
                            id="bag-modal-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#bagModal"
                        >
                            กระเป๋า
                        </button>
                        <button
                            type="button"
                            className="gradient-border sidebar-button flexCenter"
                            style={{ width: "50%" }}
                            id="history-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#historyModal"
                        >
                            ประวัติ
                        </button>
                    </div>
                    <div className="flexBetween" style={{ gap: 13 }}>
                        <button
                            type="button"
                            className="gradient-border sidebar-button flexCenter"
                            style={{ width: "50%" }}
                        >
                            ไลน์บอท
                        </button>
                        <button
                            type="button"
                            className="gradient-border sidebar-button flexCenter"
                            style={{ width: "50%" }}
                        >
                            ติดต่อพนักงาน
                        </button>
                    </div>
                    <button
                        type="button"
                        className="gradient-border sidebar-button flexCenter"
                        style={{ width: "100%", marginBottom: 16 }}
                        data-bs-toggle="modal"
                        data-bs-target="#changePasswordModal"
                    >
                        เปลี่ยนรหัสผ่าน
                    </button>
                    <button
                        type="button"
                        className="gradient-border sidebar-button flexCenter"
                        style={{ width: "100%", marginBottom: 16 }}
                    >
                        ออกจากระบบ
                    </button>
                    <div className='power-by'>
                        <h4>Power by</h4>
                        <img
                            style={{ width: 200 }}
                            src="/assets/images/newicon/TTT-03.png"
                            alt="powerby"
                        />
                    </div>
                </aside>
                <div className="sidebar-container-background" />
            </div>
        </div>
    )
}

export default Sidebar;

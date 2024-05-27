/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jsQR from 'jsqr';
import {
    faChevronCircleLeft,
    faChevronCircleRight,
    faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";

import "react-slideshow-image/dist/styles.css";
import "react-slideshow-image/dist/styles.css";
import {
    CheckLevelCashBack,
    DataLoginInRout,
    FillerCategory,
    LogoutClearLocalStorage,
    OpenNewTabWithHTML,
} from "../../helper";
import Constant, { AGENT_CODE } from "../../constant";
import { BackList } from "../../constant/bankList";
import _LoginController from "../../api/login";
import { errorAdd, successAdd } from "../../helper/sweetalert";
import QRCode from 'qrcode.react';
import Roulette from "../../component/Roulette";
import CryptoJS from 'crypto-js';



export default function AfterLogin() {
    const history = useHistory();
    const sidebarUseRef = useRef(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [sidebarAnimation, setSidebarAnimation] = useState(true);
    const [tabs, setTabs] = useState("ประวัติฝาก");
    const [tabName, setTabName] = useState("tab-deposit");
    const [reMessage, setReMessage] = useState("");
    const [maxLevel, setmaxLevel] = useState();
    const [historyCashBack, setHistoryCashBack] = useState([]);
    const [dataPromotion, setDataPromotion] = useState([]);
    const [disableArrow, setDisableArrow] = useState(false);
    const { ChangePassword } = _LoginController();
    const [dataFromLogin, setDataFromLogin] = useState({});
    const [dataGameList, setDataGameList] = useState();
    const [categoryGame, setCategoryGame] = useState([]);
    const [deviceType, setDeviceType] = useState(false);
    const [dataGameType, setDataGameType] = useState("SLOT"); // FAVORITE || HOTHIT
    const [dataUser, setDataUser] = useState();
    const [dataHistoryDeposit, setDataHistoryDeposit] = useState([]);
    const [dataHistoryBonus, setDataHistoryBonus] = useState([]);
    const [dataHistoryWithdraw, setDataHistoryWithdraw] = useState([]);
    const [depositBankList, setDepositBankList] = useState();
    const [current, setCurrent] = useState(0);
    const [sliderData, setSliderData] = useState([]);
    const [percentageData, setPercentageData] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [oldPassword, setOldPassword] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [NewPasswordVery, setNewPasswordVery] = useState("");
    const [logoWebsite, setLogoWebsite] = useState("");
    const [linkLine, setLinkLine] = useState("");
    const [numberQRCode, setNumberQRCode] = useState("");
    const [file, setFile] = useState(null);
    const [bankAgentCode, setBankAgentCode] = useState("");
    const [errorTextUploadSlip, setErrorTextUploadSlip] = useState('');
    const [promotionCode, setPromotionCode] = useState('');
    const [dataSpinWheel, setDataSpinWheel] = useState([]);
    const [outputSpin, setOutputSpin] = useState("");
    const [limitSpinWheel, setLimitSpinWheel] = useState({});
    const [currentPoint, setCurrentPoint] = useState({});

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
            setDeviceType("Mobile");
            // console.log("Mobile: ");
        } else {
            setDeviceType("Desktop");
            // console.log("Desktop: ");
        }
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

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(current === length - 1 ? 0 : current + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, [current]);

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
    const _clickTabDeposit = (tab) => {
        setTabName(tab);
        if (tab === "tab-deposit") {
            setTabs("ประวัติฝาก");
        } else if (tab === "tab-withdraw") {
            setTabs("ประวัติถอน");
        } else {
            setTabs("ประวัติโบนัส");
        }
    };

    useEffect(() => {
        const _data = DataLoginInRout(history?.location?.state);
        console.log("_data: ", _data)

        if (_data) {
            setLogoWebsite(_data?.info?.configLobby?.s_logo)
            setLinkLine(_data?.info?.configLobby?.s_line)
            setDataFromLogin(_data);
            const slideArray = _data?.info?.slide ? Object.values(_data?.info?.slide) : [];
            const newSlideArray = slideArray.filter(data => data.s_position === "page_wallet");
            setSliderData(newSlideArray)
            setDepositBankList(_data?.info?.bankDeposit[0])
            getQRCode(_data?.info?.bankDeposit[0]?.s_account_no);
            const color = BackList.filter((data) => data?.bankName === _data?.info?.bankDeposit[0]?.s_fname_th)
            if (color?.length > 0) {
                setDepositBankList({ ..._data?.info?.bankDeposit[0], background: color[0].backgroundColor })
            }

        }
        setDataPromotion(history?.location?.state?.info?.promotionList);
        if (_data === undefined) {
            history.push(Constant?.HOME)
        }
        getSpinWheel();
    }, []);


    const getQRCode = async (accountNumber) => {
        const _data = await axios.post(`${Constant.SERVER_URL}/genarate-qr-code/${Constant.AGENT_CODE}`, {
            recipientAccountNum: accountNumber
        });
        setNumberQRCode(_data?.data?.data?.respData?.qrCode)
    }

    const getSpinWheel = async () => {
        let data = JSON.stringify({
            "s_agent_code": Constant?.AGENT_CODE
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://2ov8dxycl0.execute-api.ap-southeast-1.amazonaws.com/api/v1/LuckyWheel/Inquiry?XDEBUG_SESSION_START=netbeans-xdebug',
            headers: {
                'authorization-agent': '{{AUTHEN-VALUE-AGENT}}',
                'authorization-token': '{{AUTHEN-VALUE-TOKEN}}',
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                setDataSpinWheel(response.data.data[0]?.eventItem)
                setLimitSpinWheel(response.data.data[0])
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        _clickCategoryGame("SLOT");
        if (dataFromLogin) {
            _getData();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataFromLogin]);

    const _getData = async () => {
        const _res = await axios({
            method: "post",
            url: `${Constant.SERVER_URL}/Member/Balance`,
            data: {
                s_agent_code: dataFromLogin?.agent,
                s_username: dataFromLogin?.username,
            },
        });
        if (_res?.data?.statusCode === 0) {
            setDataUser(_res?.data?.data);
        }
        const _level = await CheckLevelCashBack(dataFromLogin?.info?.cashback);
        if (_level) setmaxLevel(_level);
        const _resHistoryCashBack = await axios({
            method: "post",
            url: `${Constant.SERVER_URL}/Cashback/History`,
            data: {
                s_agent_code: dataFromLogin?.agent,
                s_username: dataFromLogin?.username,
            },
        });

        if (_resHistoryCashBack?.data?.statusCode === 0) {
            setHistoryCashBack(_resHistoryCashBack?.data?.data);
        }
        const _resHistoryMoney = await axios({
            method: "post",
            url: `${Constant.SERVER_URL}/Member/History/Finance`,
            data: {
                s_agent_code: AGENT_CODE,
                s_username: dataFromLogin?.username,
            },
        });

        if (_resHistoryMoney?.data?.statusCode === 0) {
            setDataHistoryDeposit(_resHistoryMoney?.data?.data?.deposit);
            setDataHistoryBonus(_resHistoryMoney?.data?.data?.bonus);
            setDataHistoryWithdraw(_resHistoryMoney?.data?.data?.withdraw);
        }
    };

    const _clickCategoryGame = async (value) => {
        setDataGameType(value);
        setDataGameList([]);
        if (value === "FAVORITE") {
            const _getData = await axios({
                method: "post",
                url: `${Constant.SERVER_URL}/Game/Brand/List`,
                data: {
                    s_agent_code: dataFromLogin?.agent,
                    s_username: dataFromLogin?.username,
                },
            });

            if (_getData?.data?.statusCode === 0) {
                setCategoryGame(_getData?.data?.data?.FAVORITE);
            }
        } else {
            setDataGameList();
            FillerCategory(value, setCategoryGame);
        }
    };

    const _clickFavorite = async (value) => {
        setDataGameType("FAVORITE");
        setDataGameList([]);
        const _getData = await axios({
            method: "post",
            url: `${Constant.SERVER_URL}/Game/Brand/List`,
            data: {
                s_agent_code: dataFromLogin?.agent,
                s_username: dataFromLogin?.username,
            },
        });
        if (_getData?.data?.statusCode === 0) {
            setCategoryGame(_getData?.data?.data?.FAVORITE);
        }
    };

    const _addFavorite = async (value) => {
        const _getData = await axios({
            method: "post",
            url: `${Constant.SERVER_URL}/Favorite/Select`,
            data: {
                s_agent_code: dataFromLogin?.agent,
                s_username: dataFromLogin?.username,
                id_favorite: value?.id_favorite,
                actionBy: "ADM",
            },
        });

        if (_getData?.data?.statusCode === 0) {
            if (dataGameType === "FAVORITE" || dataGameType === "HOTHIT") {
                _clickCategoryGame(dataGameType);
            } else {
                _getDataGame(value);
            }
        }
    };

    const _getDataGame = async (value) => {
        if (value?.s_type === "CASINO" || value?.s_type === "SPORT") {
            _getDataGamePlayGame(value);
            return;
        }

        const _res = await axios({
            method: "post",
            url: `${Constant.SERVER_URL}/Game/ListGame`,
            data: {
                s_agent_code: Constant.AGEN_CODE,
                s_brand_code: value?.s_brand_code,
                s_username: dataFromLogin?.username,
            },
        });
        if (_res?.data?.statusCode === 0) {
            setDataGameList(_res?.data?.data);
            let dataLength = _res?.data?.data?.length;
            generatePercentageData(dataLength);
            const intervalId = setInterval(() => {
                generatePercentageData(dataLength);
            }, 5000);
            return () => clearInterval(intervalId);
        }
    };

    const _getDataGamePlayGame = async (value, type) => {
        try {
            const _data = {
                s_game_code:
                    value?.s_type === "CASINO"
                        ? "B001"
                        : value?.s_type === "SPORT"
                            ? "B001"
                            : value?.s_game_code,
                s_brand_code: value?.s_brand_code,
                s_username: dataFromLogin?.username,
                s_agent_code: Constant?.AGEN_CODE,
                isMobile: deviceType === "Mobile" ? "true" : "false",
                ip_client: "184.22.14.167",
                s_lang: "th",
            };
            // Send the data to the server to get the game URL
            const _res = await axios({
                method: "post",
                url: `${Constant.SERVER_URL}/Game/Access`,
                data: _data,
            });

            if (_res?.data?.url) {
                setTimeout(() => {
                    window.open(_res?.data?.url, '_blank');
                })
            }
            if (_res?.data?.res_html) {
                setTimeout(() => {
                    OpenNewTabWithHTML(_res?.data?.res_html);
                })
            }
        } catch (error) {
            console.error("Error playing the game:", error);
        }
    };

    const _withdrawMoney = async () => {
        try {
            const _data = {
                s_agent_code: Constant?.AGEN_CODE,
                s_username: dataFromLogin?.username,
                f_amount: dataUser?.amount,
                i_bank: dataFromLogin?.info?.bankList[0]?.id,
                i_ip: "1.2.3.4",
                actionBy: "adm",
            };
            // Send the data to the server to get the game URL
            const _res = await axios({
                method: "post",
                url: `${Constant.SERVER_URL}/Withdraw/CreateTransaction`,
                data: _data,
            });
            if (_res?.data?.statusCode === 0) {
                Swal.fire({
                    icon: 'success',
                    title: "ทำรายการสำเร็จ",
                    showConfirmButton: false,
                    timer: 2000,
                    background: '#242424', // Change to the color you want
                    color: '#fff',
                });
                _getData();
            } else {
                setReMessage(_res?.data?.statusDesc);
            }
        } catch (error) { }
    };
    //  =================> ChangePassword <=================

    const _ChangePassword = async () => {
        try {
            if (NewPassword !== NewPasswordVery) {
                setReMessage("รหัสผ่านใหม่ และ ยืนยันรหัสผ่านใหม่ ไม่ตรงกัน");
                return;
            }
            const _data = await ChangePassword(NewPassword, oldPassword);
            if (_data?.data) {
                setReMessage(_data?.data?.statusDesc);
                if (_data?.data.statusCode === 0) {
                    LogoutClearLocalStorage();
                }
            }
        } catch (error) {
            console.error("Error playing the game:", error);
        }
    };

    const _copyLinkAffiliate = (link) => {
        navigator.clipboard.writeText(link);
        Swal.fire({
            icon: 'success',
            title: "คัดลอกลิ้งสำเร็จ",
            showConfirmButton: false,
            timer: 2000,
            background: '#242424', // Change to the color you want
            color: '#fff',
        });
    };
    const [codeCupon, setCodeCupon] = useState("");
    const _addCupon = async () => {
        try {
            const _data = await axios.post(`${Constant.SERVER_URL}/Coupon/Receive`, {
                s_agent_code: Constant?.AGEN_CODE,
                s_username: dataFromLogin?.username,
                s_code: codeCupon,
                actionBy: "ADM",
            });
            if (_data?.data) {
                setReMessage(_data?.data?.statusDesc);
            }
        } catch (error) {
            console.error("Error playing the game:", error);
        }
    };

    const [nextSliderPage, setNextSliderPage] = useState(0);

    const _newSl = (value) => {
        if (dataPromotion?.length > 0) {
            if (value === "ADD") {
                if (nextSliderPage === dataPromotion?.length - 1) {
                    setNextSliderPage(dataPromotion?.length - 1);
                } else {
                    setNextSliderPage(nextSliderPage + 1);
                }
            } else {
                if (nextSliderPage === 0) {
                    setNextSliderPage(0);
                } else {
                    setNextSliderPage(nextSliderPage - 1);
                }
            }
        }
    };

    const apoverPromotion = async (value) => {
        try {
            const _resAppover = await axios.post(
                `${Constant.SERVER_URL}/Deposit/Promotion/Select`,
                {
                    s_agent_code: Constant?.AGEN_CODE,
                    s_username: dataFromLogin?.username,
                    s_type: "AUTO",
                    s_prm_code: value?.s_code,
                    i_ip: "1.2.3.4",
                    actionBy: "ADM",
                },
            );
            if (_resAppover?.data?.statusCode === 0) {
                successAdd("รายการสำเร็จ");
                setTimeout(() => {
                    // handleShow();
                }, 2000);
                return;
            }
            errorAdd(_resAppover?.data?.statusDesc);
        } catch (error) {
            errorAdd("รายการไม่สำเร็จ");
        }
    };

    const _resiveCashBack = async () => {
        try {
            const _res = await axios({
                method: "post",
                url: `${Constant.SERVER_URL}/Affiliate/Receive`,
                data: {
                    s_agent_code: dataFromLogin?.agent,
                    s_username: dataFromLogin?.username,
                    f_amount: dataFromLogin?.balance?.cashback,
                    actionBy: "ADM",
                },
            });
            if (_res?.data) {
                setReMessage(_res?.data?.statusDesc);
            }
            if (_res?.data?.statusCode === 0) {
                _getData();
            }
        } catch (error) {
            console.log("🚀 ~ const_login= ~ error:", error);
        }
    };

    const _getOptionBank = () => {
        setDisableArrow(!disableArrow)

    }
    const _getOptionBank2 = (bankName) => {
        setDisableArrow(!disableArrow)
        const newData = JSON.parse(bankName);
        const color = BackList.filter((data) => data?.bankName === newData?.s_fname_th)
        if (color?.length > 0) {
            setDepositBankList({ ...newData, background: color[0].backgroundColor })
        }
    }
    const _getOptionBankQR = (bankName) => {
        getQRCode(bankName)
    }
    const _copyAccountNo = (accountNo) => {
        navigator.clipboard.writeText(accountNo);
        Swal.fire({
            icon: 'success',
            title: "คัดลอกลิ้งสำเร็จ",
            showConfirmButton: false,
            timer: 2000,
            background: '#242424', // Change to the color you want
            color: '#fff',
        });
    };

    const length = sliderData.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(sliderData) || sliderData.length <= 0) {
        return null;
    }

    const generatePercentageData = (count) => {
        const data = [];
        for (let i = 0; i < count; i++) {
            const percentage = Math.random();
            data.push({ percentage: percentage });
        }
        setPercentageData(data);
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFile = async () => {
        if (!file) return;

        const _URL = window.URL || window.webkitURL;
        const url = _URL.createObjectURL(file);
        console.log("A");
        const imgData = await uploadSlip(url);
        document.getElementById('fileslip').value = '';
        if (imgData != null) {
            try {
                const response = await axios.post(`${Constant.SERVER_URL}/Deposit/Slip`, {
                    actionBy: dataFromLogin?.username,
                    s_agent_code: dataFromLogin?.agent,
                    s_username: dataFromLogin?.username,
                    qrcode: imgData.data,
                    i_bank_agent: bankAgentCode,
                    i_ip: "1.2.3.4",
                    s_prm_code: promotionCode,
                });
                console.log("response: ", response)
                setErrorTextUploadSlip(response?.data?.statusDesc)
                notify(response.data);
            } catch (error) {
                console.error("AAAA", error);
            }
        } else {
            notify({ statusDesc: 'Failed to read QR code' });
        }
    };

    const uploadSlip = async (url) => {
        console.log("url: ", url)
        let imgData = null;
        const minScale = 0.75;
        const maxScale = 5;
        const step = 0.25;
        let currentScale = minScale;
        do {
            imgData = await addImageProcess(url, currentScale);
            currentScale += step;
        } while (imgData === null && currentScale <= maxScale);

        return imgData;
    };

    const addImageProcess = (src, scale) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                canvas.width = Math.floor(img.width * scale);
                canvas.height = Math.floor(img.height * scale);

                const ctx = canvas.getContext('2d');
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
                const pixels = imgData.data;
                for (let i = 0; i < pixels.length; i += 4) {
                    const lightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
                    pixels[i] = lightness;
                    pixels[i + 1] = lightness;
                    pixels[i + 2] = lightness;
                }
                ctx.putImageData(imgData, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, canvas.width, canvas.height);
                resolve(code);
            };
            img.onerror = reject;
            img.src = src;
        });
    };

    const notify = (data) => {
        console.log(data);
    };

    const _getBankAgentCode = (event) => {
       console.log("BANK_EVENT", event)
        let data = JSON.stringify({
            "data": event
        });
        console.log("DATA_BANK", data);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${Constant.SERVER_URL}/Decrypt`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                setBankAgentCode(response.data.decrypt)
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });


    }

    return (
        <div>
            <header className="login-page-header">
                <img
                    src="/assets/images/icon-hamburger.svg"
                    alt="hamburger"
                    className="hamburger"
                    height="37px"
                    width="35px"
                    onClick={(event) => toggleSidebar(event)}
                    onKeyDown={() => ""}
                />
                <div className="left">
                    <div className="coin-balance">
                        <img src="/assets/images/gif/border-card-bank.gif" alt="coin" />
                        {dataUser?.amount}
                    </div>
                </div>
                <div className="middle">
                    <img
                        src={`data:image/jpeg;base64,${logoWebsite}`}
                        alt="logo"
                        height="49px"
                        style={{ cursor: "pointer" }}
                        id="banner"
                    />
                </div>
                <div className="right">
                    <div className="gem-balance">
                        <img src="/assets/images/gem.svg" alt="gem" />
                        {dataUser?.point}
                    </div>

                </div>
            </header>
            <main className="home">
                <div className="brand">
                    <div className="slideshow-container">
                        <div className="mySlides fade-slide">
                            <div className='left-arrow' onClick={() => prevSlide()} onKeyDown={() => ''}>❮</div>
                            <div className='right-arrow' onClick={() => nextSlide()} onKeyDown={() => ''}>❯</div>
                            {sliderData?.length > 0 && sliderData?.map((slide, index) => {
                                return (
                                    <div
                                        className={index === current ? 'slide1 active' : 'slide1'}
                                        key={index}
                                    >
                                        {index === current && (
                                            <img src={slide?.s_image ? `data:image/jpeg;base64,${slide?.s_image}` : '/assets/images/Cardgame/image 70.png'} alt='travel' style={{ width: '100%' }} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <section className="featured-game-wrapper">
                    <div className="container flexBetween">
                        <div className="featured-game flexBetween" onClick={() => _clickFavorite()} onKeyDown={() => ''}>
                            <img src="/assets/images/newicon/favorite.png" alt="game icon" />
                            <p>เกมโปรด</p>
                        </div>
                        <div className="featured-game flexBetween" onClick={() => _clickCategoryGame("HOTHIT")} onKeyDown={() => ''}>
                            <img src="/assets/images/newicon/hothit.png" alt="game icon" />
                            <p style={{ fontSize: 20 }}>เป็นที่นิยม</p>
                        </div>
                        <div className="featured-game flexBetween" onClick={() => _clickCategoryGame("SLOT")} onKeyDown={() => ''}>
                            <img src="/assets/images/newicon/iconnew-01.png" alt="game icon" />
                            <p>สล็อต</p>
                        </div>
                        <div className="featured-game flexBetween" onClick={() => _clickCategoryGame("CASINO")} onKeyDown={() => ''}>
                            <img src="/assets/images/newicon/iconnew-02.png" alt="game icon" />
                            <p>คาสิโน</p>
                        </div>
                        <div className="featured-game flexBetween" onClick={() => _clickCategoryGame("FISHING")} onKeyDown={() => ''}>
                            <img src="/assets/images/newicon/iconnew-03.png" alt="game icon" />
                            <p>ยิงปลา</p>
                        </div>
                        <div className="featured-game flexBetween" onClick={() => _clickCategoryGame("SPORT")} onKeyDown={() => ''}>
                            <img src="/assets/images/newicon/iconnew-05.png" alt="game icon" />
                            <p>กีฬา</p>
                        </div>
                    </div>
                </section>

                <section className="card-container">
                    <div className="card-wrapper">
                        {dataGameList?.length ? dataGameList?.map((game, index) =>
                            <div key={game?.index} className="game-card">
                                <div style={{
                                    position: "absolute",
                                    top: "0", right: "0",
                                    zIndex: 1,
                                    backgroundColor: game?.s_flg_favorite === "Y" ? "#FE2147" : "#A4A4A4",
                                    padding: 8,
                                    borderRadius: "50%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    display: "flex",
                                }} onClick={() => _addFavorite(game)} onKeyDown={() => ''}>
                                    <FontAwesomeIcon icon={faHeart} style={{ color: "white", fontSize: 25 }} />
                                </div>
                                <div className="percentage">
                                    RTP {(percentageData[index]?.percentage * 100).toFixed(2)} %
                                </div>
                                <img
                                    src={game?.s_img ?? "/assets/images/jilli_card.svg"}
                                    id="game-card"
                                    className="game-image"
                                    alt="game"
                                    onClick={() => _getDataGamePlayGame(game)}
                                    onKeyDown={() => ''}
                                />
                            </div>) : categoryGame?.length > 0 && categoryGame?.map((item, index) => (
                                <div
                                    key={item?.index}
                                    className="game-card"
                                    style={{ marginLeft: index === 0 ? 70 : 20 }}
                                >
                                    {dataGameType === "FAVORITE" ||
                                        dataGameType === "HOTHIT" ?
                                        <div style={{
                                            position: "absolute",
                                            top: "0", left: "0",
                                            zIndex: 1,
                                            backgroundColor: "#FE2147", //"#A4A4A4"
                                            padding: 8,
                                            borderRadius: "50%",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            display: "flex",
                                        }} onClick={() => _addFavorite(item)} onKeyDown={() => ''}>
                                            <FontAwesomeIcon icon={faHeart} style={{ color: '#FFF', fontSize: 25 }} />
                                        </div> : null}
                                    {item?.s_img !== undefined ? (
                                        <img
                                            src={item?.s_img}
                                            style={{ width: 148, height: 183, }}
                                            id="game-card"
                                            className="game-image"
                                            alt="game"
                                            onKeyDown={() =>
                                                ""
                                            }
                                            onClick={() =>
                                                dataGameType === "FAVORITE" ||
                                                    dataGameType === "HOTHIT" ||
                                                    dataGameType === "FISHING"
                                                    ? _getDataGamePlayGame(
                                                        item, "FISHING"
                                                    )
                                                    : _getDataGame(
                                                        item,
                                                    )
                                            }
                                        />
                                    ) : (
                                        <img
                                            src={item?.s_lobby_url}
                                            id="game-card"
                                            className="url"
                                            alt="game"
                                            onKeyDown={() =>
                                                ""
                                            }
                                            onClick={() =>
                                                dataGameType ===
                                                    "FAVORITE" ||
                                                    dataGameType ===
                                                    "HOTHIT"
                                                    ? _getDataGamePlayGame(
                                                        item,
                                                    )
                                                    : _getDataGame(
                                                        item,
                                                    )
                                            }
                                        />
                                    )}
                                </div>
                            ))}

                    </div>
                </section>
                <div className="partnership-container" />
                {sidebarVisible ? (
                    <div className="sidebar-container" ref={sidebarUseRef}>
                        <aside className="sidebar"
                            style={{
                                animation: `${sidebarAnimation ? "slideInFromLeft" : "slideInToLeft"
                                    } 0.5s ease-in-out`,
                            }}>
                            <div
                                className="icon-turn-back"
                                onClick={() => closeSidebar()}
                                onKeyDown={() => ""}
                            >
                                <img src="/assets/images/turn-back 1.png" alt="logo" />
                            </div>
                            <img src={`data:image/jpeg;base64,${logoWebsite}`} alt="logo" />
                            <div className="flexBetween font-14">
                                <p>Username:</p>
                                <p>{dataFromLogin?.username}</p>
                            </div>
                            {/* <div className="flexBetween font-14">
                                <p>Phone :</p>
                                <p>{dataFromLogin?.info?.s_phone}</p>
                            </div> */}
                            <div className="balance">
                                <small>ยอดเงินคงเหลือ</small>
                                <p>{dataFromLogin?.balance?.amount}</p>
                            </div>

                            <div className="flexBetween" style={{ gap: 13 }}>
                                <button
                                    type='button'
                                    className="gradient-border sidebar-button flexCenter"
                                    style={{ width: '50%' }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#profile"
                                >
                                    โปรไฟล์
                                </button>
                                <button
                                    type='button'
                                    className="gradient-border sidebar-button flexCenter"
                                    data-bs-toggle="modal"
                                    data-bs-target="#depositWithdraw"
                                    style={{ width: "50%" }}
                                >
                                    ฝาก-ถอน
                                </button>
                            </div>
                            <div className="flexBetween" style={{ gap: 13 }}>
                                <button
                                    type='button'
                                    className="gradient-border sidebar-button flexCenter"
                                    style={{ width: "50%" }}
                                    id="bag-modal-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#bagModal"
                                >
                                    กระเป๋า
                                </button>
                                <button
                                    type='button'
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
                                    type='button'
                                    className="gradient-border sidebar-button flexCenter"
                                    style={{ width: "50%" }}
                                >
                                    ไลน์บอท
                                </button>
                                {/*
                                <button
                                    type='button'
                                    className="gradient-border sidebar-button flexCenter"
                                    style={{ fontSize: 17, width: "100%" }}
                                > */}
                                <a target="_blank"
                                    className="gradient-border sidebar-button flexCenter"
                                    style={{ fontSize: 17, width: "50%", textDecoration: "none" }} href={linkLine} rel="noreferrer">
                                    ติดต่อเรา
                                </a>

                                {/* </button> */}
                            </div>
                            <button
                                type='button'
                                className="gradient-border sidebar-button flexCenter"
                                style={{ width: "100%", marginBottom: 16 }}
                                data-bs-toggle="modal"
                                data-bs-target="#changePasswordModal"
                            >
                                เปลี่ยนรหัสผ่าน
                            </button>
                            <button
                                type='button'
                                className="gradient-border sidebar-button flexCenter"
                                data-bs-toggle="modal"
                                data-bs-target="#confirmLogout"
                                style={{ width: "100%", marginBottom: 16 }}
                            >
                                ออกจากระบบ
                            </button>

                            {/* <div className="download-container">
                                <h3>ดาวน์โหลดแอปเลย !</h3>
                                <div className="flexBetween" style={{ gap: 6 }}>
                                    <img
                                        src="/assets/images/get-it-playstore.svg"
                                        alt="download icon"
                                        style={{ height: 32, cursor: "pointer" }}
                                    />
                                    <img
                                        src="/assets/images/get-it-appstore.svg"
                                        alt="download icon"
                                        style={{ height: 32, cursor: "pointer" }}
                                    />
                                </div>
                            </div> */}

                            {/* <h4>Power by</h4>
                            <img src={`data:image/jpeg;base64,${logoWebsite}`} alt="powerby" /> */}
                        </aside>
                        <div className="sidebar-container-background" />
                    </div>
                ) : null}
                {/* <!-- Login Modal --> */}
                <div className="login-modal flexCenter">
                    <div className="modal flexCenter" id="login-modal">
                        <img
                            src="/assets/icons/x-close.svg"
                            alt="close-icon"
                            className="close-btn"
                            id="login-modal-close-btn"
                        />
                        <img src="/assets/images/newicon/TTT-03.png" alt="logo" />
                        <h3>เข้าสู่ระบบ</h3>
                        <div className="phone-input">
                            <img src="/assets/icons/phone.svg" alt="icon" />
                            <label for="phone" />
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="เบอร์โทรศัพท์"
                            />
                        </div>

                        <div className="button-container">
                            <button type='button' id="login-btn">เข้าสู่ระบบ</button>
                            <button type='button'>สมัครสมาชิก</button>
                        </div>
                    </div>
                    <div className="background" id="login-modal-background" />
                </div>

                {/* <!-- modal --> */}

                {/* <!-- start profile --> */}
                <div
                    className="modal fade"
                    id="profile"
                    tabindex="-1"
                    aria-labelledby="profile"
                    aria-hidden="true"
                ><div className="modal-dialog">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        {/* <img
                                            src="/assets/icons/icon-back-modal.svg"
                                            className="modal-icon-back"
                                            alt=""
                                            data-bs-dismiss="modal"
                                        /> */}
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
                                    <div className="change-profile-modal-content">
                                        {dataFromLogin?.info?.bankList?.length > 0 && dataFromLogin?.info?.bankList?.map((item, index) => (
                                            <div key={index}>
                                                <div className="user">
                                                    <p className="username">Bank</p>
                                                    <div>
                                                        {item?.s_icon.split(".")[0]}
                                                        <img style={{ width: 50, height: 50 }} src={`/assets/images/bank/${item?.s_icon}`} alt="logo bank" className="result" />
                                                    </div>
                                                </div>
                                                <br />
                                                <div className="user">
                                                    <p className="username">Account Number</p>
                                                    <p className="result">{item?.s_account_no}</p>
                                                </div><br />
                                                <div className="user">
                                                    <p className="username">Account Name</p>
                                                    <p className="result">{item?.s_account_name}</p>
                                                </div>
                                            </div>
                                        ))}

                                        <div style={{ border: "1px solid #b78113" }} />
                                        {/* <div className="user">
                                            <p className="username">ชื่อ</p>
                                            <p className="result">{dataFromLogin?.info?.profile?.s_firstname}</p>
                                        </div> */}
                                        <div className="user">
                                            <p className="username">Line ID</p>
                                            <p className="result">{dataFromLogin?.info?.profile?.s_line}</p>
                                        </div>
                                        <div className="user">
                                            <p className="username">Username</p>
                                            <p className="result">{dataFromLogin?.info?.profile?.s_username}</p>
                                        </div>
                                        <div className="password">
                                            <p className="pass">Password</p>
                                            <p className="result">************</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- end profile --> */}

                {/* <!-- start cashback --> */}
                <div
                    className="modal fade"
                    id="cashback"
                    tabindex="-1"
                    aria-labelledby="cashback"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img
                                            src="/assets/icons/icon-back-modal.svg"
                                            className="modal-icon-back"
                                            alt=""
                                            data-bs-toggle="modal"
                                            data-bs-target="#cashbackDetail"
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
                    <div className="modal-dialog">
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
                                    <div className="change-cashback-detail-modal-content">
                                        <div className="detail" style={{ display: "flex", flexDirection: "column" }}>
                                            <div className="your-loss">ยอดเสียสะสมของคุณ (คืนยอดเสีย  {maxLevel} %)</div>
                                            <button
                                                aria-label="Close"
                                                type='button'
                                                className="withdraw-to-accont" style={{ backgroundColor: "green", color: "white", padding: 10, borderRadius: 8 }}
                                                data-bs-toggle="modal"
                                                data-bs-target="#historyCashback"
                                                data-bs-dismiss="modal"
                                            >ประวัติการรับ</button>
                                            <div className="loss">{dataFromLogin?.balance?.cashback}</div>
                                            <div style={{ textAlign: "center", fontSize: 14 }} >อัพเดทล่าสุด {historyCashBack?.length > 0 && historyCashBack[historyCashBack?.length - 1]?.d_create}</div>
                                            <div className="btn">
                                                <button type='button' className="receive-credit" onClick={() => _resiveCashBack()}>รับเข้าเครดิต</button>
                                            </div>
                                            <div style={{ textAlign: "center", color: "red" }}>{reMessage}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- end cashback detail --> */}

                {/* <!-- start  modal ฝาก - ถอน --> */}
                <div
                    className="modal fade"
                    id="depositWithdraw"
                    tabindex="-1"
                    aria-labelledby="depositWithdraw"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img
                                            src="/assets/icons/icon-back-modal.svg"
                                            className="modal-icon-back"
                                            alt=""
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
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
                                    {/* <div className="detail-card-kbank">
                                        <div className="card-kbank">
                                            <div className="font-17" style={{ marginTop: 20 }}>
                                                <p>ธนาคารกสิกรไทย</p>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    KBank
                                                    <img
                                                        src="/assets/icons/logo-kbank.svg"
                                                        alt="logo"
                                                        style={{ marginTop: -15 }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-17">นาย xxxxx xxxxx</p>
                                                <p style={{ marginTop: 13, fontSize: 14 }}>
                                                    ยอดคงเหลือในระบบ
                                                </p>
                                            </div>
                                            <div className="font-17">
                                                <p style={{ marginTop: -2 }}>026-999999-9</p>
                                                <p>1000.00 บาท</p>
                                            </div>
                                            <div
                                                style={{
                                                    marginBottom: 30,
                                                    display:
                                                        "flex",
                                                    justifyContent:
                                                        "end",
                                                }}
                                            >
                                                <img src="/assets/icons/visa.svg" alt="visa" />
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="slide-image">
                                        <div className="active" />
                                        <div className="none-active" />
                                    </div>

                                    <div
                                        style={{
                                            marginTop: 20,
                                            display: 'grid',
                                            color: 'white',
                                            gridTemplateColumns: 'repeat(3, 110px)',
                                            gap: 16,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#autoDeposit"
                                            data-bs-dismiss="modal"
                                        >
                                            <div className="type-of-withdrawal" >
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
                                                    <img style={{ width: 56 }} src="/assets/images/qrpay.png" alt="kkk" />
                                                    <div>QR Code</div>
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
                                                    <img src="/assets/images/Withdraw-money.svg" alt="kkk" />
                                                    <div>ถอนเงิน</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div
                                            style={{ cursor: 'pointer' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#qrplay"
                                            data-bs-dismiss="modal"
                                        >
                                            <div className="type-of-withdrawal">
                                                <div className="withdrawal">
                                                    <img src="/assets/images/scan.svg" alt="kkk" />
                                                    <div>QR PAY</div>
                                                </div>
                                            </div>
                                        </div> */}

                                        {/* <div
                                            style={{ cursor: 'pointer' }}
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
                                        </div> */}
                                    </div>

                                    <div
                                        style={{ textAlign: 'center', marginTop: 10, fontSize: 12 }}
                                    >
                                        <div>
                                            พบปัญหา
                                            <span
                                                style={{
                                                    color: 'red',
                                                    textDecoration: 'underline',
                                                    marginLeft: 5,
                                                    // cursor: 'pointer',
                                                }}
                                            >ติดต่อฝ่ายบริการลูกค้า</span>
                                        </div>
                                    </div>
                                    {/* <div className="button-line">
                                        <div>
                                            <img
                                                src="/assets/icons/icon-line.svg"
                                                alt="line"
                                                style={{ width: 30, height: 30 }}
                                            />
                                            ไลน์บอทkk / แจ้งเตือนยอดฝาก - ถอน
                                        </div>
                                    </div> */}
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
                    <div className="modal-dialog">
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
                                    <div className="detail-card-scb1">
                                        <div className="card-scb1" style={{ background: depositBankList && depositBankList?.background }}>
                                            <div className="left">
                                                <p>{depositBankList && depositBankList?.s_fname_th}</p>
                                                <p>{depositBankList && depositBankList?.s_account_name}</p>
                                                <p>{depositBankList && depositBankList?.s_account_no}
                                                    <span>
                                                        <img src="/assets/images/icon-coppy.svg" data-bs-dismiss="modal" onClick={() => _copyAccountNo(depositBankList?.s_account_no)} alt="" style={{ width: 30, height: 30, marginBottom: -3 }} />
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="right">
                                                <div className="bank">
                                                    <h3 style={{ textTransform: "uppercase" }}>{depositBankList && depositBankList?.s_icon.split(".")[0]}</h3>
                                                    <div style={{ borderRadius: '100%', marginTop: -10 }}>
                                                        <img src={`/assets/images/bank/${depositBankList && depositBankList?.s_icon}`} alt="scb" />
                                                    </div>
                                                </div>
                                                <div style={{ marginLeft: 50 }}>
                                                    <div className="deposit-bank-title-pc">เปลี่ยนธนาคาร</div>
                                                    <img onClick={() => _getOptionBank()} onKeyDown={() => ''}
                                                        style={{ width: 30, height: 30, display: disableArrow === true ? "none" : "block", cursor: "pointer" }} src="/assets/images/arrow-bottom.svg" alt="" srcset="" />
                                                    <select
                                                        onChange={(e) => _getOptionBank2(e.target.value)}
                                                        className="deposit-bank-list-pc"
                                                        style={{ display: disableArrow === true ? "block" : "none" }}>
                                                        {dataFromLogin?.info?.bankDeposit?.length > 0 && dataFromLogin?.info?.bankDeposit?.map((bank) => (
                                                            <option key={bank?.index} value={JSON.stringify(bank)}>{bank?.s_fname_th}</option>
                                                        ))}

                                                    </select>
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    <div data-bs-toggle="modal" data-bs-target="#slipVerify" >
                                        <div className="btn-slip">
                                            <div style={{ color: "white" }}>
                                                <img style={{ width: 20, height: 20 }} src="/assets/images/icons8-exclamation-50.png" alt="exclamation" /> แจ้งเงินไม่เข้า /แบบสลิป
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{ textAlign: "center", marginTop: 10, fontSize: 14 }}
                                    >
                                        <div>
                                            พบปัญหา
                                            <span
                                            >ติดต่อฝ่ายบริการลูกค้า</span
                                            >
                                        </div>
                                    </div>
                                    {/* <div className="button-line">
                                        <div>
                                            <img
                                                src="/assets/icons/icon-line.svg"
                                                style={{ width: 28, height: 28 }}
                                                alt="line"
                                            />
                                            ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน
                                        </div>
                                    </div> */}
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
                    <div className="modal-dialog">
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
                                        <p className="modal-title">ฝากเงินด้วย QR Code</p>
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
                                    <div style={{ marginTop: 30, }}>
                                        <select
                                            onChange={(e) => _getOptionBankQR(e.target.value)}
                                        >
                                            {dataFromLogin?.info?.bankDeposit?.length > 0 && dataFromLogin?.info?.bankDeposit?.map((bank) => (
                                                <option key={bank?.index} value={bank?.s_account_no}>{bank?.s_fname_th}</option>
                                            ))}

                                        </select>
                                    </div>
                                    <div style={{ marginTop: 20, background: "#FFFF", padding: 12, borderRadius: 8 }}>
                                        <QRCode style={{ width: 250, height: 250 }} value={numberQRCode} />
                                    </div>
                                    <div style={{ width: 300, marginTop: 20 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>ซื่อธนาคาร: </div>
                                            <div>{depositBankList && depositBankList?.s_fname_th}</div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>เลขบัญชี:</div>
                                            <div>{depositBankList && depositBankList?.s_account_no}</div>
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
                    data-bs-dismiss="modal"
                >
                    <div className="modal-dialog">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img
                                            src="/assets/icons/icon-back-modal.svg"
                                            className="modal-icon-back"
                                            alt=""
                                            data-bs-toggle="modal"
                                            data-bs-target="#leaveAdecimal"
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
                                    <div
                                        style={{
                                            padding: '20px 20px 0 20px',
                                            textAlign: 'center',
                                            fontSize: 14,
                                            fontWeight: 500,
                                        }}
                                    >
                                        ยอดเงินที่ต้องโอน

                                        <div
                                            style={{
                                                fontSize: 40,
                                                fontWeight: 600,
                                                marginTop: 5,
                                                color: '#f9df7b'
                                            }}
                                        >
                                            111.11
                                        </div>
                                        <div style={{ fontSize: 14 }}>
                                            กรุณาโอนเงินภายใน
                                            <span style={{ color: ' #ff0000' }}>00.00</span> นาที
                                        </div>
                                    </div>
                                    <div className="detail-card-scb1">
                                        <div className="card-scb1">
                                            <div className="left">
                                                <p>ธนาคารกสิกรไทย</p>
                                                <p>นาย xxxxx xxxxx</p>
                                                <p>026-999999-9</p>
                                            </div>
                                            <div className="right">
                                                <div className="bank">
                                                    <h3>SCB</h3>
                                                    <div style={{ borderRadius: "100%" }}>
                                                        <img src="/assets/images/scb 1.png" alt="scb" />
                                                    </div>
                                                </div>

                                                <div className="visa">
                                                    <img src="/assets/icons/visa.svg" alt="visa" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="button-validationt">
                                            <div style={{ color: "white" }}>
                                                กรุณาใช้เลขบัญชีที่สมัครโอนเข้ามาเท่านั้น
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "center", marginTop: 10 }}>
                                        <div>
                                            พบปัญหา
                                            <span
                                            // style={{
                                            //     color: ' rgba(0, 252, 252, 1)',
                                            //     textDecoration: 'underline',
                                            //     cursor: 'pointer',
                                            // }}
                                            >ติดต่อฝ่ายบริการลูกค้า</span
                                            >
                                        </div>
                                    </div>
                                    {/* <div className="button-line">
                                        <div>
                                            <img
                                                src="/assets/icons/icon-line.svg"
                                                style={{ width: 30, height: 30 }}
                                                alt="line"
                                            />
                                            ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- end  modal ฝากทศนิยม --> */}
            </main>
            {/* <!-- end  modal ฝากทศนิยม --> */}

            {/* <!-- ถอนเงิน start  modal --> */}

            <div
                className="modal fade"
                id="withdraw"
                tabindex="-1"
                aria-labelledby="withdraw"
                aria-hidden="true"
            >
                <div className="modal-dialog">
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
                                    {dataFromLogin?.length > 0 && dataFromLogin?.info?.bankList?.map((item, index) => (
                                        <div key={index} className="card flexBetween">
                                            <div className="left flexCenter">
                                                <p>{item?.s_account_name}</p>
                                                <p>{item?.s_account_no}</p>
                                            </div>
                                            <div className="right flexCenter">
                                                <div className="flexCenter bank">
                                                    <div>{item?.s_icon.split(".")[0]}</div>
                                                    <div style={{ backgroundColor: "#fff", borderRadius: "100%" }}>
                                                        <img src={`/assets/images/bank/${item?.s_icon}`} alt="kbank" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="money-input flexBetween" style={{ marginTop: 50 }}>
                                        <p>จำนวนเงินที่ถอนได้</p>
                                        <input type="text" value={dataUser?.amount} disabled={true} />
                                    </div>

                                    <div style={{ color: "red" }}>{reMessage}</div>

                                    <div className="button-warning" data-bs-dismiss={reMessage === "มีรายการแจ้งถอนค้างอยู่ในระบบ" ? "not-modal" : "modal"} onClick={() => _withdrawMoney()} onKeyDown={() => ''}> ถอนเงิน</div>

                                    <p style={{ display: "flex" }}>พบปัญหา
                                        <div style={{ marginLeft: "5px", color: "red" }}>ติดต่อฝ่ายบริการลูกค้า</div>
                                    </p>

                                    {/* <button type='button' className="line-button flexCenter">
                                        <img src="/assets/icons/icon-line.svg" alt="line icon" />
                                        <p>ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน</p>
                                    </button> */}
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
                data-bs-dismiss="modal"
            >
                <div className="modal-dialog">
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
                                    <div className="notic-text">
                                        <ul>
                                            <li>ฝากขั้นต่ำ 100 บาท สูงสุด 50,000.00 บาท *</li>
                                        </ul>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            marginBottom:
                                                -10,
                                            marginLeft: 5,
                                            color:
                                                "red",
                                        }}
                                    >
                                        เลือกธนาคาร
                                    </div>
                                    <div className="bank-selector">
                                        <select className="vodiapicker">
                                            <option
                                                value="kbank"
                                                className="test"
                                                data-thumbnail="https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png"
                                            />
                                            <option
                                                value="au"
                                                data-thumbnail="https://www.uhub.co.th/assets/images/icons/mobile/scb-icon.png"
                                            />
                                        </select>

                                        <div className="lang-select">
                                            <button type='button' className="btn-select" value="">.</button><img
                                                src="/assets/icons/icon-drow.svg"
                                                alt=""
                                                style={{ margin: "5px 0 0 -27px" }}
                                            />
                                            <div className="b">
                                                <ul id="a" />
                                            </div>
                                        </div>

                                        <div className="show-username-bank">นาย ปปปปป ปปปปป</div>
                                    </div>

                                    <div
                                        className="confirmation"
                                        style={{ marginLeft: 30, marginRight: 30 }}
                                    >
                                        <input
                                            type="text"
                                            className="text-amount-money"
                                            placeholder="กรอกจำนวนเงินที่ต้องการฝาก"
                                        />
                                        <div
                                            className="confirm-the-amount"
                                            style={{ cursor: "pointer" }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#showQR"
                                            data-bs-dismiss="modal"
                                        >
                                            <div>ยืนยันจำนวนเงิน</div>
                                        </div>
                                    </div>

                                    <div className="info-text" style={{ fontSize: 13 }}>
                                        <p>
                                            พบปัญหา
                                            <a
                                                href="#/"
                                                style={{
                                                    color: 'red',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                }}
                                            >ติดต่อฝ่ายบริการลูกค้า</a
                                            >
                                        </p>
                                    </div>
                                    {/* <div className="button-line">
                                        <div>
                                            <img
                                                src="/assets/icons/icon-line.svg"
                                                style={{ width: 30, height: 30 }}
                                                alt="line"
                                            />
                                            ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน
                                        </div>
                                    </div> */}
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
                data-bs-dismiss="modal"
            >
                <div className="modal-dialog">
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
                                <div style={{ marginTop: 20 }}>
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
                                        <div
                                            style={{ textAlign: "center", marginTop: 10, fontSize: 12 }}
                                        >
                                            <div>
                                                พบปัญหา
                                                <span
                                                    style={{
                                                        color: 'red',
                                                        textDecoration: 'underline',
                                                        cursor: 'pointer',
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
                <div className="modal-dialog">
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

                                    <select className="select-promotion" onChange={(event) => _getBankAgentCode(event?.target?.value)}>
                                        <option>เลือกธนาคาร</option>
                                        {dataFromLogin?.info?.bankDeposit?.length > 0 && dataFromLogin?.info?.bankDeposit?.map((bank) => (
                                            <option key={bank?.index} value={bank?.id}>{bank?.s_fname_th}</option>
                                        ))}
                                    </select>
                                    <select className="select-promotion" onChange={(event) => setPromotionCode(event?.target?.value)}>
                                        <option>เลือกโปรโมชั่น</option>
                                        {dataPromotion?.length > 0 && dataPromotion?.map((promotion) => (
                                            <option key={promotion?.index} value={promotion?.s_code}>{promotion?.s_promotion}</option>
                                        ))}
                                    </select>
                                    <div>
                                        <input id="fileslip" onChange={handleFileChange} style={{ background: "#FFF", color: "#000", width: "100%" }} type="file" />
                                    </div>
                                    <p style={{ color: "red" }}>{errorTextUploadSlip}</p>
                                    <button type='button' style={{ width: 120 }} onClick={uploadFile} className="button-warning">
                                        <img style={{ width: 20, height: 20 }} src="/assets/images/icons8-send-50.png" alt="send" />
                                        ส่งสลิป
                                    </button>
                                    <p>พบปัญหา <a style={{ color: "red" }}>ติดต่อฝ่ายบริการลูกค้า</a></p>
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
                <div className="modal-dialog">
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
                                            <p>026-999999-9</p>
                                            <p>นาย xxxxx xxxxx</p>
                                        </div>
                                        <div className="flexBetween right">
                                            <div className="true-wallet-title flexBetween">
                                                <p>True Wallet</p>

                                                <div>
                                                    <img src="/assets/images/true-money-wallet.svg" alt="" />
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
                                        พบปัญหา ติดต่อฝ่ายบริการลูกค้า
                                    </p>

                                    {/* <button type='button' className="line-button">
                                        <img
                                            src="/assets/icons/icon-line.svg"
                                            style={{ width: 30, height: 30 }}
                                            alt="line icon"
                                        />
                                        <p>ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน</p>
                                    </button> */}
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
                aria-labelledby="historyModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-border">
                        <div className="modal-content">
                            <div className="modal-header-container">
                                <div className="modal-header">
                                    <p className="modal-title">{tabs}</p>
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
                                <div className="history-modal-content">
                                    <div className="history-tab">
                                        <div className={
                                            tabName === "tab-deposit"
                                                ? "history-tab-item active"
                                                : "history-tab-item"
                                        }
                                            onClick={() => _clickTabDeposit("tab-deposit")}
                                            onKeyDown={() => ""} id="tab-deposit">ฝาก</div>
                                        <div className={
                                            tabName === "tab-withdraw"
                                                ? "history-tab-item active"
                                                : "history-tab-item"
                                        }
                                            onClick={() => _clickTabDeposit("tab-withdraw")}
                                            onKeyDown={() => ""} id="tab-withdraw">ถอน</div>
                                        <div className={
                                            tabName === "tab-bonus"
                                                ? "history-tab-item active"
                                                : "history-tab-item"
                                        }
                                            onClick={() => _clickTabDeposit("tab-bonus")}
                                            onKeyDown={() => ""} id="tab-bonus">โบนัส</div>
                                    </div>
                                    {/* <!-- ฝาก --> */}
                                    <div className="history-deposit" style={{ display: tabName === "tab-deposit" ? "block" : "none" }}>
                                        {dataHistoryDeposit?.length > 0 && dataHistoryDeposit?.map((deposit, index) => (
                                            <div className="history-list" key={deposit?.index}>
                                                <div className="history-list-left">
                                                    <label className="history-list-label">รายการฝาก</label>
                                                    <p className="history-list-label">{deposit?.f_amount}</p>
                                                    <p className="history-list-label">หมายเหตุ : {deposit?.s_remark}</p>
                                                </div>
                                                <div className="history-list-right">
                                                    <div className={`history-status${deposit?.s_status === 'Y' ? ' success' : deposit?.s_status === 'C' ? ' cancel' : ' not-success'}`}>{deposit?.s_status === "Y" ? "สำเร็จ" : deposit?.s_status === "C" ? "ยกเลิก" : "ไม่สำเร็จ"}</div>
                                                    <p className="history-date">{deposit?.d_datetime}</p>
                                                </div>
                                            </div>
                                        ))}

                                    </div>

                                    {/* <!-- ถอน --> */}
                                    <div className="history-withdraw" style={{ display: tabName === "tab-withdraw" ? "block" : "none" }}>
                                        {dataHistoryWithdraw?.length > 0 && dataHistoryWithdraw?.map((withdraw, index) => (
                                            <div className="history-list" key={withdraw?.index}>
                                                <div className="history-list-left">
                                                    <label className="history-list-label">รายการถอน</label>
                                                    <p className="history-list-label">{withdraw?.f_amount}</p>
                                                    <p className="history-list-label">หมายเหตุ : {withdraw?.s_remark}</p>
                                                </div>
                                                <div className="history-list-right">
                                                    <div className={`history-status${withdraw?.s_status === 'Y' ? ' success' : withdraw?.s_status === 'C' ? ' cancel' : ' not-success'}`}>{withdraw?.s_status === "Y" ? "สำเร็จ" : withdraw?.s_status === "C" ? "ยกเลีก" : "ไม่สำเร็จ"}</div>
                                                    <p className="history-date">{withdraw?.d_datetime}</p>
                                                </div>
                                            </div>
                                        ))}

                                    </div>

                                    {/* <!-- โบนัส --> */}
                                    <div className="history-bonus" style={{ display: tabName === "tab-bonus" ? "block" : "none" }}>
                                        {dataHistoryBonus?.length > 0 && dataHistoryBonus?.map((bonus, index) => (
                                            <div className="history-list" key={bonus?.index}>
                                                <div className="history-list-left">
                                                    <label className="history-list-label">รายการโบนัส</label>
                                                    <p className="history-list-label">{bonus?.f_amount}</p>
                                                    <p className="history-list-label">หมายเหตุ : {bonus?.s_remark}</p>
                                                </div>
                                                <div className="history-list-right">
                                                    <div className={`history-status${bonus?.s_status === 'Y' ? ' success' : bonus?.s_status === 'C' ? ' cancel' : ' not-success'}`}>{bonus?.s_status === "Y" ? "สำเร็จ" : bonus?.s_status === "C" ? "ยกเลีก" : "ไม่สำเร็จ"}</div>
                                                    <p className="history-date">{bonus?.d_datetime}</p>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- history modal end --> */}

            {/* <!-- bag modal --> */}
            <div
                className="modal fade"
                id="bagModal"
                tabindex="-1"
                aria-labelledby="bagModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
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
                                    {/* <div className="bag-modal-slide-container">
                                        <img src="/assets/images/bag-background.png" alt="" />
                                    </div> */}

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
                                            id="earn-modal-btn"
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
                                            data-bs-target="#cashbackDetail"
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
                                            data-bs-target="#spinnerModal"
                                            data-bs-dismiss="modal"
                                        >
                                            <div className="bag-menu-img-container">
                                                <img
                                                    className="bag-menu-icon"
                                                    src="/assets/images/icon-teasure.svg"
                                                    alt=""
                                                />
                                            </div>
                                            <p className="bag-modal-menu-title">กงล้อ </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- bag modal end --> */}

            {/* <!-- promotion modal --> */}
            <div
                className="modal fade"
                id="promotionModal"
                tabindex="-1"
                aria-labelledby="promotionModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-border">
                        <div className="modal-content">
                            <div className="modal-header-container">
                                <div className="modal-header">
                                    <p className="modal-title">โปรโมชั่น</p>
                                </div>
                            </div>
                            {/* dataPromotion */}
                            <div className="modal-body">
                                <div className="promotion-modal-content">
                                    <div className="promotion-modal-body">
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <div onClick={() => _newSl("DELETE")} style={{ color: "red" }} onKeyDown={() => ''}>
                                                <FontAwesomeIcon icon={faChevronCircleLeft} style={{ color: '#FFF', fontSize: 25 }} />
                                            </div>
                                            <div style={{ padding: 20 }}>
                                                {dataPromotion?.length > 0 && (
                                                    <img
                                                        src={`data:image/jpeg;base64,${dataPromotion[nextSliderPage]?.s_source_img}`}
                                                        className="promotion-modal-image"
                                                        alt=""
                                                        style={{ width: "100%" }}
                                                    />
                                                )}
                                            </div>
                                            <div onClick={() => _newSl("ADD")} style={{ color: "green" }} onKeyDown={() => ''}>
                                                <FontAwesomeIcon icon={faChevronCircleRight} style={{ color: '#FFF', fontSize: 25 }} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div>
                                            <div style={{ color: "#4CAF4F" }}>ฝาก {dataPromotion?.length > 0 && dataPromotion[nextSliderPage]?.f_max_amount} รับ {dataPromotion?.length > 0 && dataPromotion[nextSliderPage]?.f_percen}</div>
                                            <div>จำกัด {dataPromotion?.length > 0 && dataPromotion[nextSliderPage]?.i_per_day} ครั้ง/วัน</div>
                                            <div style={{ color: "yellow" }}>รายละเอียด</div>
                                            <div>
                                                {dataPromotion?.length > 0 && dataPromotion[nextSliderPage]?.s_detail}
                                            </div>
                                        </div>
                                        <div style={{ height: 10 }} />
                                        <div>
                                            <button
                                                type="button"
                                                className="modal-icon-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                                alt=""
                                                style={{
                                                    padding: 10,
                                                    backgroundColor: "#5E9904",
                                                    borderRadius: 6,
                                                    width: 100,
                                                }}
                                                onClick={() => apoverPromotion(dataPromotion[nextSliderPage])}
                                            >รับโบนัส</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* <!-- promotion modal end --> */}

            {/* <!-- code modal --> */}
            <div
                className="modal fade"
                id="codeModal"
                tabindex="-1"
                aria-labelledby="codeModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
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
                                        onChange={(e) => setCodeCupon(e.target.value)}
                                    />
                                    <div style={{ color: 'red', textAlign: 'center' }}>{reMessage}</div>

                                    <button type="button" className="button-warning" onClick={() => _addCupon()}>ยืนยัน</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- code modal end --> */}

            {/* <!-- credit modal --> */}
            <div
                className="modal fade"
                id="creditModal"
                tabindex="-1"
                aria-labelledby="creditModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
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

            {/* <!-- diamond modal --> */}
            <div
                className="modal fade"
                id="diamondModal"
                tabindex="-1"
                aria-labelledby="diamondModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
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


            {/* <!-- spinner modal --> */}
            <div
                className="modal fade"
                id="spinnerModal"
                tabindex="-1"
                aria-labelledby="spinnerModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
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
                                    <p className="spinner-modal-title">แต้มทั้งหมด : {currentPoint?.currentPoint}</p>
                                    <div className="spinner-modal-body">
                                        {dataSpinWheel.length > 0 &&
                                            <Roulette
                                                data={dataSpinWheel}
                                                setOutputSpin={setOutputSpin}
                                                username={dataFromLogin?.username}
                                                setCurrentPoint={setCurrentPoint} />}

                                        <p style={{ margin: 'none', marginTop: 10 }}>เครดิตกงล้อ : {outputSpin}</p>
                                        <div style={{ fontWeight: 500, fontSize: 16, textDecoration: "underline" }}>รายละเอียด</div>
                                        <p style={{ margin: 'none' }}>หมุนวงล้อได้ทั้งหมด {limitSpinWheel?.i_max} ครั้ง ใช้สิทธิไปแล้ว 3 ครั้ง</p>
                                        <p style={{ margin: 'none' }}>ภายในวันสามารถใข้สิทธิได้ {limitSpinWheel?.i_per_day} ครั้ง</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- spinner modal end --> */}

            {/* <!-- earn money modal --> */}
            <div
                className="modal fade"
                id="earnMoneyModal"
                tabindex="-1"
                aria-labelledby="earnMoneyModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
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

                                    <div className="border-input-gold">
                                        <div className="link-shared">
                                            <p className="link-shared-title">ลิ้งค์แนะนำเพื่อน</p>
                                            <p className="link-shared-subtitle">
                                                คุณจะได้รับรายได้ฟรีจากการแนะนำเพื่อน
                                            </p>
                                            <input type="text" className="link-shared-input" value={dataFromLogin?.info?.shorturl} />

                                            <div className="link-shared-btn-group">
                                                <div className="border-input-gold border-btn">
                                                    <button type="button" className="btn-copy-link" data-bs-dismiss="modal" onClick={() => _copyLinkAffiliate(dataFromLogin?.info?.shorturl)}>
                                                        คัดลอกลิ้งค์
                                                    </button>
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

            {/* <!-- change password modal --> */}
            <div
                className="modal fade"
                id="changePasswordModal"
                tabindex="-1"
                aria-labelledby="changePasswordModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
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
                                            type="password"
                                            placeholder="กรุณากรอกรหัสผ่านเดิม"
                                            className="input-for-border-gold"
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="change-password-hr">
                                        <div className="hr" />
                                    </div>
                                    <div className="border-input-gold">
                                        <input
                                            type="password"
                                            placeholder="กรุณากรอกรหัสผ่านใหม่"
                                            className="input-for-border-gold"
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="border-input-gold">
                                        <input
                                            type="password"
                                            placeholder="กรุณากรอกรหัสผ่านใหม่อีกครั้ง"
                                            className="input-for-border-gold"
                                            onChange={(e) => setNewPasswordVery(e.target.value)}
                                        />
                                    </div>
                                    <div style={{ textAlign: 'center', color: 'red' }}>{reMessage}</div>
                                    <button type="button" className="button-warning" onClick={() => _ChangePassword()}>ยืนยัน</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- confirm logout modal --> */}
            <div className="modal fade" id="confirmLogout" tabindex="-1" aria-labelledby="confirmLogoutLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-border">
                        <div className="modal-content">
                            <div className="modal-header-container">
                                <div className="modal-header">

                                    <p className="modal-title">ยืนยันออกจากระบบ</p>

                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="code-modal-content" style={{ textAlign: "center" }}>
                                    <div>คุณต้องการออกจากระบบหรือไม่ ?</div>
                                </div>
                                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
                                    <a href={Constant?.LINK_WORDPRESS} className="btn-confirm-logout"> ยืนยัน</a>
                                    <button type="button" className="btn-cancel-confirm-logout" data-bs-dismiss="modal">ยกเลิก</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- confirm logout modal end --> */}

            {/* <!-- confirm logout modal --> */}
            <div className="modal fade" id="historyCashback" tabindex="-1" aria-labelledby="history-cashbackLabel" aria-hidden="true">
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
                                        data-bs-target="#cashbackDetail"
                                        data-bs-dismiss="modal"
                                    />
                                    <p className="modal-title">ประวัติการรับ</p>
                                    <img
                                        src="/assets/icons/icon-close-modal.svg"
                                        className="modal-icon-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        alt="shun808"
                                    />
                                </div>
                            </div>
                            <div className="modal-body">
                                <div style={{
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "20px",
                                    width: "100%",
                                    marginTop: 20

                                }}>
                                    <div>วันเวลา</div>
                                    <div>จำนวนเงิน</div>
                                </div>
                                <b />
                                {historyCashBack?.length > 0 && historyCashBack?.map((item, index) => (
                                    <div key={index}
                                        style={{
                                            color: "white",
                                            display: "flex",
                                            width: "90%",
                                            justifyContent: "space-between",
                                        }}>
                                        <div>
                                            {item?.d_create}
                                        </div>
                                        <div>
                                            {item?.f_amount}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- confirm logout modal end --> */}

            {/* <!-- Modal --> */}

            <footer className="footer" style={{ zIndex: 5 }}>
                <div className="menu-wrapper">
                    <div className="footer-item flexCenter"
                        data-bs-toggle="modal"
                        data-bs-target="#historyModal"
                    >
                        <img src="/assets/icons/History.svg" alt="login" />
                        <p className="font-20">ประวัติ</p>
                    </div>
                    <div
                        className="footer-item flexCenter"
                        data-bs-toggle="modal"
                        data-bs-target="#promotionModal"
                        data-bs-dismiss="modal"
                    >
                        <img src="/assets/icons/gift.svg" alt="login" />
                        <p className="font-20">โปรโมชั่น</p>
                    </div>
                    <div
                        className="footer-item flexCenter"
                        data-bs-toggle="modal"
                        data-bs-target="#depositWithdraw"
                    >
                        <img src="/assets/icons/return-money.svg" alt="login" />
                        <p className="font-20">ฝาก-ถอน</p>
                    </div>
                    <div
                        className="footer-item flexCenter"
                        data-bs-toggle="modal"
                        data-bs-target="#bagModal"
                    >
                        <img src="/assets/icons/money-bag.svg" alt="login" />
                        <p className="font-20">กระเป๋า</p>
                    </div>
                    <a target='_blank' href={linkLine} className="footer-item flexCenter" style={{ textDecoration: "none" }} rel="noreferrer">
                        <img src="/assets/images/contact-admin.svg" alt="login" />
                        <p className="font-20">ติดต่อเรา</p>
                    </a>
                </div>
            </footer>

            <Modal show={show} style onHide={handleClose}>
                <div className="modal-border">
                    <div className="modal-content">
                        <div className="modal-header-container">
                            <div className="modal-header">
                                <p className="modal-title" id="autoDeposit">ฝากออโต้</p>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="detail-card-scb1">
                                <div className="card-scb1" style={{ background: depositBankList && depositBankList?.background }}>
                                    <div className="left">
                                        <p>{depositBankList && depositBankList?.s_fname_th}</p>
                                        <p>{depositBankList && depositBankList?.s_account_name}</p>
                                        <p>{depositBankList && depositBankList?.s_account_no}
                                            <span>
                                                <img src="/assets/images/icon-coppy.svg" data-bs-dismiss="modal" onClick={() => _copyAccountNo(depositBankList?.s_account_no)} alt="" style={{ width: 30, height: 30, marginBottom: -3 }} />
                                            </span>
                                        </p>
                                    </div>
                                    <div className="right">
                                        <div className="bank">
                                            <h3 style={{ textTransform: "uppercase" }}>{depositBankList && depositBankList?.s_icon.split(".")[0]}</h3>
                                            <div style={{ borderRadius: '100%', marginTop: -10 }}>
                                                <img src={`/assets/images/bank/${depositBankList && depositBankList?.s_icon}`} alt="scb" />
                                            </div>
                                        </div>
                                        <div style={{ marginLeft: 50 }}>
                                            <div className="deposit-bank-title-pc">เปลี่ยนธนาคาร</div>
                                            <img onClick={() => _getOptionBank()} onKeyDown={() => ''}
                                                style={{ width: 30, height: 30, display: disableArrow === true ? "none" : "block", cursor: "pointer" }} src="/assets/images/arrow-bottom.svg" alt="" />
                                            <select
                                                onChange={(e) => _getOptionBank2(e.target.value)}
                                                className="deposit-bank-list-pc"
                                                style={{ display: disableArrow === true ? "block" : "none" }}>
                                                {dataFromLogin?.info?.bankDeposit?.length > 0 && dataFromLogin?.info?.bankDeposit?.map((bank) => (
                                                    <option key={bank?.index} value={JSON.stringify(bank)}>{bank?.s_fname_th}</option>
                                                ))}

                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div data-bs-toggle="modal" data-bs-target="#slipVerify" >
                                        <div className="btn-slip">
                                            <div style={{ color: "white" }}>
                                                <img style={{ width: 20, height: 20 }} src="/assets/images/icons8-exclamation-50.png" alt="exclamation" /> แจ้งเงินไม่เข้า /แบบสลิป
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: "center", marginTop: 10, fontSize: 14 }}>
                                <div> พบปัญหา <span>ติดต่อฝ่ายบริการลูกค้า</span></div>
                            </div>
                            {/* <div className="button-line">
                                <div>
                                    <img
                                        src="/assets/icons/icon-line.svg"
                                        style={{ width: 28, height: 28 }}
                                        alt="line"
                                    />
                                    ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

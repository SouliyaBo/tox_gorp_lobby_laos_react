/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faChevronCircleRight, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { CheckLevelCashBack, FillerCategory, OpenNewTabWithHTML, DataLoginInRout, LogoutClearLocalStorage, formatMontYear } from "../../helper"
import Constant, { AGENT_CODE } from "../../constant";
import _LoginController from "../../api/login";
import { BackList } from "../../constant/bankList";
import QRCode from 'qrcode.react';
import jsQR from 'jsqr';
import Roulette from "../../component/Roulette";

export default function AfterLoginMobile() {
    const history = useHistory();
    const sidebarUseRef = useRef(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [sidebarAnimation, setSidebarAnimation] = useState(true);
    const [tabs, setTabs] = useState("ประวัติฝาก");
    const [tabName, setTabName] = useState("tab-deposit");
    const [tabNameAffiliate, setTabNameAffiliate] = useState("overview");

    const [dataFromLogin, setDataFromLogin] = useState({});
    const [dataGameType, setDataGameType] = useState("SLOT");
    const [dataGameList, setDataGameList] = useState();
    const [categoryGame, setCategoryGame] = useState([]);
    const [deviceType, setDeviceType] = useState(false);
    const [dataUser, setDataUser] = useState();
    const [reMessage, setReMessage] = useState("");

    const [oldPassword, setOldPassword] = useState("")
    const [NewPassword, setNewPassword] = useState("")
    const [NewPasswordVery, setNewPasswordVery] = useState("")
    const { ChangePassword } = _LoginController();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [nextSliderPage, setNextSliderPage] = useState(0)
    const [dataPromotion, setDataPromotion] = useState(0)
    const [maxLevel, setMaxLevel] = useState();
    const [historyCashBack, setHistoryCashBack] = useState([]);
    const [codeCupon, setCodeCupon] = useState("");
    const [dataHistoryDeposit, setDataHistoryDeposit] = useState([]);
    const [dataHistoryBonus, setDataHistoryBonus] = useState([]);
    const [dataHistoryWithdraw, setDataHistoryWithdraw] = useState([]);
    const [current, setCurrent] = useState(0);
    const [disableArrow, setDisableArrow] = useState(false);
    const [depositBankList, setDepositBankList] = useState({});
    const [sliderData, setSliderData] = useState([]);
    const [percentageData, setPercentageData] = useState([]);
    const [logoWebsite, setLogoWebsite] = useState("");
    const [linkLine, setLinkLine] = useState("");
    const [numberQRCode, setNumberQRCode] = useState("");
    const [file, setFile] = useState(null);
    const [bankAgentCode, setBankAgentCode] = useState("");
    const [ipAddress, setIpAddress] = useState('');
    const [errorTextUploadSlip, setErrorTextUploadSlip] = useState('');
    const [promotionCode, setPromotionCode] = useState('');
    const [dataSpinWheel, setDataSpinWheel] = useState([]);
    const [outputSpin, setOutputSpin] = useState("");
    const [limitSpinWheel, setLimitSpinWheel] = useState({});
    const [currentPoint, setCurrentPoint] = useState({});
    const [dataOverview, setDataOverview] = useState([]);
    const [dataOverviewYears, setDataOverviewYears] = useState([]);
    const [dataIncome, setDataIncome] = useState([]);
    const [dataHistoryAffiliate, setDataHistoryAffiliate] = useState([]);

    const [overviewDate, setOverviewDate] = useState(formatMontYear(new Date()));
    const [incomeDateStart, setIncomeDateStart] = useState(formatMontYear(new Date()));
    const [incomeDateEnd, setIncomeDateEnd] = useState(formatMontYear(new Date()));
    const [years, setYears] = useState([]);
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const _data = DataLoginInRout(history?.location?.state);
        console.log("AAAAAA::: ", _data)
        if (_data) {
            setLogoWebsite(_data?.info?.configLobby?.s_logo)
            setLinkLine(_data?.info?.configLobby?.s_line)
            setDataFromLogin(_data);
            setDepositBankList(_data?.info?.bankDeposit[0])
            getQRCode(_data?.info?.bankDeposit[0]?.s_account_no);
            const slideArray = _data?.info?.slide ? Object.values(_data?.info?.slide) : [];
            const newSlideArray = slideArray.filter(data => data.s_position === "page_wallet");
            setSliderData(newSlideArray)
            const color = BackList.filter((data) => data?.bankName === _data?.info?.bankDeposit[0]?.s_fname_th)
            if (color?.length > 0) {
                setDepositBankList({ ..._data?.info?.bankDeposit[0], background: color[0].backgroundColor })
            }

        }
        setDeviceType(false)
        getSpinWheel();
        setDataPromotion(history?.location?.state?.info?.promotionList);
        if (_data === undefined) {
            history.push(Constant?.HOME)
        }
        const currentYear = new Date().getFullYear();
        const yearArray = [];
        for (let year = 2020; year <= currentYear; year++) {
            yearArray.push(year);
        }
        setYears(yearArray);
    }, []);

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
                console.log("spin", response.data.data);
                setDataSpinWheel(response.data.data[0]?.eventItem)
                setLimitSpinWheel(response.data.data[0])
            })
            .catch((error) => {
                console.log(error);
            });
    }

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

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        _clickCategoryGame("SLOT");
        _getData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataFromLogin]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(current === length - 1 ? 0 : current + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, [current]);

    const _getOptionBankQR = (bankName) => {
        getQRCode(bankName)
    }

    const getQRCode = async (accountNumber) => {
        const _data = await axios.post(`${Constant.SERVER_URL}/genarate-qr-code/${Constant.AGENT_CODE}`, {
            recipientAccountNum: accountNumber
        });
        setNumberQRCode(_data?.data?.data?.respData?.qrCode)
    }
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
        if (_level) setMaxLevel(_level);
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
                s_agent_code: dataFromLogin?.agent,
                s_username: dataFromLogin?.username,
            },
        });

        if (_resHistoryMoney?.data?.statusCode === 0) {
            setDataHistoryDeposit(_resHistoryMoney?.data?.data?.deposit);
            setDataHistoryBonus(_resHistoryMoney?.data?.data?.bonus);
            setDataHistoryWithdraw(_resHistoryMoney?.data?.data?.withdraw);
        }
    };
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

    const _clickCategoryGame = async (value) => {
        setDataGameType(value)
        setDataGameList([])
        if (value === "FAVORITE") {
            const _getData = await axios({
                method: 'post',
                url: `${Constant.SERVER_URL}/Game/Brand/List`,
                data: {
                    s_agent_code: dataFromLogin?.agent,
                    s_username: dataFromLogin?.username,
                },
            });
            if (_getData?.data?.statusCode === 0) {
                setCategoryGame(_getData?.data?.data?.FAVORITE)
            }
        } else {
            setDataGameList()
            FillerCategory(value, setCategoryGame)
        }
    }
    const _clickFavorite = async (value) => {
        setDataGameType("FAVORITE")
        setDataGameList([])

        const _getData = await axios({
            method: 'post',
            url: `${Constant.SERVER_URL}/Game/Brand/List`,
            data: {
                s_agent_code: AGENT_CODE,
                s_username: dataFromLogin?.username,
            },
        });

        if (_getData?.data?.statusCode === 0) {
            setCategoryGame(_getData?.data?.data?.FAVORITE)
        }
    }
    const _getDataGame = async (value) => {
        if (value?.s_type === "CASINO" || value?.s_type === "SPORT") {
            _getDataGamePlayGame(value)
            return
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
            setDataGameList(_res?.data?.data)
            let dataLength = _res?.data?.data?.length;
            generatePercentageData(dataLength);
            const intervalId = setInterval(() => {
                generatePercentageData(dataLength);
            }, 5000);
            return () => clearInterval(intervalId);
        }
    }
    const _addFavorite = async (value) => {
        const _getData = await axios({
            method: 'post',
            url: `${Constant.SERVER_URL}/Favorite/Select`,
            data: {
                s_agent_code: dataFromLogin?.agent,
                s_username: dataFromLogin?.username,
                id_favorite: value?.id_favorite,
                actionBy: "ADM"
            },
        });
        if (_getData?.data?.statusCode === 0) {
            if (dataGameType === "FAVORITE" || dataGameType === "HOTHIT") {

                _clickCategoryGame(dataGameType)
            } else {

                _getDataGame(value)
            }
        }
    }
    const _getDataGamePlayGame = async (value) => {
        try {
            const _data = {
                s_game_code: value?.s_type === "CASINO" ? "B001" : value?.s_type === "SPORT" ? "B001" : value?.s_game_code,
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
    }
    const _withdrawMoney = async () => {
        try {
            const _data = {
                s_agent_code: Constant?.AGENT_CODE,
                s_username: dataFromLogin?.username,
                f_amount: dataUser?.amount,
                i_bank: dataFromLogin?.info?.bankList[0]?.id,
                i_ip: "1.2.3.4",
                actionBy: "adm"
            };
            // Send the data to the server to get the game URL
            const _res = await axios({
                method: "post",
                url: `${Constant.SERVER_URL}/Withdraw/CreateTransaction`,
                data: _data,
            });
            if (_res?.data?.statusCode === 0) {
                // Swal.fire({
                //     icon: 'success',
                //     title: "ทำรายการสำเร็จ",
                //     showConfirmButton: false,
                //     timer: 2000,
                //     background: '#242424', // Change to the color you want
                //     color: '#fff',
                // });
                _getData()
            } else {
                setReMessage(_res?.data?.statusDesc)
            }
        } catch (error) {

        }
    }
    const _ChangePassword = async () => {
        try {
            if (NewPassword !== NewPasswordVery) {
                setReMessage("รหัสผ่านใหม่ และ ยืนยันรหัสผ่านใหม่ ไม่ตรงกัน")
                return
            }
            const _data = await ChangePassword(NewPassword, oldPassword)
            if (_data?.data) {
                setReMessage(_data?.data?.statusDesc)
                if (_data?.data.statusCode === 0) {
                    LogoutClearLocalStorage()
                }
            }
        } catch (error) {
            console.error("Error playing the game:", error);
        }
    }
    const approverPromotion = async (value) => {
        try {
            const _resAppover = await axios.post(`${Constant.SERVER_URL}/Deposit/Promotion/Select`, {
                s_agent_code: Constant?.AGEN_CODE,
                s_username: dataFromLogin?.username,
                s_type: "SMS",
                s_prm_code: value?.s_code,
                i_ip: "1.2.3.4",
                actionBy: "ADM"
            })
            if (_resAppover?.data?.statusCode === 0) {
                // Swal.fire({
                //     icon: 'success',
                //     title: "ทำรายการสำเร็จ",
                //     showConfirmButton: false,
                //     timer: 2000,
                //     background: '#242424', // Change to the color you want
                //     color: '#fff',
                // });
                setTimeout(() => {
                    handleShow()
                }, 2000);
                return
            }
        } catch (error) {
            // Swal.fire({
            //     icon: 'error',
            //     title: "รายการไม่สำเร็จ",
            //     showConfirmButton: false,
            //     timer: 2000,
            //     background: '#242424', // Change to the color you want
            //     color: '#fff',
            // });
        }

    }

    const _newSl = (value) => {
        if (dataPromotion?.length > 0) {
            if (value === "ADD") {
                if (nextSliderPage === dataPromotion.length - 1) {
                    setNextSliderPage(dataPromotion.length - 1)
                } else {
                    setNextSliderPage(nextSliderPage + 1)
                }
            } else {
                if (nextSliderPage === 0) {
                    setNextSliderPage(0)
                } else {
                    setNextSliderPage(nextSliderPage - 1)
                }
            }
        }
    }
    const _copyLinkAffiliate = (link) => {

        // Swal.fire({
        //     icon: 'success',
        //     title: "คัดลอกลิ้งสำเร็จ",
        //     showConfirmButton: false,
        //     timer: 2000,
        //     background: '#242424',
        //     color: '#fff',
        // });
        navigator?.clipboard.writeText(link);

    };
    const _copyAccountNo = (accountNo) => {
        navigator.clipboard.writeText(accountNo);
        // Swal.fire({
        //     icon: 'success',
        //     title: "คัดลอกสำเร็จ",
        //     showConfirmButton: false,
        //     timer: 2000,
        //     background: '#242424',
        //     color: '#fff',
        // });
    };

    const _receiveCashBack = async () => {
        try {
            const _res = await axios({
                method: "post",
                url: `${Constant.SERVER_URL}/Cashback/Receive`,
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
            console.log("error:", error);
        }
    };

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
    const _getOptionBank = (bankName) => {
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
                    i_ip: ipAddress,
                    s_prm_code: promotionCode,
                });
                console.log("response: ", response)
                setErrorTextUploadSlip(response?.data?.statusDesc)
            } catch (error) {
                console.error("AAAA", error);
            }
        } else {
            console.log('Failed to read QR code');
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

    const _getBankAgentCode = (event) => {

        let data = JSON.stringify({ "data": event });

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

    const _tabAffiliate = (tabAffiliate) => {
        console.log("tabAffiliate:: ", tabAffiliate)
        setTabNameAffiliate(tabAffiliate);
        if (tabAffiliate === "overview") {
            _getRegister()
        } else if (tabAffiliate === "income") {
            _getIncome(incomeDateStart, incomeDateEnd)
        } else {
            _getHistory()
        }
    };

    const _getRegister = async () => {
        const _res = await axios({
            method: "post",
            url: `${Constant.SERVER_URL}/Affiliate/Inquiry/Register`,
            data: {
                s_agent_code: Constant?.AGENT_CODE,
                s_username: dataFromLogin?.username,
                d_date: "2023-09",
                page_start: 0
            },
        });
        console.log("_res::: ", _res?.data)
        if (_res?.data?.statusCode === 0) {
            setDataOverview(_res?.data?.data?.list)
        }
    }

    const _selectYear = (event) => {
        _getRegisterByYear(event)
    }

    const _getRegisterByYear = async (year) => {
        const _res = await axios({
            method: "post",
            url: `${Constant.SERVER_URL}/Affiliate/Inquiry/RegisterByYear`,
            data: {
                s_agent_code: Constant?.AGENT_CODE,
                s_username: dataFromLogin?.username,
                d_date: year,
                page_start: 0
            },
        });
        if (_res?.data?.statusCode === 0) {
            setDataOverviewYears(_res?.data?.data)
        }
    }

    const _getIncome = async (dateStart, dateEnd) => {
        const _res = await axios({
            method: "post",
            url: `${Constant.SERVER_URL}/Affiliate/Inquiry/Income`,
            data: {
                s_agent_code: Constant?.AGENT_CODE,
                s_username: dataFromLogin?.username,
                d_start: dateStart,
                d_end: dateEnd,
                page_start: 0
            },
        });
        if (_res?.data?.statusCode === 0) {
            setDataIncome(_res?.data?.data?.list)
        }
    }
    const _getIncomeDateStart = (event) => {
        setIncomeDateStart(event?.target?.value)
        _getIncome(event?.target?.value, incomeDateEnd)
    }
    const _getIncomeDateEnd = (event) => {
        setIncomeDateEnd(event?.target?.value)
        _getIncome(incomeDateStart, event?.target?.value)
    }

    const _getHistory = async () => {
        const _res = await axios({
            method: "post",
            url: `${Constant.SERVER_URL}/Affiliate/History`,
            data: {
                s_agent_code: Constant?.AGENT_CODE,
                s_username: dataFromLogin?.username,
            },
        });
        console.log("_res::>> ", _res)
        if (_res?.data?.statusCode === 0) {
            setDataHistoryAffiliate(_res?.data?.data)
        }
    }
    const _getReceiveAffiliate = async (amount) => {
        const _res = await axios({
            method: "post",
            url: `${Constant.SERVER_URL}/Affiliate/Receive`,
            data: {
                s_agent_code: Constant?.AGENT_CODE,
                s_username: dataFromLogin?.username,
                f_amount: amount,
                actionBy: "ADM"
            },
        });
        console.log("_res::>> ", _res)
        if (_res?.data?.statusCode === 0) {
            setDataHistoryAffiliate(_res?.data?.data)
        }
    }
    return (
        <div>
            <main className="after-login-mobile-page">
                <header className="header flexBetween">
                    <div className="left" onClick={(event) => toggleSidebar(event)} onKeyDown={() => ''}>
                        <img className="hamburger" src="/assets/images/icon-hamburger.svg" alt="hamburger icon" />
                    </div>
                    <div className="right">
                        <div className="balance-container">
                            <div className="balance">
                                <div className="icon flexCenter">
                                    <img src="/assets/icons/user-outline-white.svg" alt="icon" />
                                </div>
                                <div className="balance-text">
                                    <p>{dataFromLogin?.username}</p>
                                </div>
                            </div>
                            <div className="balance">
                                <div className="icon flexCenter">
                                    <img src="/assets/icons/wallet-outline-white.svg" alt="icon" />
                                </div>
                                <div className="balance-text">
                                    <p>{dataUser?.amount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="system-option flexCenter">
                            {/* <img className="thai-logo" src="../assets/images/logo-thai.svg" alt="thai logo" /> */}
                            <div className="logout-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#confirmLogout" >
                                <img src="/assets/icons/power-off.svg" alt="logout icon" />
                                <p style={{ color: 'red' }}>ล็อกเอาท์</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="brand">
                    <div className="slideshow-container-after-login">
                        <div className="mySlides">
                            <div className='left-arrow' onClick={() => prevSlide()} onKeyDown={() => ''}>❮</div>
                            <div className='right-arrow' onClick={() => nextSlide()} onKeyDown={() => ''}>❯</div>
                            {sliderData.length > 0 && sliderData?.map((slide, index) => {
                                return (
                                    <div
                                        className={index === current ? 'slide1 active' : 'slide1'}
                                        key={slide?.i_index}
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
                <div style={{ height: 15 }} />


                <section className="featured-game-wrapper" id="mobile-after-login">
                    <div className="featured-game flexBetween" onClick={() => _clickFavorite()} onKeyDown={() => ''}>
                        <img src="/assets/images/newicon/favorite.png" alt="game icon" />
                        <p>เกมโปรด</p>
                    </div>
                    <div className="featured-game flexBetween" onClick={() => _clickCategoryGame("HOTHIT")} onKeyDown={() => ''}>
                        <img src="/assets/images/newicon/hothit.png" alt="game icon" />
                        <p>ที่นิยม</p>
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
                </section>

                <section className="all-mobile-games" style={{ marginTop: 15, padding: 10 }}>
                    <div className="container-image">
                        {dataGameList?.length ?
                            dataGameList?.map((game, index) =>
                            (<div key={game?.s_img} className="content-image" style={{ position: "relative" }}>
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "0",
                                        right: "0",
                                        zIndex: 1,
                                        backgroundColor: game?.s_flg_favorite === "Y" ? "#FE2147" : "#A4A4A4",
                                        padding: 8,
                                        borderRadius: "50%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        display: "flex",
                                    }}
                                    onKeyDown={() => ""}
                                    onClick={() => _addFavorite(game)}
                                >
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        style={{ color: "#FFF", fontSize: 15 }}
                                    />
                                </div>
                                <div className="percentage-mb">
                                    RTP {(percentageData[index]?.percentage * 100).toFixed(2)} %
                                </div>
                                <img
                                    src={game?.s_img ?? "/assets/images/jilli_card.svg"}
                                    id="game-card"
                                    style={{ width: 118, height: 153, }}
                                    className="game-image"
                                    alt="game"
                                    onKeyDown={() => ""}
                                    onClick={() => _getDataGamePlayGame(game)}
                                />
                            </div>
                            )) : categoryGame.length > 0 && categoryGame?.map((item, index) => (
                                <div key={item?.s_img} className="content-image" style={{ position: "relative" }}>
                                    {dataGameType === "FAVORITE" ||
                                        dataGameType === "HOTHIT" ||
                                        dataGameType === "FISHING" ? (
                                        <div>
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "0",
                                                    right: "0",
                                                    zIndex: 1,
                                                    backgroundColor: "#FE2147", //"#A4A4A4"
                                                    padding: 8,
                                                    borderRadius: "50%",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    display: "flex",
                                                }}
                                                onClick={() => _addFavorite(item)}
                                                onKeyDown={() => ""}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faHeart}
                                                    style={{ color: "#FFF", fontSize: 15 }}
                                                />
                                            </div>
                                            <div className="percentage-mb">
                                                RTP {(percentageData[index]?.percentage * 100).toFixed(2)} %
                                            </div>
                                        </div>
                                    ) : null}
                                    {item?.s_img !== undefined ? (
                                        <img
                                            src={item?.s_img}
                                            style={{ width: 118, height: 153, }}
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
                                                        item,
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
                            ))};
                    </div>

                </section>
                <div style={{ height: 20 }} />

                <footer className="footer">
                    <div className="menu-wrapper">
                        <button type='button' className="footer-item flexCenter" data-bs-toggle="modal"
                            data-bs-target="#historyModal">
                            <img src="/assets/icons/History.svg" alt="login" />
                            <p>ประวัติ</p>
                        </button>
                        <button type='button' className="footer-item flexCenter" data-bs-toggle="modal" data-bs-target="#promotionModal"
                            data-bs-dismiss="modal">
                            <img src="/assets/icons/gift.svg" alt="login" />
                            <p>โปรโมชั่น</p>
                        </button>
                        <button type='button' data-bs-toggle="modal" data-bs-target="#depositWithdraw" className="footer-item flexCenter">
                            <img src="/assets/icons/return-money.svg" alt="login" />
                            <p>ฝาก-ถอน</p>
                        </button>
                        <button type='button' className="footer-item flexCenter" data-bs-toggle="modal" data-bs-target="#bagModal">
                            <img src="/assets/icons/money-bag.svg" alt="login" />
                            <p>กระเป๋า</p>
                        </button>
                        <a target='_blank' href={linkLine} className="footer-item flexCenter" style={{ textDecoration: "none" }} rel="noreferrer">
                            <img src="/assets/images/contact-admin.svg" alt="login" />
                            <p>ติดต่อเรา</p>
                        </a>
                    </div>
                </footer>

                {/* <!-- Side Bar --> */}
                {sidebarVisible ? (
                    <div className="sidebar-container" ref={sidebarUseRef}>
                        <aside className="sidebar" style={{
                            animation: `${sidebarAnimation ? "slideInFromLeft" : "slideInToLeft"
                                } 0.5s ease-in-out`,
                        }}>
                            <div className="icon-turn-back" onClick={() => closeSidebar()}
                                onKeyDown={() => ""}>
                                <img
                                    src="/assets/images/turn-back 1.png"
                                    alt=""
                                />
                            </div>
                            <img
                                src={`data:image/jpeg;base64,${logoWebsite}`}
                                alt="logo"
                            />
                            <div className="flexBetween">
                                <p>Username:</p>
                                <p>{dataFromLogin?.username}</p>
                            </div>
                            {/* <div className="flexBetween">
                                <p>Phone :</p>
                                <p>
                                    {dataFromLogin?.info?.s_phone}
                                </p>
                            </div> */}
                            <div className="balance">
                                <small>
                                    ยอดเงินคงเหลือ
                                </small>
                                <p>{dataFromLogin?.balance?.amount}</p>
                            </div>

                            <div
                                className="flexBetween"
                                style={{
                                    gap: 10,
                                }}
                            >
                                <button
                                    type="button"
                                    className="gradient-border sidebar-button flexCenter"
                                    style={{
                                        width:
                                            "50%",
                                        height: 42,
                                        borderRadius: 10,
                                        fontSize: 13,
                                    }}
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
                                    style={{
                                        width:
                                            "50%",
                                        height: 42,
                                        borderRadius: 10,
                                        fontSize: 13,
                                    }}
                                >
                                    ฝาก-ถอน
                                </button>
                            </div>
                            <div
                                className="flexBetween"
                                style={{
                                    gap: 13,
                                }}
                            >
                                <button
                                    type="button"
                                    className="gradient-border sidebar-button flexCenter"
                                    style={{
                                        width:
                                            "50%",
                                        height: 42,
                                        borderRadius: 10,
                                        fontSize: 13,
                                    }}
                                    id="bag-modal-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#bagModal"
                                >
                                    กระเป๋า
                                </button>
                                <button
                                    type="button"
                                    className="gradient-border sidebar-button flexCenter"
                                    style={{
                                        width:
                                            "50%",
                                        height: 42,
                                        borderRadius: 10,
                                        fontSize: 13,
                                    }}
                                    id="history-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#historyModal"
                                >
                                    ประวัติ
                                </button>
                            </div>
                            <div
                                className="flexBetween"
                                style={{
                                    gap: 10,
                                }}
                            >
                                <button
                                    type="button"
                                    className="gradient-border sidebar-button flexCenter"
                                    style={{
                                        width:
                                            "50%",
                                        height: 42,
                                        borderRadius: 10,
                                        fontSize: 13,
                                    }}
                                >
                                    ไลน์บอท
                                </button>
                                <a
                                    target="_blank"
                                    href={linkLine} rel="noreferrer"

                                    className="gradient-border sidebar-button flexCenter"
                                    style={{
                                        width: "50%",
                                        textDecoration: "none",
                                        height: 42,
                                        borderRadius: 10,
                                        fontSize: 13,
                                    }}
                                >
                                    ติดต่อเรา
                                </a>
                            </div>
                            <div
                                className="flexCenter"
                                style={{
                                    flexDirection:
                                        "column",
                                    gap: 10,
                                    margin:
                                        "10px 0",
                                    width: "100%",
                                }}
                            >
                                <button
                                    type="button"
                                    className="gradient-border sidebar-button flexCenter"
                                    style={{
                                        width:
                                            "100%",
                                        height: 42,
                                        borderRadius: 10,
                                        fontSize: 13,
                                    }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#changePasswordModal"
                                >
                                    เปลี่ยนรหัสผ่าน
                                </button>
                                <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#confirmLogout"
                                    type="button"
                                    className="gradient-border sidebar-button flexCenter"
                                    style={{
                                        width:
                                            "100%",
                                        height: 42,
                                        borderRadius: 10,
                                        fontSize: 13,
                                    }}
                                >
                                    ออกจากระบบ
                                </button>
                            </div>
                            {/* <h4>Power by</h4>
                            <img
                                src="/assets/images/newicon/TTT-03.png"
                                alt="powerby"
                            /> */}
                        </aside>
                        <div className="sidebar-container-background" />
                    </div>
                ) : (
                    ""
                )}
                {/* <!-- Modal --> */}
                {/* <!-- start profile --> */}
                <div className="modal fade" id="profile" tabindex="-1" aria-labelledby="profile" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt=""
                                            data-bs-dismiss="modal" />
                                        <p className="modal-title">โปรไฟล์</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="change-profile-modal-content-mobile" style={{ marginTop: 20 }}>
                                        {dataFromLogin?.info?.bankList?.length > 0 && dataFromLogin?.info?.bankList?.map((item) => (
                                            <div>
                                                <div className="user" style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p className="username">Bank</p>
                                                    <div>{item?.s_icon.split(".")[0]}
                                                        <img src={`/assets/images/bank/${item?.s_icon}`} alt="logo bank" style={{ width: 30, height: 30 }} className="result" />
                                                    </div>
                                                </div>
                                                <div className="user" style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p className="username">Account Number</p>
                                                    <p className="result">{item?.s_account_no}</p>
                                                </div>
                                                <div className="user" style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p className="username">Account Name</p>
                                                    <p className="result">{item?.s_account_name}</p>
                                                </div>
                                            </div>
                                        ))}

                                        <div style={{ border: "1px solid #0000001f", marginTop: 10, marginBottom: 10 }} />

                                        <div className="user" style={{ display: "flex", justifyContent: "space-between" }}>
                                            <p className="username">Line ID</p>
                                            <p className="result">{dataFromLogin?.info?.profile?.s_line}</p>
                                        </div>
                                        <div className="user" style={{ display: "flex", justifyContent: "space-between" }}>
                                            <p className="username">Username</p>
                                            <p className="result">{dataFromLogin?.info?.profile?.s_username}</p>
                                        </div>
                                        <div className="password" style={{ display: "flex", justifyContent: "space-between" }}>
                                            <p className="pass">Password</p>
                                            <p className="result">************</p>
                                        </div>
                                        <br />
                                        {/* <button type='button' className="change-password-container flexCenter" data-bs-toggle="modal"
                                            data-bs-target="#changePasswordModal">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none">
                                                <path
                                                    d="M25.033 21.7165C24.4104 21.0943 23.4014 21.0945 22.779 21.7171C22.1568 22.3397 22.157 23.3487 22.7796 23.9711L24.309 25.4996L22.7794 27.0294C22.157 27.6518 22.157 28.6607 22.7794 29.2832C23.4018 29.9056 24.4108 29.9056 25.0332 29.2832L26.5634 27.7529L28.0921 29.281C28.7148 29.9032 29.7237 29.903 30.3461 29.2804C30.9683 28.658 30.9681 27.6488 30.3455 27.0266L28.8174 25.4992L30.3457 23.9707C30.9681 23.3482 30.9681 22.3393 30.3457 21.7169C29.7233 21.0944 28.7143 21.0944 28.0919 21.7169L26.563 23.2458L25.033 21.7165Z"
                                                    fill="white" />
                                                <path
                                                    d="M11.0915 21.7171C11.7138 21.0945 12.7229 21.0943 13.3454 21.7165L14.8754 23.2458L16.4043 21.7169C17.0267 21.0944 18.0358 21.0944 18.6582 21.7169C19.2806 22.3393 19.2806 23.3482 18.6582 23.9707L17.1298 25.4992L18.6579 27.0266C19.2805 27.6488 19.2807 28.658 18.6585 29.2804C18.0362 29.903 17.0271 29.9032 16.4046 29.281L14.8759 27.7529L13.3457 29.2832C12.7233 29.9056 11.7142 29.9056 11.0918 29.2832C10.4694 28.6607 10.4694 27.6518 11.0918 27.0294L12.6215 25.4996L11.0921 23.9711C10.4695 23.3487 10.4693 22.3397 11.0915 21.7171Z"
                                                    fill="white" />
                                                <path
                                                    d="M35.0625 28.6875C34.1823 28.6875 33.4688 29.4011 33.4688 30.2812C33.4688 31.1614 34.1823 31.875 35.0625 31.875H38.7812C39.6614 31.875 40.375 31.1614 40.375 30.2812C40.375 29.4011 39.6614 28.6875 38.7812 28.6875H35.0625Z"
                                                    fill="white" />
                                                <path
                                                    d="M11.1546 10.625C7.33975 10.625 4.25 13.7177 4.25 17.5312V33.4688C4.25 37.2829 7.34202 40.375 11.1562 40.375H39.8438C43.6579 40.375 46.75 37.2829 46.75 33.4688V17.5312C46.75 13.7177 43.6602 10.625 39.8454 10.625H11.1546ZM7.4375 17.5312C7.4375 15.4768 9.10144 13.8125 11.1546 13.8125H39.8454C41.8986 13.8125 43.5625 15.4768 43.5625 17.5312V33.4688C43.5625 35.5226 41.8976 37.1875 39.8438 37.1875H11.1562C9.10244 37.1875 7.4375 35.5226 7.4375 33.4688V17.5312Z"
                                                    fill="white" />
                                            </svg>
                                            <p>เปลี่ยนรหัสผ่าน</p>
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- end profile --> */}

                {/* <!-- start  modal add account --> */}
                <div className="modal fade" id="addAccount" tabindex="-1" aria-labelledby="addAccount" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt=""
                                            data-bs-toggle="modal"
                                            data-bs-target="#profile"
                                        />
                                        <p className="modal-title" id="addAccount">เพิ่มบัญชี</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="add-account-content flexCenter">
                                        <div className="bank-section">
                                            <p>กรุณาเลือกธนาคาร</p>
                                            <div className="bank-list">
                                                <img src="/assets/icons/icon-bank-default/Ellipse 10.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 11.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 12.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 13.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 14.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 15.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 16.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 17.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 18.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 19.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 20.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 21.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 22.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 23.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 24.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 25.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 26.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 27.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 28.svg" alt="" className="bank-icon" />
                                                <img src="/assets/icons/icon-bank-default/Ellipse 29.svg" alt="" className="bank-icon" />
                                            </div>
                                        </div>

                                        <div className="bank-number">
                                            <p>กรุณากรอกเลขบัญชี</p>
                                            <div className="bank-number-input flexCenter">
                                                <div className="icon">
                                                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <g clip-path="url(#clip0_912_2229)">
                                                            <path
                                                                d="M1.6665 16.6665H18.3332V18.3332H1.6665V16.6665ZM3.33317 9.99984H4.99984V15.8332H3.33317V9.99984ZM7.49984 9.99984H9.1665V15.8332H7.49984V9.99984ZM10.8332 9.99984H12.4998V15.8332H10.8332V9.99984ZM14.9998 9.99984H16.6665V15.8332H14.9998V9.99984ZM1.6665 5.83317L9.99984 1.6665L18.3332 5.83317V9.1665H1.6665V5.83317ZM9.99984 6.6665C10.2209 6.6665 10.4328 6.57871 10.5891 6.42243C10.7454 6.26615 10.8332 6.05418 10.8332 5.83317C10.8332 5.61216 10.7454 5.4002 10.5891 5.24392C10.4328 5.08764 10.2209 4.99984 9.99984 4.99984C9.77882 4.99984 9.56686 5.08764 9.41058 5.24392C9.2543 5.4002 9.1665 5.61216 9.1665 5.83317C9.1665 6.05418 9.2543 6.26615 9.41058 6.42243C9.56686 6.57871 9.77882 6.6665 9.99984 6.6665Z"
                                                                fill="white" />
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
                {/* <!-- end  modal add account --> */}

                {/* <!-- start  modal ฝาก - ถอน --> */}
                <div className="modal fade" id="depositWithdraw" tabindex="-1" aria-labelledby="depositWithdraw" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal" data-bs-target="#bagModal" />
                                        <p className="modal-title" id="depositWithdraw">ฝาก - ถอน</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="deposit-withdraw-modal-content">

                                        <div className="slider-wrapper flexCenter">
                                            <div className="active slider" />
                                            <div className="slider" />
                                        </div>

                                        <div style={{
                                            display: 'grid',
                                            gap: 5,
                                            gridTemplateColumns: 'repeat(3, 1fr)',
                                            color: 'white',
                                        }}>
                                            <div style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#autoDeposit"
                                                data-bs-dismiss="modal">
                                                <div className="type-of-withdrawal">
                                                    <div className="withdrawal">
                                                        <img src="/assets/images/credit-card-machine.svg" alt="kkk" />
                                                        <div>ฝากเงินออโต้</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#leaveAdecimal"
                                                data-bs-dismiss="modal">
                                                <div className="type-of-withdrawal">
                                                    <div className="withdrawal">
                                                        <img style={{ width: 30 }} src="/assets/images/qrpay.png" alt="kkk" />
                                                        <div>QR Code</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#withdraw" data-bs-dismiss="modal">
                                                <div className="type-of-withdrawal">
                                                    <div className="withdrawal">
                                                        <img src="/assets/images/Withdraw-money.svg" alt="kkk" />
                                                        <div>ถอนเงิน</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div data-bs-toggle="modal" data-bs-target="#qrplay" data-bs-dismiss="modal" style={{ cursor: 'pointer' }}>
                                                <div className="type-of-withdrawal">
                                                    <div className="withdrawal">
                                                        <img src="/assets/images/scan.svg" alt="kkk" />
                                                        <div>QR PAY</div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            {/* <div style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#slipVerify"
                                                data-bs-dismiss="modal">
                                                <div className="type-of-withdrawal">
                                                    <div className="withdrawal">
                                                        <img src="/assets/images/verified.svg" alt="kkk" />
                                                        <div>Slip Verify</div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>

                                        <div style={{ textAlign: "center", marginTop: 10 }}>
                                            <div style={{ fontSize: 12 }}>
                                                พบปัญหา
                                                <span style={{
                                                    color:
                                                        "rgba(0, 252, 252, 1)",
                                                    textDecoration:
                                                        "underline",
                                                    cursor:
                                                        "pointer",
                                                    fontSize: 13,
                                                }}>ติดต่อฝ่ายบริการลูกค้า</span>
                                            </div>
                                        </div>

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
                {/* <!-- end  modal ฝาก - ถอน --> */}

                {/* <!-- start  modal ฝากออโต้ --> */}
                <div className="modal fade" id="autoDeposit" tabindex="-1" aria-labelledby="autoDeposit" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal"
                                            data-bs-target="#depositWithdraw" />
                                        <p className="modal-title" id="autoDeposit">ฝากออโต้</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="detail-card-scb" style={{ background: depositBankList && depositBankList?.background, borderRadius: 20 }}>
                                        <div className="card-scb flexBetween">
                                            <div className="left">
                                                <p style={{ margin: 0 }}>{depositBankList && depositBankList?.s_fname_th}</p>
                                                <p style={{ margin: 0 }}>{depositBankList && depositBankList?.s_account_name}</p>
                                                <p style={{ margin: 0 }}>{depositBankList && depositBankList?.s_account_no}
                                                    <span>
                                                        <img src="/assets/images/icon-coppy.svg" data-bs-dismiss="modal"
                                                            onClick={() => _copyAccountNo(depositBankList?.s_account_no)} alt=""
                                                            style={{ width: 35, height: 35, marginBottom: 3, marginLeft: 8 }} />
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="right" style={{ height: 80 }}>
                                                <div className="flexCenter bank">
                                                    <h3 style={{ textTransform: "uppercase" }}>{depositBankList && depositBankList?.s_icon?.split(".")[0]}</h3>
                                                    <div style={{ borderRadius: '100%', marginTop: -10 }}>
                                                        <img src={`/assets/images/bank/${depositBankList && depositBankList?.s_icon}`} alt="scb" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="deposit-bank-title">เปลี่ยนธนาคาร</div>
                                                    <img onClick={() => _getOptionBank()} onKeyDown={() => ''}
                                                        className="arrow-down"
                                                        style={{ display: disableArrow === true ? "none" : "block", cursor: "pointer" }} src="/assets/images/arrow-bottom.svg" alt="" srcset="" />
                                                    <select
                                                        onChange={(e) => _getOptionBank2(e.target.value)}
                                                        className="deposit-bank-list"
                                                        style={{ display: disableArrow === true ? "block" : "none" }}>
                                                        {dataFromLogin?.info?.bankDeposit.length > 0 && dataFromLogin?.info?.bankDeposit?.map((bank) => (
                                                            <option value={JSON.stringify(bank)}>{bank?.s_fname_th}</option>
                                                        ))}

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div data-bs-toggle="modal" data-bs-target="#slipVerify" >
                                            <div className="btn-slip">
                                                <div style={{ color: "white" }}>
                                                    <img style={{ width: 20, height: 20 }} src="/assets/images/icons8-exclamation-50.png" alt="exclamation" /> แจ้งเงินไม่เข้า /แบบสลิป
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "center", marginTop: 10 }}>
                                        <div>
                                            พบปัญหา
                                            <span style={{
                                                color: 'rgba(0, 252, 252, 1)',
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                            }}>ติดต่อฝ่ายบริการลูกค้า</span>
                                        </div>
                                    </div>
                                    {/* <div className="button-line" style={{ margin: "0 auto", width: "95%" }}>
                                        <div>
                                            <img src="/assets/icons/icon-line.svg" alt="line" /> ไลน์บอท /
                                            แจ้งเตือนยอดฝาก - ถอน
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- end  modal ฝาก - ถอน --> */}

                {/* <!-- start  modal ฝากทศนิยม --> */}
                <div className="modal fade" id="leaveAdecimal" tabindex="-1" aria-labelledby="leaveAdecimal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal"
                                            data-bs-target="#depositWithdraw" data-bs-dismiss="modal" />
                                        <p className="modal-title" id="leaveAdecimal">QR Code</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div style={{ marginTop: 30, }}>
                                        <select
                                            onChange={(e) => _getOptionBankQR(e.target.value)}
                                        >
                                            {dataFromLogin?.info?.bankDeposit?.length > 0 && dataFromLogin?.info?.bankDeposit?.map((bank) => (
                                                <option key={bank?.index} value={bank?.s_account_no}>{bank?.s_fname_th}</option>
                                            ))}

                                        </select>
                                    </div>
                                    <div style={{ width: 150, marginTop: 20, background: "#FFFF", padding: 12, borderRadius: 8, display: "flex", justifyContent: "center" }}>
                                        <QRCode value={numberQRCode} />
                                    </div>
                                    <div style={{ marginTop: 20 }}>
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

                {/* <!-- ถอนเงิน start  modal --> */}
                <div className="modal fade" id="withdraw" tabindex="-1" aria-labelledby="withdraw" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal"
                                            data-bs-target="#depositWithdraw" data-bs-dismiss="modal" />
                                        <p className="modal-title" id="withdraw">ถอนเงิน</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="withdraw-modal-content" style={{ marginTop: 40 }}>
                                        <div className="money-input" style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>จำนวนเงินที่ถอนได้</div>
                                            <div type="text">{dataUser?.amount}</div>
                                        </div>
                                        <p style={{ color: "red", marginLeft: 14 }}>{reMessage}</p>

                                        <div className="button-warning" data-bs-dismiss={reMessage !== "" ? "not-modal" : "modal"} onClick={() => _withdrawMoney()} onKeyDown={() => ''}>ถอนเงิน</div>
                                        <p style={{ marginLeft: 16, marginTop: 10 }}>พบปัญหา <a href="/">ติดต่อฝ่ายบริการลูกค้า</a></p>
                                        {/* <button style={{ marginLeft: 16, marginTop: 10, marginBottom: 18 }} type='button' className="line-button flexCenter">
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
                <div className="modal fade" id="qrplay" tabindex="-1" aria-labelledby="qrplay" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal"
                                            data-bs-target="#depositWithdraw" data-bs-dismiss="modal" />
                                        <p className="modal-title" id="qrplay">QR PAY</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="qr-pay-content-1">
                                        <ul className="notic-text">
                                            <li>ฝากขั้นต่ำ 100 บาท สูงสุด 50,000.00 บาท *</li>
                                        </ul>

                                        <div className="bank-selector">
                                            <select className="vodiapicker">
                                                <option value="kbank" className="test"
                                                    data-thumbnail="https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png">
                                                </option>
                                                <option value="au" data-thumbnail="https://www.uhub.co.th/assets/images/icons/mobile/scb-icon.png">
                                                </option>
                                            </select>

                                            <div className="lang-select">
                                                <button type='button' className="btn-select" value="">.</button><img src="/assets/icons/icon-drow.svg" alt=""
                                                    style={{ margin: "5px 0 0 -27px" }} />
                                                <div className="b">
                                                    <ul id="a">.</ul>
                                                </div>
                                            </div>

                                            <input type="text" className="show-username-bank" placeholder="นาย ปปปปป ปปปปป" />
                                        </div>

                                        <div className="confirmation">
                                            <input type="text" className="text-amount-money" placeholder="กรอกจำนวนเงินที่ต้องการฝาก" />
                                            <button type='button' className="button-warning" style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#showQR"
                                                data-bs-dismiss="modal">
                                                <div>ยืนยันจำนวนเงิน</div>
                                            </button>
                                        </div>

                                        <div className="info-text">
                                            <p>
                                                พบปัญหา
                                                <a href="/" style={{
                                                    color: 'rgba(0, 252, 252, 1)',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                }}>ติดต่อฝ่ายบริการลูกค้า</a>
                                            </p>
                                        </div>
                                        <div className="button-line" style={{ width: "95%" }}>
                                            <div className="flexBetween" style={{ padding: "5px 5px", borderRadius: 5 }}>
                                                <img src="/assets/icons/icon-line.svg" alt="line" /> ไลน์บอท
                                                / แจ้งเตือนยอดฝาก - ถอน
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
                <div className="modal fade" id="showQR" tabindex="-1" aria-labelledby="showQR" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal"
                                            data-bs-target="#qrplay" data-bs-dismiss="modal" />
                                        <p className="modal-title" id="showQR">QR PAY</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
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
                                        <div style={{ textSlign: "center", marginTop: 10 }}>
                                            <div>
                                                พบปัญหา
                                                <span style={{
                                                    color:
                                                        "rgba(0, 252, 252, 1)",
                                                    textDecoration:
                                                        "underline",
                                                    cursor:
                                                        "pointer",
                                                }}>ติดต่อฝ่ายบริการลูกค้า</span>
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
                <div className="modal fade" id="slipVerify" tabindex="-1" aria-labelledby="slipVerifyLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal"
                                            data-bs-target="#depositWithdraw" data-bs-dismiss="modal" />
                                        <p className="modal-title">Slip Verify</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
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
                                                <option key={bank?.index} value={bank?.i_bank}>{bank?.s_fname_th}</option>
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
                                        <p>พบปัญหา <a href="/">ติดต่อฝ่ายบริการลูกค้า</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- slip verify end --> */}

                {/* <!-- history modal --> */}
                <div className="modal fade" id="historyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <p className="modal-title">{tabs}</p>
                                        <img src="../assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
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
                                                onKeyDown={() => ""} id="tab-deposit"
                                            >
                                                ฝาก
                                            </div>
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
                                            {dataHistoryDeposit?.length > 0 && dataHistoryDeposit?.map((deposit) => (
                                                <div className="history-list">
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
                                            {dataHistoryWithdraw?.length > 0 && dataHistoryWithdraw?.map((withdraw) => (
                                                <div className="history-list">
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
                                            {dataHistoryBonus?.length > 0 && dataHistoryBonus?.map((bonus) => (
                                                <div className="history-list">
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

                {/* <!-- promotion modal --> */}
                <div className="modal fade" id="promotionModal" tabindex="-1" aria-labelledby="promotionModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal"
                                            data-bs-target="#bagModal" data-bs-dismiss="modal" />
                                        <p className="modal-title">โปรโมชั่น</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="promotion-modal-content">
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <div onClick={() => _newSl("DELETE")} style={{ color: "red" }} onKeyDown={() => ""}>
                                                <FontAwesomeIcon icon={faChevronCircleLeft} style={{ color: '#FFF', fontSize: 25 }} />
                                            </div>
                                            <div style={{ padding: 20 }}>
                                                {dataPromotion?.length > 0 && (
                                                    <img
                                                        src={`data:image/jpeg;base64,${dataPromotion[nextSliderPage]?.s_source_img}`}
                                                        className="promotion-modal-image"
                                                        alt=""
                                                        style={{ width: "100%", }}
                                                    />
                                                )}
                                            </div>
                                            <div onClick={() => _newSl("ADD")} style={{ color: "green" }} onKeyDown={() => ""}>
                                                <FontAwesomeIcon icon={faChevronCircleRight} style={{ color: '#FFF', fontSize: 25 }} />
                                            </div>
                                        </div>
                                        <div className="promotion-modal-footer">
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
                                                onKeyDown={() => ""}
                                                onClick={() => approverPromotion(dataPromotion[nextSliderPage])}
                                            >รับโบนัส</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- promotion modal end --> */}

                {/* <!-- change password modal --> */}
                <div className="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal"
                                            data-bs-target="#bagModal" data-bs-dismiss="modal" />
                                        <p className="modal-title">เปลี่ยนรหัส</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="change-password-modal-content">
                                        <div className="border-input-gold">
                                            <input type="password" placeholder="กรุณากรอกรหัสผ่านเดิม" className="input-for-border-gold" onChange={(e) => setOldPassword(e.target.value)} />
                                        </div>
                                        <div className="change-password-hr">
                                            <div className="hr" />
                                        </div>
                                        <div className="border-input-gold">
                                            <input type="password" placeholder="กรุณากรอกรหัสผ่านใหม่" className="input-for-border-gold" onChange={(e) => setNewPassword(e.target.value)} />
                                        </div>
                                        <div className="border-input-gold">
                                            <input type="password" placeholder="กรุณากรอกรหัสผ่านใหม่อีกครั้ง" className="input-for-border-gold" onChange={(e) => setNewPasswordVery(e.target.value)} />
                                        </div>

                                        <button type="button" className="button-warning" data-bs-dismiss="modal" onClick={() => _ChangePassword()}>ยืนยัน</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- change password modal end --> */}

                {/* <!-- Earn Bag Modal --> */}
                <div className="modal fade" id="bagModal" tabindex="-1" aria-labelledby="bagModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <p className="modal-title">กระเป๋า</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="bag-modal-content">

                                        <div className="bag-modal-menu" style={{ marginTop: 30 }}>
                                            <div className="bag-modal-menu-item" id="promotion-modal-btn" data-bs-toggle="modal"
                                                data-bs-target="#promotionModal" data-bs-dismiss="modal">
                                                <div className="bag-menu-img-container">
                                                    <img className="bag-menu-icon" src="/assets/icons/icon-promotion.svg" alt="" />
                                                </div>
                                                <p className="bag-modal-menu-title"> โปรโมชั่น</p>
                                            </div>
                                            <div className="bag-modal-menu-item" data-bs-toggle="modal" data-bs-target="#depositWithdraw"
                                                data-bs-dismiss="modal">
                                                <div className="bag-menu-img-container">
                                                    <img className="bag-menu-icon" src="/assets/icons/icon-withdraw.svg" alt="" />
                                                </div>
                                                <p className="bag-modal-menu-title">ฝาก - ถอน</p>
                                            </div>
                                            <div className="bag-modal-menu-item" data-bs-toggle="modal" data-bs-target="#earnMoneyModal"
                                                data-bs-dismiss="modal">
                                                <div className="bag-menu-img-container">
                                                    <img className="bag-menu-icon" src="/assets/icons/icon-earn-money.svg" alt="" />
                                                </div>
                                                <p className="bag-modal-menu-title">สร้างรายได้</p>
                                            </div>
                                            <div className="bag-modal-menu-item" data-bs-toggle="modal" data-bs-target="#earnMoneyDetailModal"
                                                data-bs-dismiss="modal">
                                                <div className="bag-menu-img-container">
                                                    <img className="bag-menu-icon" src="/assets/images/affiliate-image.svg" alt="" />
                                                </div>
                                                <p className="bag-modal-menu-title">ถอน <span style={{ fontSize: 10 }}>Affiliate</span></p>
                                            </div>
                                            <div className="bag-modal-menu-item" id="code-modal-btn" data-bs-toggle="modal" data-bs-target="#codeModal"
                                                data-bs-dismiss="modal">
                                                <div className="bag-menu-img-container">
                                                    <img className="bag-menu-icon" src="/assets/icons/icon-ticket.svg" alt="" />
                                                </div>
                                                <p className="bag-modal-menu-title">กรอกโค้ด</p>
                                            </div>
                                            <div className="bag-modal-menu-item" data-bs-toggle="modal" data-bs-target="#cashback"
                                                data-bs-dismiss="modal">
                                                <div className="bag-menu-img-container">
                                                    <img className="bag-menu-icon" src="/assets/icons/icon-back-cash.svg" alt="" />
                                                </div>
                                                <p className="bag-modal-menu-title">คืนยอดเสีย</p>
                                            </div>
                                            <div className="bag-modal-menu-item" data-bs-toggle="modal"
                                                data-bs-target="#spinnerModal"
                                                data-bs-dismiss="modal">
                                                <div className="bag-menu-img-container">
                                                    <img
                                                        className="bag-menu-icon"
                                                        src="/assets/images/icon-teasure.svg"
                                                        alt=""
                                                    />
                                                </div>
                                                <p className="bag-modal-menu-title">กงล้อ</p>
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
                <div className="modal fade" id="earnMoneyModal" tabindex="-1" aria-labelledby="earnMoneyModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal"
                                            data-bs-target="#bagModal" data-bs-dismiss="modal" />
                                        <p className="modal-title">สร้างรายได้</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
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
                                                        <button type="button" className="btn-copy-link" data-bs-dismiss="modal" onClick={() => _copyLinkAffiliate(dataFromLogin?.info?.shorturl)} onKeyDown={() => ""}>
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

                <div className="modal fade" id="earnMoneyDetailModal" tabindex="-1" aria-labelledby="earnMoneyDetailModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal"
                                            data-bs-target="#bagModal" data-bs-dismiss="modal" />
                                        <p className="modal-title">สร้างรายได้</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="earn-modal-content">
                                        <div className="earn-tab-container">
                                            <div className="border-input-gold">
                                                <div className="earn-tab">
                                                    <div onClick={() => _tabAffiliate("overview")}
                                                        onKeyDown={() => ""}
                                                        className={
                                                            tabNameAffiliate === "overview" ?
                                                                "earn-tab-item active" :
                                                                "earn-tab-item"}>
                                                        ภาพรวม
                                                    </div>
                                                    <div className="border-input-gold earn-tab-item-2"
                                                        onClick={() => _tabAffiliate("income")}
                                                        onKeyDown={() => ""}>
                                                        <div
                                                            className={
                                                                tabNameAffiliate === "income" ?
                                                                    "earn-tab-item active" :
                                                                    "earn-tab-item"
                                                            }>
                                                            รายได้
                                                        </div>
                                                    </div>
                                                    <div onClick={() => _tabAffiliate("withdraw-income")}
                                                        onKeyDown={() => ""}
                                                        className={
                                                            tabNameAffiliate ===
                                                                "withdraw-income" ?
                                                                "earn-tab-item active" :
                                                                "earn-tab-item"}>
                                                        ถอนรายได้
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="earn-detail-data" style={{ display: tabNameAffiliate === "overview" ? "block" : "none" }}>
                                            <div className="filter-date">
                                                <p className="filter-label">ภาพรวมวันที่</p>
                                                <input className="filter-date-input" value={overviewDate} type="month" name="" id="" />
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
                                                        {dataOverview.length > 0 && dataOverview?.map((item, index) => (
                                                            <div className="tr-earn">
                                                                <span className="td-earn">1/01/66</span>
                                                                <span className="td-earn">110</span>
                                                                <span className="td-earn">40</span>
                                                                <span className="td-earn">11,668</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="filter-date">
                                                <p className="filter-label">ภาพรวมทั้งเดือน</p>
                                                <select className="filter-date-input" onChange={(event) => _selectYear(event?.target?.value)}>
                                                    {years.map(year => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
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
                                                        {dataOverviewYears?.length > 0 && dataOverviewYears?.map((item, index) => (
                                                            <div className="tr-earn">
                                                                <span className="td-earn">{item?.month}</span>
                                                                <span className="td-earn">{item?.regisCount}</span>
                                                                <span className="td-earn">{item?.f_affiliate_credit}</span>
                                                                <span className="td-earn">{item?.deposit}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="earn-detail-data" style={{ display: tabNameAffiliate === "income" ? "block" : "none" }}>
                                            <div className="filter-date">
                                                <p className="filter-label" style={{ fontSize: 12 }}>
                                                    ประวัติรายได้
                                                </p>
                                                <div style={{ float: "right", display: "flex" }}>
                                                    <input
                                                        className="filter-date-input"
                                                        value={incomeDateStart}
                                                        onChange={(event) => _getIncomeDateStart(event)}
                                                        type="month" name="" id="" />
                                                    <input
                                                        className="filter-date-input"
                                                        value={incomeDateEnd}
                                                        onChange={(event) => _getIncomeDateEnd(event)}
                                                        type="month" name="" id="" />
                                                </div>
                                            </div>

                                            <div className="border-input-gold">
                                                <div className="table-earn-date">
                                                    <div className="border-input-gold">
                                                        <div className="th-earn-container">
                                                            <span className="th-earn">รอบบิล</span>
                                                            <span className="th-earn">จำนวนเงิน</span>
                                                        </div>
                                                    </div>

                                                    <div className="tr-earn-container">
                                                        {dataIncome?.length > 0 && dataIncome?.map((item, index) => (
                                                            <div className="tr-earn" key={index}>
                                                                <span className="td-earn">{item?.d_date}</span>
                                                                <span className="td-earn">{item?.f_affiliate}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="earn-detail-data" style={{ display: tabNameAffiliate === "withdraw-income" ? "block" : "none" }}>
                                            <div className="border-input-gold">
                                                <div className="form-withdraw-income">
                                                    <div className="form-withdraw-group">
                                                        <label className="form-withdraw-label">รายได้ปัจจุบัน</label>
                                                        <input type="text" value={dataFromLogin?.balance?.affiliate} className="form-withdraw-input" />
                                                    </div>
                                                    {/* <div className="form-withdraw-group">
                                                    <label className="form-withdraw-label">จำนวนเงินที่ต้องการถอน</label>
                                                    <input type="text" placeholder="ถอนไม่มีขั้นต่ำ" className="form-withdraw-input" />
                                                </div> */}

                                                    <button type="button" onClick={() => _getReceiveAffiliate(dataFromLogin?.balance?.affiliate)} className="btn-withdraw-income">
                                                        ถอนรายได้
                                                    </button>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="filter-date">
                                                <p className="filter-label">ประวัติรายได้</p>
                                            </div>

                                            <div className="border-input-gold">
                                                <div className="table-earn-date">
                                                    <div className="border-input-gold">
                                                        <div className="th-earn-container">
                                                            <span className="th-earn">วัน/เวลา</span>
                                                            <span className="th-earn">จำนวนเงิน</span>
                                                        </div>
                                                    </div>

                                                    <div className="tr-earn-container">
                                                        {dataHistoryAffiliate?.length > 0 && dataHistoryAffiliate?.map((item, index) => (
                                                            <div className="tr-earn">
                                                                <span className="td-earn">{item?.d_create}</span>
                                                                <span className="td-earn">{item?.f_amount}</span>
                                                            </div>
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="read-earn-rule">
                                            หากมีข้อสงสัยเพิ่มเติม
                                            <a href="https://www.google.com/">อ่านกฏกติกา</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- earn money modal end --> */}

                {/* <!-- code modal --> */}
                <div className="modal fade" id="codeModal" tabindex="-1" aria-labelledby="codeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal"
                                            data-bs-target="#bagModal" data-bs-dismiss="modal" />
                                        <p className="modal-title">กรอกโค้ด</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="code-modal-content">
                                        <input type="text" placeholder="กรุณากรอกโค้ด" className="input-box" onChange={(e) => setCodeCupon(e.target.value)} />
                                        <div style={{ color: "red", marginTop: -18 }}>{reMessage}</div>
                                        <button type="button" className="button-warning" onClick={() => _addCupon()}>ยืนยัน</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- code modal end --> */}

                {/* <!-- spinner modal --> */}
                <div className="modal fade" id="spinnerModal" tabindex="-1" aria-labelledby="spinnerModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal"
                                            data-bs-target="#bagModal" data-bs-dismiss="modal" />
                                        <p className="modal-title">กงล้อ</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="spinner-modal-content">
                                        <p className="spinner-modal-title">แต้มทั้งหมด : {currentPoint?.currentPoint}</p>
                                        <div className="spinner-modal-body" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            {dataSpinWheel.length > 0 &&
                                                <Roulette
                                                    data={dataSpinWheel}
                                                    setOutputSpin={setOutputSpin}
                                                    username={dataFromLogin?.username}
                                                    setCurrentPoint={setCurrentPoint} />}
                                            <p style={{ margin: 'none', marginTop: 10 }}>เครดิตกงล้อ : {outputSpin}</p>
                                            <div style={{ fontWeight: 500, fontSize: 16, textDecoration: "underline" }}>รายละเอียด</div>
                                            <p style={{ margin: 'none' }}>หมุนได้ทั้งหมด {limitSpinWheel?.i_max} ครั้ง ใช้สิทธิไปแล้ว 3 ครั้ง</p>
                                            <p style={{ margin: 'none' }}>ภายในวันสามารถใข้สิทธิได้ {limitSpinWheel?.i_per_day} ครั้ง</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- spinner modal end --> */}

                {/* <!-- credit modal --> */}
                <div className="modal fade" id="creditModal" tabindex="-1" aria-labelledby="creditModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal"
                                            data-bs-target="#bagModal" data-bs-dismiss="modal" />
                                        <p className="modal-title">เครดิตฟรี</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="credit-modal-content">
                                        <div className="border-input-gold">
                                            <div className="credit-modal-body">
                                                {/* <!-- show this if no credit --> */}


                                                {/* <!-- show this if thre is free credit --> */}
                                                <div className="free-credit">
                                                    <div className="credit-point-content">
                                                        <img className="credit-point-img" src="/assets/images/coin.png" alt="" />
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
                <div className="modal fade" id="cashback" tabindex="-1" aria-labelledby="cashback" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal" data-bs-target="#bagModal" />
                                        <p className="modal-title">Cashback</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="cash-back-content">
                                        <div>ยอดเสียสะสมของคุณ (คืนยอดเสีย {maxLevel} %)</div>
                                        <button className="btn-history" data-bs-toggle="modal"
                                            data-bs-target="#cashbackDetail" type="button" >ประวัติการรับ</button>
                                        <div style={{ color: 'red' }}>{reMessage}</div>
                                        <div>อัพเดทล่าสุด {historyCashBack?.length > 0 && historyCashBack[historyCashBack?.length - 1]?.d_create}</div>
                                        <button type="button" onClick={() => _receiveCashBack()} className="btn-get-credit">รับเข้าเครดิต</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- end cashback --> */}

                {/* <!-- start cashback detail --> */}
                <div className="modal fade" id="cashbackDetail" tabindex="-1" aria-labelledby="cashbackDetail" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal"
                                            data-bs-target="#cashback" data-bs-dismiss="modal" />
                                        <p className="modal-title">ประวัติการรับ</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="change-cashback-detail-modal-content">
                                        <div className="detail">
                                            <div>วันเวลา</div>
                                            <div>จำนวนเงิน</div>
                                        </div>
                                        {historyCashBack?.length > 0 && historyCashBack?.map((item, index) => (
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
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
                </div>
                {/* <!-- end cashback detail --> */}

                {/* <!-- diamond modal --> */}
                <div className="modal fade" id="diamondModal" tabindex="-1" aria-labelledby="diamondModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-border">
                            <div className="modal-content">
                                <div className="modal-header-container">
                                    <div className="modal-header">
                                        <img src="/assets/icons/icon-back-modal.svg" className="modal-icon-back" alt="" data-bs-toggle="modal"
                                            data-bs-target="#bagModal" data-bs-dismiss="modal" />
                                        <p className="modal-title">เพชรฟรี</p>
                                        <img src="/assets/icons/icon-close-modal.svg" className="modal-icon-close" data-bs-dismiss="modal"
                                            aria-label="Close" alt="" />
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div className="credit-modal-content">
                                        <div className="border-input-gold">
                                            <div className="credit-modal-body">


                                                {/* <!-- show this if thre is free credit --> */}
                                                <div className="free-credit">
                                                    <div className="credit-point-content">
                                                        <img className="credit-point-img" src="/assets/images/gem.svg" alt="" />
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
                                        <a href={Constant?.LINK_WORDPRESS} className="btn-confirm-logout" style={{ textDecoration: "none" }}>ยืนยัน</a>
                                        <button type="button" className="btn-cancel-confirm-logout" data-bs-dismiss="modal">ยกเลิก</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- confirm logout modal end --> */}
            </main>

        </div>
    )
}

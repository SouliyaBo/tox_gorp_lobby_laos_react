/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jsQR from "jsqr";
import { faChevronCircleLeft, faChevronCircleRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "react-slideshow-image/dist/styles.css";
import "react-slideshow-image/dist/styles.css";
import { CheckLevelCashBack, DataLoginInRout, FillerCategory, OpenNewTabWithHTML, formatMontYear, EncriptBase64 } from "../../helper";
import Constant, { AGENT_CODE } from "../../constant";
import { BackList } from "../../constant/bankList";
import { SlideDemo } from "../../constant/demoSlide";
import _LoginController from "../../api/login";
import QRCode from "qrcode.react";
import Roulette from "../../component/Roulette";
import ModalNews from "../../component/ModalNews";
import toast, { Toaster } from "react-hot-toast";
import Translate from "../../component/Translate";
import { useTranslation } from "react-i18next";

export default function AfterLogin() {
  const history = useHistory();
  const { t } = useTranslation();
  const UseParams = useParams();
  const user = localStorage.getItem(Constant?.LOGIN_TOKEN_DATA);
  const sidebarUseRef = useRef(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarAnimation, setSidebarAnimation] = useState(true);
  const [tabs, setTabs] = useState(t("DepositHistory"));
  const [tabName, setTabName] = useState("tab-deposit");
  const [tabNameAffiliate, setTabNameAffiliate] = useState("overview");
  const [reMessage, setReMessage] = useState("");
  const [maxLevel, setmaxLevel] = useState();
  const [historyCashBack, setHistoryCashBack] = useState([]);
  const [dataPromotion, setDataPromotion] = useState([]);
  const [disableArrow, setDisableArrow] = useState(false);
  const { ChangePassword, loginPlayNow } = _LoginController();
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
  const [userBankList, setUserBankList] = useState();
  const [current, setCurrent] = useState(0);
  const [sliderData, setSliderData] = useState([]);
  const [percentageData, setPercentageData] = useState([]);

  const [show, setShow] = useState(false);
  const [showCupong, setShowCupong] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowCupong = () => setShowCupong(true);
  const handleCloseCupong = () => setShowCupong(false);

  const [oldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [NewPasswordVery, setNewPasswordVery] = useState("");
  const [logoWebsite, setLogoWebsite] = useState("");
  const [linkLine, setLinkLine] = useState("");
  const [numberQRCode, setNumberQRCode] = useState("");
  const [file, setFile] = useState(null);
  const [bankAgentCode, setBankAgentCode] = useState("");
  const [promotionCode, setPromotionCode] = useState("");
  const [dataSpinWheel, setDataSpinWheel] = useState([]);
  const [outputSpin, setOutputSpin] = useState("");
  const [limitSpinWheel, setLimitSpinWheel] = useState({});
  const [currentPoint, setCurrentPoint] = useState({});
  const [notCurrentPoint, setNotCurrentPoint] = useState(0);
  const [dataOverview, setDataOverview] = useState([]);
  const [dataOverviewYears, setDataOverviewYears] = useState([]);
  const [dataIncome, setDataIncome] = useState([]);
  const [dataHistoryAffiliate, setDataHistoryAffiliate] = useState([]);
  const [codeCupon, setCodeCupon] = useState("");

  const [overviewDate, setOverviewDate] = useState();
  const [incomeDateStart, setIncomeDateStart] = useState(formatMontYear(new Date()));
  const [incomeDateEnd, setIncomeDateEnd] = useState(formatMontYear(new Date()));
  const [years, setYears] = useState([]);
  const [animationRefresh, setAnimationRefresh] = useState(false);
  const [supong, setCupong] = useState(false);
  const [dataBackOffice, setDataBackOffice] = useState({});
  const [dataBackOfficeNews, setDataBackOfficeNews] = useState([]);
  const [iBank, setIBank] = useState("");
  const [amountWithdraw, setAmountWithdraw] = useState("");
  const [showNews, setShowNews] = useState(false);
  const [dataWallet, setDataWallet] = useState({});

  const handleCloseNew = () => setShowNews(false);
  const handleShowNew = () => setShowNews(true);

  useEffect(() => {
    getDataBackOffice();
    getDataBackOfficeNews();
    setOverviewDate(formatMontYear(new Date()));
    const _data = DataLoginInRout(history?.location?.state);
    if (_data) {
      setLinkLine(_data?.info?.configLobby?.s_line);
      setDataFromLogin(_data);
      const wallet = _data?.info?.bankDeposit.filter((data) => data?.i_bank === "7");
      setDataWallet(wallet[0]);
      setCurrentPoint(_data?.balance?.cevent);
      setDepositBankList(_data?.info?.bankDeposit[0]);
      const color = BackList.filter((data) => data?.bankName === _data?.info?.bankDeposit[0]?.s_fname_th);
      if (color?.length > 0) {
        setDepositBankList({ ..._data?.info?.bankDeposit[0], background: color[0].backgroundColor });
      }
      setUserBankList(_data?.info?.bankList[0]);
      const dataBank = BackList.filter((data) => data?.code.toString() === _data?.info?.bankList[0]?.i_bank);
      if (dataBank?.length > 0) {
        setUserBankList({ ..._data?.info?.bankList[0], background: dataBank[0].backgroundColor, bankName: dataBank[0].bankName });
      }
    }
    setDataPromotion(history?.location?.state?.info?.promotionList);
    getSpinWheel();
    const currentYear = new Date().getFullYear();
    const yearArray = [];
    for (let year = 2020; year <= currentYear; year++) {
      yearArray.push(year);
    }
    setYears(yearArray);
    // handleShowNew();
  }, []);

  useEffect(() => {
    if (UseParams?.token) {
      loginByToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UseParams?.token]);

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
        hasTouchScreen = /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
    if (hasTouchScreen) {
      setDeviceType("Mobile");
    } else {
      setDeviceType("Desktop");
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
  useEffect(() => {
    if (outputSpin) {
      _getData();
      toast.success("ได้รับ" + outputSpin);
    }
  }, [outputSpin]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [current]);

  useEffect(() => {
    if (user !== null) {
      _checkToken();
    }
  }, [user]);

  useEffect(() => {
    _clickCategoryGame("SLOT");
    if (dataFromLogin) {
      _getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFromLogin]);
  const loginByToken = async () => {
    let _res = await EncriptBase64(UseParams?.token);
    if (_res?.agentCode && _res?.username && _res?.password) {
      loginPlayNow(_res?.username, _res?.password);
    }
  };
  const getDataBackOffice = async () => {
    try {
      const _res = await axios({
        method: "get",
        url: `${Constant.SERVER_URL}/agent/${Constant?.AGENT_CODE}`,
      });
      if (_res?.data?.status === 200) {
        setDataBackOffice(_res?.data?.data);
        if (_res?.data?.data?.slide?.wallet.length > 0) {
          setSliderData(_res?.data?.data?.slide?.wallet);
        } else {
          setSliderData(SlideDemo);
        }
      }
    } catch (error) {}
  };
  const getDataBackOfficeNews = async () => {
    try {
      const _res = await axios({
        method: "get",
        url: `${Constant.SERVER_URL}/news?agent=${Constant?.AGENT_CODE}`,
      });
      if (_res?.data?.data?.length > 0) {
        // console.log("_res:: ", _res);
        setDataBackOfficeNews(_res?.data?.data);
      }
    } catch (error) {}
  };
  const _checkToken = async (token) => {
    try {
      const _res = await axios({
        method: "get",
        url: `${Constant.SERVER_URL}/Authen/CheckTokenLogin/eWVEOXhSV2g2N0t1c2thdjRnOUMwYmt6ZHVpdzY3MGR6M2JFNjByVmQ5MD0=`,
      });
      if (_res?.data?.data) {
        const presentTime = new Date();
        const futureTime = new Date(_res?.data?.data?.d_session_expire);
        if (presentTime > futureTime) {
          // history.push("/")
        }
      }
    } catch (error) {}
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
  const _clickTabDeposit = (tab) => {
    setTabName(tab);
    if (tab === "tab-deposit") {
      setTabs(t("DepositHistory"));
    } else if (tab === "tab-withdraw") {
      setTabs(t("WithdrawalHistory"));
    } else {
      setTabs(t("BonusHistory"));
    }
  };

  const getQRCode = async (accountNumber) => {
    const _data = await axios.post(`${Constant.SERVER_URL}/genarate-qr-code/${Constant.AGENT_CODE}`, {
      recipientAccountNum: accountNumber,
    });
    setNumberQRCode(_data?.data?.data?.respData?.qrCode);
  };

  const getSpinWheel = async () => {
    let data = JSON.stringify({
      s_agent_code: Constant?.AGENT_CODE,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${Constant.SERVER_URL}/LuckyWheel/Inquiry?XDEBUG_SESSION_START=netbeans-xdebug`,
      headers: {
        "authorization-agent": "{{AUTHEN-VALUE-AGENT}}",
        "authorization-token": "{{AUTHEN-VALUE-TOKEN}}",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setDataSpinWheel(response.data.data[0]?.eventItem);
        setLimitSpinWheel(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const _getData = async () => {
    try {
      const _res = await axios({
        method: "post",
        url: `${Constant.SERVER_URL}/Member/Balance`,
        data: {
          s_agent_code: dataFromLogin?.agent,
          s_username: dataFromLogin?.username,
        },
      });
      if (_res?.data?.statusCode === 0) {
        setAmountWithdraw(_res?.data?.data?.amount);
        setDataUser(_res?.data?.data);
        setCurrentPoint(_res?.data?.data?.cevent);
        setAnimationRefresh(false);
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
    } catch (error) {}
  };

  const _clickCategoryGame = async (value) => {
    setDataGameType(value);
    setDataGameList([]);
    if (value === "FAVORITE" || value === "HOTHIT") {
      const _getData = await axios({
        method: "post",
        url: `${Constant.SERVER_URL}/Game/Brand/List`,
        data: {
          s_agent_code: dataFromLogin?.agent,
          s_username: dataFromLogin?.username,
        },
      });

      if (_getData?.data?.statusCode === 0) {
        if (_getData?.data?.data["FAVORITE"] === "FAVORITE") {
          setCategoryGame(_getData?.data?.data?.FAVORITE);
        } else {
          setDataGameList(_getData?.data?.data?.HOTHIT);
        }
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
          window.open(_res?.data?.url, "_blank");
        });
      }
      if (_res?.data?.res_html) {
        const URL_HTML = `https://m.pgf-thzvvo.com/${value?.s_game_code}/index.html?ot=CD18D515-1F65-65B1-E767-C291050DAB4B&btt=1&ops=${
          _res?.data?.REQ?.extra_args.split("=")[2]
        }&or=18klslau%3Dhyx-lzrnng%3Duge&__hv=1fa0d13d`;
        setTimeout(() => {
          window.open(URL_HTML, "_blank");
        });
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
        f_amount: amountWithdraw,
        i_bank: iBank === "" ? dataFromLogin?.info?.bankList[0]?.id : iBank,
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
        toast.success(t("TheTransactionWasCompletedSuccessfully"));
        _getData();
      } else {
        toast.error(_res?.data?.statusDesc);
      }
    } catch (error) {}
  };
  //  =================> ChangePassword <=================

  const _ChangePassword = async () => {
    try {
      if (NewPassword !== NewPasswordVery) {
        setReMessage(t("NewPasswordAndConfirmNewPasswordDoNotMatch"));
        return;
      }
      const _data = await ChangePassword(NewPassword, oldPassword);
      if (_data?.data.statusCode === 0) {
        toast.success(_data?.data?.statusDesc);
      } else {
        toast.error(_data?.data?.statusDesc + "!");
      }
    } catch (error) {
      console.error("Error playing the game:", error);
    }
  };

  const _copyLinkAffiliate = (link) => {
    navigator.clipboard.writeText(link);
    toast.success(t("SuccessfullyCopiedLink"));
  };

  const _copyAccountNoTrue = (link) => {
    navigator.clipboard.writeText(link);
    toast.success(t("SuccessfullyCopiedLink"));
  };

  const _addCupon = async () => {
    try {
      const _data = await axios.post(`${Constant.SERVER_URL}/Coupon/Receive`, {
        s_agent_code: Constant?.AGEN_CODE,
        s_username: dataFromLogin?.username,
        s_code: codeCupon,
        actionBy: "ADM",
      });
      if (_data?.data?.statusCode === 0) {
        toast.success(_data?.data?.statusDesc);
        handleCloseCupong();
      } else {
        setCupong(true);
        toast.error(_data?.data?.statusDesc);
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
      const _resAppover = await axios.post(`${Constant.SERVER_URL}/Deposit/Promotion/Select`, {
        s_agent_code: Constant?.AGEN_CODE,
        s_username: dataFromLogin?.username,
        s_type: "AUTO",
        s_prm_code: value?.s_code,
        i_ip: "1.2.3.4",
        actionBy: "ADM",
      });
      if (_resAppover?.data?.statusCode === 0) {
        toast.success(t("TheTransactionWasCompletedSuccessfully"));
        setTimeout(() => {
          handleShow();
        }, 2000);
        return;
      }
      toast.error(_resAppover?.data?.statusDesc);
    } catch (error) {
      toast.error(t("UnsuccessfulTransaction"));
    }
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
      if (_res?.data?.statusCode === 0) {
        toast.success(_res?.data?.statusDesc);
        _getData();
      } else {
        toast.error(_res?.data?.statusDesc);
      }
    } catch (error) {}
  };

  const _getOptionBank = () => {
    setDisableArrow(!disableArrow);
  };
  const _getOptionBank2 = (bankName) => {
    setDisableArrow(!disableArrow);
    const newData = JSON.parse(bankName);
    setIBank(newData?.i_bank);
    const color = BackList.filter((data) => data?.bankName === newData?.s_fname_th);
    if (color?.length > 0) {
      setDepositBankList({ ...newData, background: color[0].backgroundColor });
    }
  };

  const _getOptionBankUser = (bankName) => {
    setDisableArrow(!disableArrow);
    const newData = JSON.parse(bankName);
    setIBank(newData?.id);
    const color = BackList.filter((data) => data?.code?.toString() === newData?.i_bank);
    if (color?.length > 0) {
      setUserBankList({ ...newData, background: color[0].backgroundColor, bankName: color[0].bankName });
    }
  };
  const _getOptionBankQR = (bankName) => {
    getQRCode(bankName);
  };
  const _copyAccountNo = (accountNo) => {
    navigator.clipboard.writeText(accountNo);
    toast.success(t("SuccessfullyCopiedLink"));
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
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return;

    const _URL = window.URL || window.webkitURL;
    const url = _URL.createObjectURL(file);
    const imgData = await uploadSlip(url);
    document.getElementById("fileslip").value = "";
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
        toast.error(response?.data?.statusDesc);
      } catch (error) {}
    } else {
    }
  };

  const uploadSlip = async (url) => {
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
        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(img.width * scale);
        canvas.height = Math.floor(img.height * scale);

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
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
    let data = JSON.stringify({
      data: event,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${Constant.SERVER_URL}/Decrypt`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setBankAgentCode(response.data.decrypt);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const _tabAffiliate = (tabAffiliate) => {
    setTabNameAffiliate(tabAffiliate);
    if (tabAffiliate === "overview") {
      _getRegister();
    } else if (tabAffiliate === "income") {
      _getIncome(incomeDateStart, incomeDateEnd);
    } else {
      _getHistory();
    }
  };

  const _getRegister = async (overviewDate) => {
    const _res = await axios({
      method: "post",
      url: `${Constant.SERVER_URL}/Affiliate/Inquiry/Register`,
      data: {
        s_agent_code: Constant?.AGENT_CODE,
        s_username: dataFromLogin?.username,
        d_date: overviewDate,
        page_start: 0,
      },
    });
    if (_res?.data?.statusCode === 0) {
      setDataOverview(_res?.data?.data?.list);
    }
  };

  const _selectYear = (event) => {
    _getRegisterByYear(event);
  };

  const _getRegisterByYear = async (year) => {
    const _res = await axios({
      method: "post",
      url: `${Constant.SERVER_URL}/Affiliate/Inquiry/RegisterByYear`,
      data: {
        s_agent_code: Constant?.AGENT_CODE,
        s_username: dataFromLogin?.username,
        d_date: year,
        page_start: 0,
      },
    });
    if (_res?.data?.statusCode === 0) {
      setDataOverviewYears(_res?.data?.data);
    }
  };

  const _getIncome = async (dateStart, dateEnd) => {
    const _res = await axios({
      method: "post",
      url: `${Constant.SERVER_URL}/Affiliate/Inquiry/Income`,
      data: {
        s_agent_code: Constant?.AGENT_CODE,
        s_username: dataFromLogin?.username,
        d_start: dateStart,
        d_end: dateEnd,
        page_start: 0,
      },
    });
    if (_res?.data?.statusCode === 0) {
      setDataIncome(_res?.data?.data?.list);
    }
  };

  const _getIncomeDateStart = (event) => {
    setIncomeDateStart(event?.target?.value);
    _getIncome(event?.target?.value, incomeDateEnd);
  };

  const _getIncomeDateEnd = (event) => {
    setIncomeDateEnd(event?.target?.value);
    _getIncome(incomeDateStart, event?.target?.value);
  };

  const _getHistory = async () => {
    const _res = await axios({
      method: "post",
      url: `${Constant.SERVER_URL}/Affiliate/History`,
      data: {
        s_agent_code: Constant?.AGENT_CODE,
        s_username: dataFromLogin?.username,
      },
    });
    if (_res?.data?.statusCode === 0) {
      setDataHistoryAffiliate(_res?.data?.data);
    }
  };

  const _getReceiveAffiliate = async (amount) => {
    const _res = await axios({
      method: "post",
      url: `${Constant.SERVER_URL}/Affiliate/Receive`,
      data: {
        s_agent_code: Constant?.AGENT_CODE,
        s_username: dataFromLogin?.username,
        f_amount: amount,
        actionBy: "ADM",
      },
    });
    if (_res?.data?.statusCode === 0) {
      setDataHistoryAffiliate(_res?.data?.data);
      _getData();
      toast.success(_res?.data?.statusDesc);
    } else {
      toast.error(_res?.data?.statusDesc);
    }
  };

  const refreshBalance = (e) => {
    e.stopPropagation();
    setAnimationRefresh(true);
    _getData();
  };

  const _getOverview = (date) => {
    _getRegister(date);
  };

  const returnBankName = (i_bank) => {
    const dataBank = BackList.filter((data) => data?.code?.toString() === i_bank);
    return dataBank[0]?.bankName;
  };

  const _checkLogout = (linkLogout) => {
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <div>
      <div style={{ color: "#FFF" }}>dsfkjskdfjksdjfkjsdkfjksdjf</div>
    </div>
  );
}

import Constant from "../constant";
import { dataCradGame } from "./listCardGame";
import moment from "moment";

var Buffer = require("buffer/").Buffer;

export const _clickTabDeposit = (tab, setTabs, setTabName) => {
  setTabName(tab);
  if (tab === "tab-deposit") {
    setTabs("ประวัติฝาก");
  } else if (tab === "tab-withdraw") {
    setTabs("ประวัติถอน");
  } else {
    setTabs("ประวัติโบนัส");
  }
};

export const FillerCategory = async (value, setCategoryGame) => {
  if (value === "ALL") setCategoryGame(dataCradGame?.ALL);
  if (value === "CASINO") setCategoryGame(dataCradGame?.CASINO);
  if (value === "FAVORITE") setCategoryGame(dataCradGame?.FAVORITE);
  if (value === "FISHING") setCategoryGame(dataCradGame?.FISHING);
  if (value === "HOTHIT") setCategoryGame(dataCradGame?.HOTHIT);
  if (value === "LOTTO") setCategoryGame(dataCradGame?.LOTTO);
  if (value === "SLOT") setCategoryGame(dataCradGame?.SLOT);
  if (value === "SPORT") setCategoryGame(dataCradGame?.SPORT);
};

export const EncriptBase64 = (date) => {
  const tokens = date;
  const token = tokens.split("1a88");
  console.log("token:: ", token)
  let _agentCode = token[0];
  let _username = token[1];
  let _password = token[2];
  // let _bankCode = token[3];
  for (let i = 0; i < 3; i++) {
    _agentCode = Buffer.from(_agentCode, "base64").toString();
    _username = Buffer.from(_username, "base64").toString();
    _password = Buffer.from(_password, "base64").toString();
    // _bankCode = Buffer.from(_bankCode, "base64").toString();
  }
  return {
    // bankCode: _bankCode,
    agentCode: _agentCode,
    username: _username,
    password: _password,
  };
};

export const DataLoginInRout = (data) => {
  const user = data;
  return user || undefined;
};
export const DataLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem(Constant.LOGIN_USER_DATA));
  console.log("useruser::")
  return user || undefined;
};
export const TokenLocalStorage = () => {
  const user = localStorage.getItem(Constant.LOGIN_TOKEN_DATA);
  return user || undefined;
};

export const LogoutClearLocalStorage = () => {
  localStorage.removeItem(Constant.LOGIN_USER_DATA);
  localStorage.clear();
  window.location.reload();
};

export const OpenNewTabWithHTML = (htmlContent) => {
  // Create a new blob with the HTML content
  const blob = new Blob([htmlContent], { type: "text/html" });

  // Create a data URL for the blob
  const dataUrl = URL.createObjectURL(blob);

  // Open a new tab with the data URL
  const newTab = window.open(dataUrl, "_blank");

  // Release the object URL when the tab is closed
  newTab.addEventListener("beforeunload", () => {
    URL.revokeObjectURL(dataUrl);
  });
};

export const CheckLevelCashBack = async (dataUserDataCash) => {
  const _data = dataUserDataCash?.level;
  let _level = "";
  if (_data === 1) _level = dataUserDataCash?.f_level_1;
  if (_data === 2) _level = dataUserDataCash?.f_level_2;
  if (_data === 3) _level = dataUserDataCash?.f_level_3;
  if (_data === 4) _level = dataUserDataCash?.f_level_4;
  if (_data === 5) _level = dataUserDataCash?.f_level_5;
  if (_data === 6) _level = dataUserDataCash?.f_level_6;
  if (_data === 7) _level = dataUserDataCash?.f_level_7;
  if (_data === 8) _level = dataUserDataCash?.f_level_8;
  if (_data === 9) _level = dataUserDataCash?.f_level_9;
  if (_data === 10) _level = dataUserDataCash?.f_level_10;
  return _level;
};

export const formatDateTimeDDMMYYYY = (today) => {
  const todays = moment(today).format("DD/MM/YYYY hh:mm");
  return todays;
};

export const openUrlInNewWindow = (url) => {
  console.log("url: ", url)
  // Attempt to open the URL in a new window/tab
  const newWindow = window.open(url, '_blank');
  console.log("newWindow: ", newWindow)

  // Check if newWindow is not null
  if (newWindow === null) {
    console.log("newWindow: ", newWindow)
    // If newWindow is null, it indicates that the pop-up blocker might be enabled or the operation was blocked
    console.error('Failed to open URL in a new window.');
  }
}





// function encrypt($string) {
//   $output = false;
//   $encrypt_method = "AES-128-CBC";
//   $key = hash('sha256', $this -> secret_key);
//   $suffix = substr(hash('sha256', $this -> secret_suffix), 0, 16);
//   $output = base64_encode(openssl_encrypt($string, $encrypt_method, $key, 0, $suffix));
//   return $output;
// }

import Constant from "../constant";
var Buffer = require('buffer/').Buffer



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

export const FillerCategory = async (value,data,setCategoryGame) => {
  if (value === "ALL") setCategoryGame(data?.info?.brandList?.ALL)
  if (value === "CASINO") setCategoryGame(data?.info?.brandList?.CASINO)
  if (value === "FAVORITE") setCategoryGame(data?.info?.brandList?.FAVORITE)
  if (value === "FISHING") setCategoryGame(data?.info?.brandList?.FISHING)
  if (value === "HOTHIT") setCategoryGame(data?.info?.brandList?.HOTHIT)
  if (value === "LOTTO") setCategoryGame(data?.info?.brandList?.LOTTO)
  if (value === "SLOT") setCategoryGame(data?.info?.brandList?.SLOT)
  if (value === "SPORT") setCategoryGame(data?.info?.brandList?.SPORT)
}


export const EncriptBase64 = (date) => {
  let tokens = date;
  let token = tokens.split('1a88');
  let _agentCode = token[0];
  let _username = token[1];
  let _password = token[2];
  for (let i = 0; i < 3; i++) {
    _agentCode = Buffer.from(_agentCode, 'base64').toString();
    _username = Buffer.from(_username, 'base64').toString();
    _password = Buffer.from(_password, 'base64').toString();
  }
  return {
    agentCode: _agentCode,
    username: _username,
    password: _password,
  }

}

export const DataLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem(Constant.LOGIN_USER_DATA));
  return user || undefined;
};

export const LogoutClearLocalStorage = () => {
  localStorage.removeItem(Constant.LOGIN_USER_DATA);
  localStorage.clear();
  window.location.reload();
};

export const OpenNewTabWithHTML=(htmlContent)=> {
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
}

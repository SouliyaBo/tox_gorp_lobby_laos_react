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
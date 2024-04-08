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

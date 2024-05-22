import CryptoJS from 'crypto-js';

const decrypt = (string, secretKey, secretSuffix) => {
    const encryptMethod = 'AES-128-CBC';

    // Create key and IV from secretKey and secretSuffix
    const key = CryptoJS.enc.Hex.parse(CryptoJS.SHA256(secretKey).toString(CryptoJS.enc.Hex));
    const iv = CryptoJS.enc.Hex.parse(CryptoJS.SHA256(secretSuffix).toString(CryptoJS.enc.Hex).substring(0, 32));

    // Decode base64 string
    const decodedString = CryptoJS.enc.Base64.parse(string);

    // Decrypt
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: decodedString }, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    // Convert decrypted data to UTF-8 string
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    return decryptedText;
};



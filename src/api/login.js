import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import Constant from "../constant";
import { EncriptBase64 } from "../helper";
import { DataLocalStorage, TokenLocalStorage } from "../helper";

const LoginController = () => {
	const history = useHistory();

	// ==================> handleLogin <=================
	const handleLogin = async (username, password, isMobile, setLoading) => {
		console.log("isMobile: ", isMobile)
		try {
			const { data } = await axios.post(`${Constant.SERVER_URL}/Authen/Login`, {
				agentCode: Constant.AGEN_CODE,
				username,
				password,
				ip: "1.2.3.4",
			});
			if (data.statusCode === 0) {
				localStorage.setItem(Constant.LOGIN_TOKEN_DATA, data.data.token);
				localStorage.setItem(
					Constant.LOGIN_USER_DATA,
					JSON.stringify({
						agent: data?.data?.agent,
						username: data?.data?.username,
						balance: data?.data?.balance,
						// info: {
						//     bankDeposit: data?.data?.info?.bankDeposit,
						//     bankList: data?.data?.info?.bankList,
						//     brandList: data?.data?.info?.brandList,
						//     cashback: data?.data?.info?.cashback,
						//     profile: data?.data?.info?.profile,
						//     promotionList: data?.data?.info?.promotionList,
						//     slide: data?.data?.info?.slide,
						//     shorturl: data?.data?.info?.shorturl,
						// }
					}),
				);
				if (isMobile === "MOBILE") {
					setLoading(false);
					history.push(Constant.AFTER_LOGIN_MOBILE, data?.data);
				} else {
					setLoading(false);
					history.push(Constant.AFTER_LOGIN, data?.data);
				}
			} else {
				setLoading(true);
			}
			return data;
		} catch (error) {
			setLoading(true);
			console.log("🚀 ~ handleLogin ~ error:", error);
		}
	};
	const loginPlayNow = async (username, password) => {
		console.log("first: ", username)
		console.log("second: ", password)
		try {
			let _res = await axios({
				method: 'post',
				url: `${Constant.SERVER_URL}/Authen/Login`,
				data: {
					"agentCode": Constant?.AGENT_CODE,
					"username": username,
					"password": password,
					"ip": "1.2.3.4"
				},
			});
			console.log("_res?.data.statusCode::: ", _res?.data)
			if (_res?.data.statusCode === 0) {
				history.push(Constant.AFTER_LOGIN, _res?.data?.data);
			}
		} catch (error) {
			console.log("🚀 ~ const_login= ~ error:", error)
		}
	}
	// ==================> handleRegister <=================
	const handleRegister = async (
		inputFirstname,
		inputLastname,
		inputPhonenumber,
		inputPassword,
		inputBank,
		ref,
		isMobile,
		setLoading
	) => {
		try {
			const _date = {
				s_agent_code: Constant.AGEN_CODE,
				s_phone: inputPhonenumber,
				s_password: inputPassword,
				i_bank: "1", //scb =1
				s_account_no: inputBank,
				s_channel: "GOOGLE",
				s_line: "line@",
				type_shorturl: true,
				s_ref: ref,
				s_channel_name: Constant.AGEN_CODE,
				i_channel: "134",
			};
			const _resOne = await axios({
				method: "post",
				url: `${Constant.SERVER_URL}/Member/Register/Verify`,
				data: _date,
			});
			console.log("_date:: ", _date)
			console.log("req:: ", _resOne?.data);
			if (_resOne?.data?.statusCode === 0) {
				const _resTwo = await axios({
					method: "post",
					url: `${Constant.SERVER_URL}/Member/Register/Confirm`,
					data: {
						..._resOne?.data?.data,
						s_firstname: inputFirstname,
						s_lastname: inputLastname,
						s_fullname: `${inputFirstname} ${inputLastname}`,
						s_channel_name: Constant.AGEN_CODE,
						i_channel: "134",
					},
				});
				console.log("🚀 ~ CreateUser ~ _resTwo:", _resTwo?.data);
				if (_resTwo?.data.statusCode === 0) {
					const _resThree = await axios({
						method: "post",
						url: `${Constant.SERVER_URL}/Member/Balance`,
						data: {
							s_agent_code: Constant.AGEN_CODE,
							s_username: _resTwo?.data?.data?.s_username,
						},
					});
					if (_resThree?.data.statusCode === 0) {
						localStorage.setItem(
							Constant.LOGIN_TOKEN_DATA,
							_resTwo?.data?.data?.token,
						);
						localStorage.setItem(
							Constant.LOGIN_USER_DATA,
							JSON.stringify(_resTwo?.data?.data),
						);
						if (isMobile === "MOBILE") {
							setLoading(false);
							_loginAfterRegister(
								_resTwo?.data?.data?.s_username,
								_resTwo?.data?.data?.s_password,
								isMobile

							);
						} else {
							setLoading(false);
							_loginAfterRegister(
								_resTwo?.data?.data?.s_username,
								_resTwo?.data?.data?.s_password,
								isMobile
							);
						}
					}
				}
			} else {
				return _resOne?.data;
			}
		} catch (error) {
			setLoading(false);
			console.log("🚀 ~ handleRegister ~ error:", error);
		}
	};

	const _loginAfterRegister = async (username, password, isMobile) => {
		try {
			const _res = await axios({
				method: "post",
				url: `${Constant.SERVER_URL}/Authen/Login`,
				data: {
					agentCode: Constant.AGEN_CODE,
					username: username,
					password: password,
					ip: "1.2.3.4"
				}
			});
			if (_res?.data?.statusCode === 0) {
				localStorage.setItem(Constant.LOGIN_TOKEN_DATA, _res.data.token);
				localStorage.setItem(
					Constant.LOGIN_USER_DATA,
					JSON.stringify({
						agent: _res?.data?.agent,
						username: _res?.data?.username,
						balance: _res?.data?.balance,
						info: {
							bankDeposit: _res?.data?.info?.bankDeposit,
							bankList: _res?.data?.info?.bankList,
							brandList: _res?.data?.info?.brandList,
							cashback: _res?.data?.info?.cashback,
							profile: _res?.data?.info?.profile,
							promotionList: _res?.data?.info?.promotionList,
							slide: _res?.data?.info?.slide,
							shorturl: _res?.data?.info?.shorturl,
						},
					}),
				);
				if (isMobile === "MOBILE") {
					console.log("mobile: ", _res?.data)
					history.push(Constant.AFTER_LOGIN_MOBILE, _res?.data?.data);
				} else {
					console.log("computer: ", _res?.data?.data)
					history.push(Constant.AFTER_LOGIN, _res?.data?.data);
				}
				return null;
			}
			return _res;
		} catch (error) {
			console.log("🚀 ~ const_login= ~ error:", error);
		}
	};

	// ==================> ChangePassword <=================
	const ChangePassword = async (newPassword, firstPassword) => {
		const _dataTokenLocal = await TokenLocalStorage();
		const _dataLocal = await DataLocalStorage();
		const _res = await axios({
			method: "post",
			url: `${Constant.SERVER_URL}/Authen/ResetPassword`,
			data: {
				token: _dataTokenLocal,
				agentCode: Constant.AGEN_CODE,
				username: _dataLocal?.username,
				password: newPassword,
				password_original: firstPassword,
				actionBy: "Member",
			},
		});

		console.log("🚀 ~ ChangePassword ~ _res?.data:", _res?.data);
		if (_res?.data) {
			return _res;
		}
	};
	// ==================> handleRegister <=================
	const loginWithToken = async (token, isMobile) => {
		try {
			const _resDecrypt = EncriptBase64(token);
			if (
				!_resDecrypt?.agentCode &&
				!_resDecrypt?.username &&
				!_resDecrypt?.password
			) {
				return;
			}
			const _res = await axios({
				method: "post",
				url: `${Constant.SERVER_URL}/Authen/Login`,
				data: {
					agentCode: Constant.AGEN_CODE,
					username: _resDecrypt?.username,
					password: _resDecrypt?.password,
					ip: "1.2.3.4",
				},
			});
			if (_res?.data.statusCode === 0) {
				console.log("🚀 ~ loginWithToken ~ _res?.data:", _res?.data);
				localStorage.setItem(Constant.LOGIN_TOKEN_DATA, _res.data.token);
				localStorage.setItem(
					Constant.LOGIN_USER_DATA,
					JSON.stringify({
						agent: _res?.data?.agent,
						username: _res?.data?.username,
						balance: _res?.data?.balance,
					}),
				);
				if (isMobile === "MOBILE") {
					history.push(Constant.AFTER_LOGIN_MOBILE, _res?.data?.data);
				} else {
					history.push(Constant.AFTER_LOGIN, _res?.data?.data);
				}
				// history.push(Constant.AFTER_LOGIN,_res?.data);
			}
		} catch (error) {
			console.log("🚀 ~ const_login= ~ error:", error);
		}
	};
	return {
		handleLogin,
		handleRegister,
		loginWithToken,
		ChangePassword,
		loginPlayNow
	};
};
export default LoginController;

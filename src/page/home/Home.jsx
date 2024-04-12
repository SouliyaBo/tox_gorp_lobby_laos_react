/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useCallback } from "react";
import _LoginController from "../../api/login";

import constant from "../../constant";
import { useHistory, useParams } from "react-router-dom";
import queryString from "query-string";
import Sidebar from "../../component/Sidebar";
import { _clickTabDeposit, } from "../../helper"
import { BackList } from "../../constant/bankList";
import { dataCradGame } from "../../helper/listCardGame"
export default function Home() {

	const history = useHistory();
	const UseParams = useParams();
	const parsed = queryString.parse(history?.location?.search);
	const [current, setCurrent] = useState(0);
	const [bankCode, setBankCode] = useState(0);

	const { handleLogin, handleRegister, loginWithToken } = _LoginController();

	const [sidebarVisible, setSidebarVisible] = useState(false);
	const [sidebarAnimation, setSidebarAnimation] = useState(true);
	const [gotoStepTwo, setGotoStepTwo] = useState(false);
	const sidebarUseRef = useRef(null);
	const [tabs, setTabs] = useState("ประวัติฝาก");
	const [tabName, setTabName] = useState("tab-deposit");
	const [userNameInput, setUserNameInput] = useState();
	const [passwordInput, setPasswordInput] = useState();
	const [messageCreate, setMessageCreate] = useState();
	const [dataGameList, setDataGameList] = useState(dataCradGame?.SLOT)
	console.log("dataGameList: ", dataGameList)
	const [warningPhone, setWarningPhone] = useState("")
	const [warningPassword, setWarningPassword] = useState("")
	const [warningFirstName, setWarningFirstName] = useState("")
	const [warningLastName, setWarningLastName] = useState("")

	// ========> register by code friend <=======

	// ========> loginWithToken <=======
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (UseParams?.token) {
			loginWithToken(UseParams?.token)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [UseParams]);


	const handleClick = () => {
		window.location.reload();
	};

	const closeSidebar = () => {
		setSidebarAnimation(false);
		setTimeout(() => {
			setSidebarVisible(false);
		}, 500);
	};

	const handleLoginClick = () => {
		const loginModal = document.querySelector(".login-modal");
		if (loginModal !== null) {
			setTimeout(() => {
				loginModal.setAttribute("style", "display: flex;");
				loginModal.childNodes[1].setAttribute(
					"style",
					"animation: scaleUp 0.5s ease-in-out;",
				);
			}, 400);
		}
	};

	const handleCloseLoginClick = () => {
		const loginModal = document.querySelector(".login-modal");
		if (loginModal !== null) {
			setTimeout(() => {
				loginModal.setAttribute("style", "display: none;");
				loginModal.childNodes[1].setAttribute(
					"style",
					"animation: scaleDown 0.5s ease-in-out;",
				);
			}, 400);
		}
	};
	const _gotoSet1 = () => {
		setGotoStepTwo(false);
	};
	const _gotoSet2 = () => {
		if (inputPhonenumber === "") {
			setWarningPhone("กรุณากรอกเบอร์โทร");
			console.log("กรุณากรอกเบอร์โทร")
		} else if (inputPassword === "") {
			setWarningPassword("กรุณาป้อนรหัสผ่าน");
			console.log("กรุณาป้อนรหัสผ่าน")
		} else if (inputFirstname === "") {
			setWarningFirstName("กรุณาป้อนชื่อ")
			console.log("กรุณาป้อนชื่อ")
		} else if (inputLastname === "") {
			setWarningLastName("กรุณาป้อนนามสกุล")
			console.log("กรุณาป้อนนามสกุล")
		} else {
			setGotoStepTwo(!false);
		}
	};

	// ===== LoginController =====>
	const _Login = async () => {
		const _res = await handleLogin(userNameInput, passwordInput, "PC");
		if (_res) setMessageCreate(_res?.statusDesc);
	};
	// ===== CreateUser =====>
	const [inputPhonenumber, setInputPhonenumber] = useState("");
	const [inputPassword, setInputPassword] = useState("");
	const [inputFirstname, setInputFirstname] = useState("");
	const [inputLastname, setInputLastname] = useState("");
	const [inputBank, setInputBank] = useState();

	const CreateUser = async () => {
		const _res = await handleRegister(
			inputFirstname,
			inputLastname,
			inputPhonenumber,
			inputPassword,
			inputBank,
			bankCode,
			parsed?.ref,
		);
		if (_res) setMessageCreate(_res?.statusDesc);
	};

	const SliderData = [
		{
			image:
				'/assets/images/Cardgame/image 70.png'
		},
		{
			image:
				'/assets/images/Cardgame/5.png'
		},
		{
			image:
				'/assets/images/Cardgame/6.png'
		},
		{
			image:
				'/assets/images/Cardgame/7.png'
		},
		{
			image:
				'/assets/images/Cardgame/3.png'
		}
	];

	const length = SliderData.length;

	const nextSlide = () => {
		setCurrent(current === length - 1 ? 0 : current + 1);
	};

	const prevSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1);
	};
	if (!Array.isArray(SliderData) || SliderData.length <= 0) {
		return null;
	}

	const _clickCategoryGame = (value) => {
		if (value === "SLOT") {
			setDataGameList(dataCradGame?.SLOT);
		} else if (value === "CASINO") {
			setDataGameList(dataCradGame?.CASINO);
		} else if (value === "SPORT") {
			setDataGameList(dataCradGame?.SPORT);
		} else if (value === "FISHING") {
			setDataGameList(dataCradGame?.FISHING);
		} else { }
	}

	const handleChange = useCallback((event) => {
		const re = /^[0-9\b]+$/;
		if (event.target.value === '' || re.test(event.target.value)) {
			setInputPhonenumber(event.target.value)
		}
	});

	const handleChangeBank = useCallback((event) => {
		const re = /^[0-9\b]+$/;
		if (event.target.value === "" || re.test(event.target.value)) {
			setInputBank(event?.target?.value);
		}
	});
	return (
		<div>
			<header className="header">
				<div className="left">
					<img
						src="/assets/images/icon-hamburger.svg"
						alt="hamburger"
						className="hamburger"
						height="37px"
						width="35px"
						// onClick={(event) => toggleSidebar(event)}
						onKeyDown={() => ""}
					/>
					<img
						src="/assets/images/newicon/TTcc-01.png"
						alt="logo"
						height="49px"
						style={{ cursor: "pointer" }}
						onClick={() => handleClick()}
						onKeyDown={() => ""}
					/>
				</div>
				<div className="right">
					<button
						type="button"
						className="desktop-button button"
						id="singup-btn"
						data-bs-toggle="modal"
						data-bs-target="#signUpModal"
					>
						<p className="register">สมัครสมาชิก</p>
					</button>

					<button
						type="button"
						className="font-20 desktop-button button1"
						id="loginBtn"
						onClick={handleLoginClick}
					>
						เข้าสู่ระบบ
					</button>

					<a
						href={constant?.PAGE_REGISTER_STEP1}
						style={{ textDecoration: "none" }}
					>
						<button
							type="button"
							className="font-20 mobile-button button"
							id="registerBtn-mobile"
						>
							<p className="register">สมัครสมาชิก</p>
						</button>
					</a>
					<a
						href={constant?.PAGE_LOGIN_MOBILE}
						style={{ textDecoration: "none" }}
					>
						<button
							type="button"
							className="font-20 mobile-button button1"
							id="loginBtn-mobile"
						>
							เข้าสู่ระบบ
						</button>
					</a>
					<img
						src="/assets/images/logo-thai.svg"
						className="logo-thai"
						alt="logo thai"
					/>
				</div>
			</header>

			<main className="home">
				<div className="brand">
					<div className="slideshow-container">
						<div className="mySlides fade-slide">
							<div className='left-arrow' onClick={() => prevSlide()} onKeyDown={() => ''}>❮</div>
							<div className='right-arrow' onClick={() => nextSlide()} onKeyDown={() => ''}>❯</div>
							{SliderData.length > 0 && SliderData?.map((slide, index) => {
								return (
									<div
										className={index === current ? 'slide1 active' : 'slide1'}
										key={slide?.image}
									>
										{index === current && (
											<img src={slide.image} alt='travel' style={{ width: '100%' }} />
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>

				<div className="marquee-custome" id="mobile">
					{/* biome-ignore lint/a11y/noDistractingElements: <explanation> */}
					<marquee style={{ marginTop: 12 }} className="description">
						เว็บตรง ไม่ผ่านเอเย่นต์ อันดับ 1 ฝาก-ถอน ไม่มีขั้นต่ำ ถอนสูงสุดวันละ 100 ล้าน สล็อต
						บาคาร่า หวย กีฬา มีครบจบที่เดียว
					</marquee>
				</div>
				<div className="featured-game-wrapper" id="mobile">

					<div className="featured-game flexBetween" onClick={() => _clickCategoryGame('SLOT')} onKeyDown={() => ''}>
						<img src="/assets/images/newicon/iconnew-01.png" alt="game icon" />
						<p>สล็อต</p>
					</div>
					<div className="featured-game flexBetween" onClick={() => _clickCategoryGame('CASINO')} onKeyDown={() => ''}>
						<img src="/assets/images/newicon/iconnew-02.png" alt="game icon" />
						<p>คาสิโน</p>
					</div>
					<div className="featured-game flexBetween" onClick={() => _clickCategoryGame('FISHING')} onKeyDown={() => ''}>
						<img src="/assets/images/newicon/iconnew-03.png" alt="game icon" />
						<p>ยิงปลา</p>
					</div>
					<div className="featured-game flexBetween" onClick={() => _clickCategoryGame('SPORT')} onKeyDown={() => ''}>
						<img src="/assets/images/newicon/iconnew-05.png" alt="game icon" />
						<p>กีฬา</p>
					</div>

				</div>
				<section className="featured-game-wrapper" id="desktop">
					<div className="container flexBetween">
						<div className="featured-game flexBetween" onClick={() => _clickCategoryGame('SLOT')} onKeyDown={() => ''}>
							<img
								src="/assets/images/newicon/iconnew-01.png"
								alt="game icon"
							/>
							<p>สล็อต</p>
						</div>
						<div className="featured-game flexBetween" onClick={() => _clickCategoryGame('CASINO')} onKeyDown={() => ''}>
							<img
								src="/assets/images/newicon/iconnew-02.png"
								alt="game icon"
							/>
							<p>คาสิโน</p>
						</div>
						<div className="featured-game flexBetween" onClick={() => _clickCategoryGame('FISHING')} onKeyDown={() => ''}>
							<img
								src="/assets/images/newicon/iconnew-03.png"
								alt="game icon"
							/>
							<p>ยิงปลา</p>
						</div>
						<div className="featured-game flexBetween" onClick={() => _clickCategoryGame('SPORT')} onKeyDown={() => ''}>
							<img
								src="/assets/images/newicon/iconnew-05.png"
								alt="game icon"
							/>
							<p>กีฬา</p>
						</div>
					</div>
				</section>

				<section className="card-container">
					<div className="card-wrapper" onClick={handleLoginClick} onKeyDown={() => ''}>
						{dataGameList.length > 0 && dataGameList?.map((item) => (
							<div key={item?.s_status} className="game-card">
								{item?.s_lobby_url !== undefined ? (
									<img src={item?.s_lobby_url} alt="card" />
								) : (
									<img src={item?.s_img} alt="card" />
								)}
							</div>
						))}
					</div>
				</section>

				<section className="mobile-suggest-game-container-landing-page">
					<a href={constant?.PAGE_REGISTER_STEP1}>
						<div className="top">
							{dataGameList.length > 0 && dataGameList?.map((item, index) => (
								<div key={item?.s_status} className="card">
									{item?.s_lobby_url !== undefined ? (
										<img src={item?.s_lobby_url} alt="card" className="img-lobby" />
									) : (
										<img src={item?.s_img} alt="card" className="img-link" />
									)}
								</div>
							))}
						</div>
					</a>

				</section>
				<section className="info-wrapper" id="desktop">
					<p>Shun808</p>
					<p style={{ marginBottom: 10 }}>
						สล็อตเว็บตรง ของ Shun808 เว็บพนันออนไลน์ เว็บตรง เป็น เว็บตรงสล็อต
						ที่มีบริการ เกมสล็อต มากมายกว่า 800 เกม ให้คุณได้เลือกเล่นอย่าง จุใจ กับ ค่าย
						สล็อตเว็บตรงชั้นนำ อย่าง pgslot joker และ jili มาพร้อม กับ สูตรสล็อต ที่พาให้
						ผู้เล่น พิชิตสล็อตเว็บตรง ทำกำไร พิชิตโบนัส และ แจ็คพอต อีกมากมายกับ สูตรสล็อต
						ทุกค่าย สมัครง่าย เปิดยูสไม่มีขั้นต่ำ พร้อมให้บริการค่ายของสล็อตเว็บตรง เล่นง่ายๆ เบท
						วิน กันง่าย พร้อมแจกอัตราการแตก ของ สล็อตออนไลน์ ทุกวัน
					</p>
					<p>Shun808 มีอะไรดีที่เพื่อนๆ ต้องไม่พลาดสมัครสมาชิก</p>
					<ol>
						<li>
							Shun808 สล็อตเว็บตรงมาแรงในตอนนี้ ด้วยการเดินพันขั้นต่ำเพียงแค่ 0.5 บาท
							เว็บสล็อต ที่ดีที่สุด สมัครเล่น สล็อตเว็บตรง ผ่าน ระบบอัตโมมัติ ฝาก-ถอน ภายใน 1
							นาที พร้อมสิทธิประโยชน์เรื่องผลตอบแทน เกมสล็อต ออนไลน์ ของเว็บเรา
							เข้าเล่นเกมสล็อต ยิ่งเล่นเยอะ ยิ่งมีสิทธิ์ได้รับรางวัลโบนัสจากเกมเยอะเช่นกัน เกมสล็อต
							ออนไลน์ ได้เงินจริง slot online จัดได้ว่าเป็นเกมที่เล่นง่าย
						</li>
						<li>
							แจ็คพอตออกบ่อย มีทั้งแจ็คพอตรางวัลเล็ก สลับกันกับแจ็คพ็อตรางวัลใหญ่
							สามารถทำเงินได้เรื่อยๆ ยาวๆ แจ็คพอต ออกตลอดทั้งวัน เปิดยูสวันนี้ เติมเงินครั้งแรก
							200.- รับไปเลย สูตรสล็อต โครตแม่น สแกนได้ทุกค่ายสล็อตเว็บตรง ทุกค่าย
							ไม่ว่าจะเป็น สูตรสล็อต pg หรือ สูตรสล็อต Joker โจ๊กเกอร์123 เรามีหมด
						</li>
						<li>
							เกมที่หลากหลาย มากกว่า 1000 เกม :
							เราภูมิใจในการมอบให้บริการช่วงเกมที่หลากหลายเพื่อตอบสนองความต้องการของนักพนันทุกคน
							ตั้งแต่เกมคาสิโนคลาสสิกเช่นแบล็คแจ็คและรูเล็ตไปจนถึงเครื่องสล็อตยอดนิยม
							คุณจะไม่มีทางจบลงในการสำรวจ
						</li>
						<li>
							ปลอดภัยและเชื่อถือได้ 100% : ความปลอดภัยของคุณเป็นสิ่งสำคัญที่สุดของเรา TT
							Casino Club
							ใช้มาตรการรักษาความปลอดภัยขั้นสูงเพื่อปกป้องข้อมูลส่วนตัวและการเงินของคุณ
							คุณสามารถเล่นพนันได้อย่างมั่นใจในความสงบใจที่ข้อมูลของคุณถูกเข้ารหัสและเก็บไว้เป็นความลับ
						</li>
					</ol>
					<p>
						Shun808 หนึ่งในผู้ให้บริการพนันออนไลน์ที่ดีที่สุด เป็นผู้ที่ให้บริการผ่านทางเว็บตรง
						ไม่ผ่านเอเย่นต์ ให้บริการด้วยระบบความปลอดภัยที่สูง และเชื่อถือได้
						ซึ่งปัจจุบันเรามีทีมงานคุณภาพระดับมืออาชีพที่ให้บริการดูแลนักเดิมพันเป็นอย่างดี
						และเว็บแทงบอลออนไลน์ของเรา การันตีความมั่นคงด้านทางการเงิน และบริการต่างๆ
						ได้อย่างมีคุณภาพ
						ทำให้สามารถตอบโจทย์สำหรับคนรุ่นใหม่ทุกคนได้เป็นอย่างดีและมีการให้บริการในรูปแบบใหม่ที่ดีกว่าเดิม
						คาสิโน บาคาร่า สล็อตออนไลน์ ซึ่งทางเราได้เปิดให้บริการในรูปแบบของคาสิโนสด
						คุณจะได้สัมผัสบรรยากาศเสมือนอยู่ในสนามการเดิมพันจริง
						และคุณสามารถเข้าใช้งานผ่านอุปกรณ์ที่เชื่อมต่อกับอินเทอร์เน็ต เช่น คอมพิวเตอร์ โน๊ตบุ๊ค
						มือถือ และอื่นๆ อีกเพียบ สามารถเล่นได้ทุกที่ ทุกเวลา
						ไม่ต้องเสียเวลาเดินทางไปด้วยตัวเองอีกต่อไป
						และทางเว็บพนันออนไลน์ของเราก็เปิดให้บริการตลอด 24 ชั่วโมง
					</p>
				</section>

				<section className="hero-text flexCenter">
					<h4>Casino คาสิโนออนไลน์ ที่ดีที่สุด</h4>
					<p>เพื่อประสบการณ์ที่ดีทของผู้เล่นอย่างแท้จริง</p>
				</section>

				<h3
					style={{ margin: "20px auto", textAlign: "center", color: "white" }}
				>
					PARTNERSHIPS
				</h3>

				<div className="partnership-container">
					<div>
						<img alt="partnership" src="/assets/images/logo3-2-3 1 (1).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/jili 1.png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/slotxo 1.png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/funkygame 1.png" />
					</div>

					<div>
						<img alt="partnership" src="/assets/images/booongo 1.png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/evoplay 1.png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle.png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (1).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (2).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (3).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (4).png" />
					</div>
					<div />
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (6).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (7).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (8).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (9).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (11).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (12).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (13).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (14).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (15).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (16).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (17).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (18).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (19).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (20).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (21).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (22).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (23).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (24).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (25).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (26).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (27).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (28).png" />
					</div>
					<div>
						<img alt="partnership" src="/assets/images/Rectangle (29).png" />
					</div>
				</div>

				<h3
					style={{ margin: "20px auto", textAlign: "center", color: "white" }}
				>
					PAYMENT ACCEPTED
				</h3>
				<div className="container">
					<div className="carousel-view">
						<button
							type="button"
							id="prev-btn"
							className="prev-btn"
							style={{ display: "none" }}
						>
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg viewBox="0 0 512 512" width="20" title="chevron-circle-left">
								<path d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z" />
							</svg>
						</button>
						<div id="item-list" className="item-list">

							<img
								id="item"
								className="item"
								src="/assets/icons/icon-bank-active/scb2.png"
								alt=""
							/>
							<img
								id="item"
								className="item"
								src="/assets/icons/icon-bank-active/ktb3.png"
								alt=""
							/>
							<img
								id="item"
								className="item"
								src="/assets/icons/icon-bank-active/bbl4.png"
								alt=""
							/>
							<img
								id="item"
								className="item"
								src="/assets/icons/icon-bank-active/bay5.png"
								alt=""
							/>
							<img
								id="item"
								className="item"
								src="/assets/icons/icon-bank-active/tmb6.png"
								alt=""
							/>
							<img
								id="item"
								className="item"
								src="/assets/icons/icon-bank-active/gsb8.png"
								alt=""
							/>
							<img
								id="item"
								className="item"
								src="/assets/icons/icon-bank-active/uob10.png"
								alt=""
							/>
							<img
								id="item"
								className="item"
								src="/assets/icons/icon-bank-active/kk11.png"
								alt=""
							/>
							<img
								id="item"
								className="item"
								src="/assets/icons/icon-bank-active/lh12.png"
								alt=""
							/>
							<img
								id="item"
								className="item"
								src="/assets/icons/icon-bank-active/ibank13.png"
								alt=""
							/>
							<img
								id="item"
								className="item"
								src="/assets/icons/icon-bank-active/tisco14.png"
								alt=""
							/>
							<img
								id="item"
								className="item"
								src="/assets/icons/icon-bank-active/ghb16.png"
								alt=""
							/>
							<img
								id="item"
								className="item"
								src="/assets/icons/icon-bank-active/cimb17.png"
								alt=""
							/>
							<img
								id="item"
								className="item"
								src="/assets/icons/icon-bank-active/baac18.png"
								alt=""
							/>
							<img
								id="item"
								className="item"
								src="/assets/icons/icon-bank-active/icbc19.png"
								alt=""
							/>

						</div>
						<button
							type="button"
							id="next-btn"
							className="next-btn"
							style={{ display: "none" }}
						>
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								viewBox="0 0 512 512"
								width="20"
								title="chevron-circle-right"
							>
								<path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z" />
							</svg>
						</button>
					</div>
				</div>

				<div id="term-condition" className="flexCenter">
					<p>Term & Condition</p>
					<p>Copyright 2024 Casino Alrights Reserved.</p>
				</div>

				{/* <!-- Side Bar --> */}
				{/* {sidebarVisible && ( */}
				{sidebarVisible ? (
					<Sidebar sidebarUseRef={sidebarUseRef} sidebarAnimation={sidebarAnimation} closeSidebar={closeSidebar} setSidebarAnimation={setSidebarAnimation} setSidebarVisible={setSidebarVisible} sidebarVisible={sidebarVisible} />
				) : null}
				{/* )} */}
				{/* <!-- Login Modal --> */}
				<div className="login-modal flexCenter">
					<div className="login-modal-wrapper flexCenter" id="login-modal">
						<img
							src="/assets/icons/x-close.svg"
							alt="close-icon"
							className="close-btn"
							id="login-modal-close-btn"
							onClick={() => handleCloseLoginClick()}
							onKeyDown={() => ""}
						/>
						<img src="/assets/images/newicon/TTcc-01.png" alt="logo" />
						<h3>เข้าสู่ระบบ</h3>
						<div className="phone-input">
							<img src="/assets/icons/phone.svg" alt="icon" />
							<label for="phone" />
							<input
								type="number"
								id="phone"
								name="phone"
								maxLength={10}
								placeholder="เบอร์โทรศัพท์"
								onChange={(e) => setUserNameInput(e?.target?.value)}
							/>
						</div>
						<div className="phone-input" style={{ marginTop: 20 }}>
							<img src="/assets/icons/lock-alt.svg" alt="lock icon" />
							<label for="phone" />
							<input
								name="password"
								id="password"
								type="password"
								placeholder="กรอกรหัสผ่าน"
								onChange={(e) => setPasswordInput(e?.target?.value)}
							/>
						</div>
						<div style={{ padding: 10, color: "red" }}>{messageCreate}</div>
						<div className="button-container">
							<button type="button" id="login-btn" onClick={() => _Login()}>
								เข้าสู่ระบบ
							</button>
							<button
								type="button"
								onClick={() => handleCloseLoginClick()}
								id="signUp-btn"
								data-bs-toggle="modal"
								data-bs-target="#signUpModal"
							>
								สมัครสมาชิก
							</button>
						</div>
						<div className="problem">พบปัญหาติดต่อเรา</div>
					</div>
					<div className="background" id="login-modal-background" />
				</div>

				<div
					className="modal fad"
					aria-hidden="true"
					id="signUpModal"
					tabIndex="-1"
					aria-labelledby="signUpModalLabel"
				>
					<div className="modal-dialog">
						<div className="modal-border">
							<div className="modal-content">
								<div className="signup-background" />
								<div className="signup-modal-content">
									<img
										src="/assets/icons/x-close.svg"
										alt="close-icon"
										className="close-btn"
										id="login-modal-close-btn"
										data-bs-dismiss="modal"
										aria-label="Close"
									/>
									<div className="signup-modal-body">
										<img
											src="/assets/images/newicon/TTcc-01.png"
											className="logo"
											alt="logo"
										/>
										<div className="step-container">
											<div
												style={{ cursor: "pointer" }}
												className={`step-item${gotoStepTwo === false ? " active" : ""
													}`}
												onClick={() => _gotoSet1()}
												onKeyDown={() => ""}
												id="step-item1"
											>
												<span className="step-item-box">1</span>
												<span className="step-item-text">กรอกเบอร์</span>
											</div>
											<span className="step-line" />
											<div
												className={`step-item${gotoStepTwo === true ? " active" : ""
													}`}
												id="step-item2"
											>
												<span className="step-item-box">2</span>
												<span className="step-item-text">บัญชีธนาคาร</span>
											</div>
										</div>

										{/* <!-- step one --> */}
										<div
											className="step-one"
											style={{
												display: gotoStepTwo === true ? "none" : "block",
											}}
											id="form-step-one"
										>
											<div style={{ textAlign: "center" }}>
												<h3 className="signup-header">สมัครสมาชิก</h3>
											</div>
											<div className="phone-input">
												<img src="/assets/icons/phone.svg" alt="icon" />
												<label for="phone" />
												<input
													type="text"
													id="phone"
													maxLength={10}
													name="phone"
													value={inputPhonenumber}
													placeholder="เบอร์โทรศัพท์"
													onChange={(event) => { handleChange(event) }}
												/>

											</div>
											<span style={{ color: "red" }}>{inputPhonenumber !== "" ? "" : warningPhone}</span>
											<div className="phone-input">
												<img src="/assets/icons/lock-alt.svg" alt="icon" />
												<label for="phone" />
												<input
													type="password"
													id="text"
													name="password"
													placeholder="รหัสผ่าน"
													onChange={(e) => setInputPassword(e?.target?.value)}
												/>
											</div>
											<span style={{ color: "red" }}>{inputPassword !== "" ? "" : warningPassword}</span>
											<div className="phone-input">
												<img src="/assets/icons/icons8-user-24.png" alt="icon" />
												<label for="phone" />
												<input
													type="text"
													id="s_firstname"
													name="s_firstname"
													placeholder="ซื่อ"
													onChange={(e) => setInputFirstname(e?.target?.value)}
												/>
											</div>
											<span style={{ color: "red" }}>{inputFirstname !== "" ? "" : warningFirstName}</span>
											<div className="phone-input">
												<img src="/assets/icons/icons8-user-24.png" alt="icon" />
												<label for="phone" />
												<input
													type="text"
													id="s_lastname"
													name="s_lastname"
													placeholder="นามสกุล"
													onChange={(e) => setInputLastname(e?.target?.value)}
												/>
											</div>
											<span style={{ color: "red" }}>{inputLastname !== "" ? "" : warningLastName}</span>
											<button
												type="button"
												onClick={() => _gotoSet2()}
												onKeyDown={() => ""}
												id="goto-step2"
											>
												ถัดไป
											</button>
											<div style={{ textAlign: "center" }}>
												<div className="already-have-account">
													คุณมีบัญชีอยู่แล้ว
													<span className="go-to-login"
														data-bs-dismiss="modal"
														onClick={handleLoginClick} onKeyDown={() => ''}>เข้าสู่ระบบ</span>
												</div>
											</div>
										</div>
										{/* <!-- end step one --> */}

										{/* <!-- step two --> */}
										<div
											className="step-two"
											style={{
												display: gotoStepTwo === false ? "none" : "block",
											}}
											id="form-step-two"
										>
											<div style={{ textAlign: "center" }}>
												<h3 className="signup-header">สมัครสมาชิก</h3>
												<h3 className="signup-title">กรอกเลขที่บัญชี</h3>
											</div>

											<div
												className="bank-list-container"
												id="bank-list-container"
											>
												<div style={{ opacity: bankCode === 2 ? 1 : 0.5 }} className={bankCode === 2 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(2)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/scb2.png"
														id="bank1"
														alt="icon"
													/>
												</div>
												<div style={{ opacity: bankCode === 1 ? 1 : 0.5 }} className={bankCode === 1 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(1)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/kbank1.png"
														id="bank1"
														alt="icon"
													/>
												</div>

												<div style={{ opacity: bankCode === 3 ? 1 : 0.5 }} className={bankCode === 3 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(3)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/ktb3.png"
														id="bank1"
														alt="icon"
													/>
												</div>
												<div style={{ opacity: bankCode === 4 ? 1 : 0.5 }} className={bankCode === 4 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(4)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/bbl4.png"
														id="bank1"
														alt="icon"
													/>
												</div>
												<div style={{ opacity: bankCode === 5 ? 1 : 0.5 }} className={bankCode === 5 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(5)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/bay5.png"
														id="bank1"
														alt="icon"
													/>
												</div>
												<div style={{ opacity: bankCode === 6 ? 1 : 0.5 }} className={bankCode === 6 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(6)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/tmb6.png"
														id="bank1"
														alt="icon"
													/>
												</div>
												<div style={{ opacity: bankCode === 8 ? 1 : 0.5 }} className={bankCode === 8 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(8)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/gsb8.png"
														id="bank1"
														alt="icon"
													/>
												</div>
												<div style={{ opacity: bankCode === 10 ? 1 : 0.5 }} className={bankCode === 10 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(10)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/uob10.png"
														id="bank1"
														alt="icon"
													/>
												</div>
												<div style={{ opacity: bankCode === 11 ? 1 : 0.5 }} className={bankCode === 11 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(11)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/kk11.png"
														id="bank1"
														alt="icon"
													/>
												</div>
												<div style={{ opacity: bankCode === 12 ? 1 : 0.5 }} className={bankCode === 12 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(12)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/lh12.png"
														id="bank1"
														alt="icon"
													/>
												</div>
												<div style={{ opacity: bankCode === 13 ? 1 : 0.5 }} className={bankCode === 13 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(13)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/ibank13.png"
														id="bank1"
														alt="icon"
													/>
												</div>
												<div style={{ opacity: bankCode === 14 ? 1 : 0.5 }} className={bankCode === 14 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(14)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/tisco14.png"
														id="bank1"
														alt="icon"
													/>
												</div>
												<div style={{ opacity: bankCode === 16 ? 1 : 0.5 }} className={bankCode === 16 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(16)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/ghb16.png"
														id="bank1"
														alt="icon"
													/>
												</div>
												<div style={{ opacity: bankCode === 17 ? 1 : 0.5 }} className={bankCode === 17 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(17)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/cimb17.png"
														id="bank1"
														alt="icon"
													/>
												</div>
												<div style={{ opacity: bankCode === 18 ? 1 : 0.5 }} className={bankCode === 18 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(18)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/baac18.png"
														id="bank1"
														alt="icon"
													/>
												</div>
												<div style={{ opacity: bankCode === 19 ? 1 : 0.5 }} className={bankCode === 19 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(19)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/icon-bank-active/icbc19.png"
														id="bank1"
														alt="icon"
													/>
												</div>
												<div style={{ opacity: bankCode === 20 ? 1 : 0.5 }} className={bankCode === 18 ? "active-bank" : ""}>
													<img onClick={() => setBankCode(20)} onKeyDown={() => ""}
														className="bank-item"
														src="/assets/icons/login/bcel.png"
														id="bank1"
														alt="icon"
													/>
												</div>

											</div>
											<div className="phone-input">
												<select
													style={{ background: "transparent", border: 0, color: '#FFF' }}
													id="bank"
													value={bankCode}
													placeholder="เลขบัญชีธนาคาร"
													onChange={(event) =>
														setBankCode(Number.parseInt(event?.target?.value))
													}
												>
													<option>กรุณาเลือกธนาคารของคุณ</option>
													{BackList.length > 0 && BackList?.map((bank) => (
														<option key={bank?.code} value={bank?.code}>
															{bank?.bankName}
														</option>
													))}
												</select>
											</div>
											<div className="phone-input">
												<img src="/assets/icons/bank.svg" alt="icon" />
												<input
													type="text"
													id="number"
													name="bank"
													s value={inputBank}
													placeholder="เลขบัญชีธนาคาร"
													onChange={(event) => handleChangeBank(event)}
												/>
											</div>
											<div style={{ textAlign: "center", padding: 10 }}>
												{messageCreate}
											</div>
											<button
												type="button"
												id="goto-step3"
												// data-bs-dismiss="modal"
												// aria-label="Close"
												// data-bs-toggle="modal"
												// data-bs-target="#successRegisterModal"
												onClick={() => CreateUser()}
											>
												ยืนยัน สมัครสมาชิก
											</button>
										</div>
										{/* <!-- step two end --> */}

										{/* <!-- step three --> */}
										{/* <div className="step-three" id="form-step-three">
                  <h3 className="signup-header-success">สมัครสมาชิกสำเร็จ</h3>
                  <div className="img-success-container">
                    <img
                      src="/assets/images/ezgif.svg"
                      className="img-success"
                      alt="login"
                    />
                  </div>
                  <button
                    id="goToLoginBtn"
                    className="modal-icon-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    เข้าสู่ระบบ
                  </button>
                </div>  */}
										{/* <!-- step three end --> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
					className="modal fade"
					id="successRegisterModal"
					tabIndex="-1"
					aria-labelledby="successRegisterModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog">
						<div className="modal-border">
							<div className="modal-content">
								<div className="modal-header-container">
									<div className="modal-header">
										<p className="modal-title">สมัครสมาชิกสำเร็จ</p>
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
									<div className="register-success-modal-content" id="mobile">
										<div className="border-input-gold">
											<div className="register-info-content">
												<p className="register-info-title">ข้อมูลสมัคร</p>
												<div className="register-info-group">
													<p className="register-info-text">Username :</p>
													<p className="register-info-text-bold">0181449403</p>
												</div>
											</div>
										</div>
										<div className="suggest-info">
											รหัสคือเลขบัญชีธนาคารที่ลูกค้าสมัครเลยนะคะ
											ขอให้เล่นให้สนุกเฮงเฮงรวยรวยนะคะลูกค้า
										</div>

										<button
											type="button"
											className="next-step-button btn-register-success"
											id="goToLoginBtn"
											onClick={handleLoginClick}
											data-bs-dismiss="modal"
											aria-label="Close"
										>
											เข้าสู่ระบบ
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* <!-- start profile --> */}
				<div
					className="modal fade"
					id="profile"
					tabIndex="-1"
					aria-labelledby="profile"
					aria-hidden="true"
				>
					<div className="modal-dialog" style={{ width: 430 }}>
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
										<div className="detail-card-kbank">
											<div className="card-kbank">
												<div className="font-17">
													<p>ธนาคารกสิกรไทย</p>
													<div
														style={{
															display: "flex",
															justifyContent: "space-between",
														}}
													>
														<div style={{ marginRight: 10 }}>KBank</div>
														<img
															src="/assets/icons/logo-kbank.svg"
															alt="logo"
															style={{ marginTop: -10 }}
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
													<p>026-999999-9</p>
													<p>1000.00 บาท</p>
												</div>
												<div
													style={{
														marginTop: 30,
														marginBottom: 25,
														display: "flex",
														justifyContent: "end",
													}}
												>
													<img src="/assets/icons/visa.svg" alt="visa" />
												</div>
											</div>
										</div>
										<div className="slide-image">
											<div className="active" />
											<div className="none-active" />
										</div>
										<div className="custom-btn">
											<button type="button" className="setting">
												ตั้งเป็นบัญชีหลัก
											</button>
											<button
												type="button"
												className="add-account"
												data-bs-toggle="modal"
												data-bs-target="#addAccount"
												data-bs-dismiss="modal"
											>
												เพิ่มบัญชี
											</button>
										</div>
										<div className="change-password-hr">
											<div className="hr" />
										</div>
										<div className="user">
											<p className="username">Username</p>
											<p className="result">st1745562156</p>
										</div>
										<div className="password">
											<p className="pass">Password</p>
											<p className="result">************</p>
										</div>
										<div
											className="change-password"
											data-bs-toggle="modal"
											data-bs-target="#changePasswordModal"
											data-bs-dismiss="modal"
										>
											<div>
												{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="51"
													height="51"
													viewBox="0 0 51 51"
													fill="none"
												>
													<path
														d="M25.033 21.7165C24.4104 21.0943 23.4014 21.0945 22.779 21.7171C22.1568 22.3397 22.157 23.3487 22.7796 23.9711L24.309 25.4996L22.7794 27.0294C22.157 27.6518 22.157 28.6607 22.7794 29.2832C23.4018 29.9056 24.4108 29.9056 25.0332 29.2832L26.5634 27.7529L28.0921 29.281C28.7148 29.9032 29.7237 29.903 30.3461 29.2804C30.9683 28.658 30.9681 27.6488 30.3455 27.0266L28.8174 25.4992L30.3457 23.9707C30.9681 23.3482 30.9681 22.3393 30.3457 21.7169C29.7233 21.0944 28.7143 21.0944 28.0919 21.7169L26.563 23.2458L25.033 21.7165Z"
														fill="white"
													/>
													<path
														d="M11.0915 21.7171C11.7138 21.0945 12.7229 21.0943 13.3454 21.7165L14.8754 23.2458L16.4043 21.7169C17.0267 21.0944 18.0358 21.0944 18.6582 21.7169C19.2806 22.3393 19.2806 23.3482 18.6582 23.9707L17.1298 25.4992L18.6579 27.0266C19.2805 27.6488 19.2807 28.658 18.6585 29.2804C18.0362 29.903 17.0271 29.9032 16.4046 29.281L14.8759 27.7529L13.3457 29.2832C12.7233 29.9056 11.7142 29.9056 11.0918 29.2832C10.4694 28.6607 10.4694 27.6518 11.0918 27.0294L12.6215 25.4996L11.0921 23.9711C10.4695 23.3487 10.4693 22.3397 11.0915 21.7171Z"
														fill="white"
													/>
													<path
														d="M35.0625 28.6875C34.1823 28.6875 33.4688 29.4011 33.4688 30.2812C33.4688 31.1614 34.1823 31.875 35.0625 31.875H38.7812C39.6614 31.875 40.375 31.1614 40.375 30.2812C40.375 29.4011 39.6614 28.6875 38.7812 28.6875H35.0625Z"
														fill="white"
													/>
													<path
														d="M11.1546 10.625C7.33975 10.625 4.25 13.7177 4.25 17.5312V33.4688C4.25 37.2829 7.34202 40.375 11.1562 40.375H39.8438C43.6579 40.375 46.75 37.2829 46.75 33.4688V17.5312C46.75 13.7177 43.6602 10.625 39.8454 10.625H11.1546ZM7.4375 17.5312C7.4375 15.4768 9.10144 13.8125 11.1546 13.8125H39.8454C41.8986 13.8125 43.5625 15.4768 43.5625 17.5312V33.4688C43.5625 35.5226 41.8976 37.1875 39.8438 37.1875H11.1562C9.10244 37.1875 7.4375 35.5226 7.4375 33.4688V17.5312Z"
														fill="white"
													/>
												</svg>
											</div>
											<p>เปลี่ยนรหัสผ่าน</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!-- end profile --> */}
				{/* <!-- start  modal add account --> */}
				<div
					className="modal fade"
					id="addAccount"
					tabIndex="-1"
					aria-labelledby="addAccount"
					aria-hidden="true"
				>
					<div className="modal-dialog" style={{ width: 380 }}>
						<div className="modal-border">
							<div className="modal-content">
								<div className="modal-header-container">
									<div className="modal-header">
										<img
											src="/assets/icons/icon-back-modal.svg"
											className="modal-icon-back"
											alt=""
											data-bs-toggle="modal"
											data-bs-dismiss="modal"
										/>
										<p className="modal-title" id="addAccount">
											เพิ่มบัญชี
										</p>
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
									<div className="add-account-content-pc flexCenter">
										<div className="bank-section">
											<p>กรุณาเลือกธนาคาร</p>
											<div className="bank-list">
												<img
													src="/assets/icons/icon-bank-default/Ellipse 10.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 11.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 12.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 13.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 14.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 15.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 16.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 17.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 18.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 19.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 20.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 21.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 22.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 23.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 24.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 25.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 26.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 27.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 28.svg"
													alt=""
													className="bank-icon"
												/>
												<img
													src="/assets/icons/icon-bank-default/Ellipse 29.svg"
													alt=""
													className="bank-icon"
												/>
											</div>
										</div>

										<div className="bank-number">
											<p>กรุณากรอกเลขบัญชี</p>
											<div className="bank-number-input flexCenter">
												<div className="icon">
													{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="20"
														height="20"
														viewBox="0 0 20 20"
														fill="none"
													>
														<g clip-path="url(#clip0_912_2229)">
															<path
																d="M1.6665 16.6665H18.3332V18.3332H1.6665V16.6665ZM3.33317 9.99984H4.99984V15.8332H3.33317V9.99984ZM7.49984 9.99984H9.1665V15.8332H7.49984V9.99984ZM10.8332 9.99984H12.4998V15.8332H10.8332V9.99984ZM14.9998 9.99984H16.6665V15.8332H14.9998V9.99984ZM1.6665 5.83317L9.99984 1.6665L18.3332 5.83317V9.1665H1.6665V5.83317ZM9.99984 6.6665C10.2209 6.6665 10.4328 6.57871 10.5891 6.42243C10.7454 6.26615 10.8332 6.05418 10.8332 5.83317C10.8332 5.61216 10.7454 5.4002 10.5891 5.24392C10.4328 5.08764 10.2209 4.99984 9.99984 4.99984C9.77882 4.99984 9.56686 5.08764 9.41058 5.24392C9.2543 5.4002 9.1665 5.61216 9.1665 5.83317C9.1665 6.05418 9.2543 6.26615 9.41058 6.42243C9.56686 6.57871 9.77882 6.6665 9.99984 6.6665Z"
																fill="white"
															/>
														</g>
														<defs>
															{/* <clipPath id="clip0_912_2229">
															<rect width="20" height="20" fill="white" />
														</clipPath> */}
														</defs>
													</svg>
												</div>
												<input type="number" placeholder="เลขบัญชีธนาคาร" />
											</div>
										</div>

										<button type="button" className="button-warning">
											ยืนยัน
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!-- end  modal add account --> */}
				{/* <!-- start cashback --> */}
				<div
					className="modal fade"
					id="cashback"
					tabIndex="-1"
					aria-labelledby="cashback"
					aria-hidden="true"
					data-bs-dismiss="modal"
				>
					<div className="modal-dialog modal-xl">
						<div className="modal-content">
							<div className="modal-border">
								<div className="modal-content">
									<div className="modal-header-container">
										<div className="modal-header">
											<img
												src="/assets/icons/icon-back-modal.svg"
												className="modal-icon-back"
												alt=""
												data-bs-toggle="modal"
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
				</div>
				{/* <!-- end cashback --> */}

				{/* <!-- start cashback detail --> */}
				<div
					className="modal fade"
					id="cashbackDetail"
					tabIndex="-1"
					aria-labelledby="cashbackDetail"
					aria-hidden="true"
					data-bs-dismiss="modal"
				>
					<div className="modal-dialog modal-xl">
						<div className="modal-border">
							<div className="modal-content">
								<div className="modal-header-container">
									<div className="modal-header">
										<img
											src="/assets/icons/icon-back-modal.svg"
											className="modal-icon-back"
											alt=""
											data-bs-toggle="modal"
											data-bs-target="#cashback"
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
										<div className="detail">
											<div className="title">ยอดเสียเกมส์ สล็อต</div>
											<div className="accumulated-lot-amount">
												<div className="text-amount">
													<div className="text-left">ยอดเสียสะสม 0</div>
													<div className="text-right">Cashback 5.00 %</div>
												</div>
												<div className="text-amount">
													<div className="text-left">ยอดเสียวันนี้ 0</div>
													<div className="text-right history-background">
														ประวัติการรับ
													</div>
												</div>
											</div>
											<div className="your-loss">ยอดเสียของคุณ</div>
											<div className="loss">0</div>
											<div className="updated">อัพเดทล่าสุด 09-09-65 12.00 น.</div>
											<div className="btn">
												<button type="button" className="receive-credit">
													รับเข้าเครดิต
												</button>
												<button type="button" className="withdraw-to-accont">
													ถอนเข้าบัญชี
												</button>
											</div>
											<div className="description">
												<p className="text-left">ขั้นต่ำ 1 สูงสุด 10000</p>
												<p className="text-right">ปิดใช้งานก่อนเข้าบัญชี</p>
											</div>
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
					tabIndex="-1"
					aria-labelledby="depositWithdraw"
					aria-hidden="true"
					data-bs-dismiss="modal"
				>
					<div className="modal-dialog" style={{ width: 440 }}>
						<div className="modal-border">
							<div className="modal-content">
								<div className="modal-header-container">
									<div className="modal-header">
										<img
											src="/assets/icons/icon-back-modal.svg"
											className="modal-icon-back"
											alt=""
										/>
										<p className="modal-title" id="depositWithdraw">
											ฝาก - ถอน
										</p>
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
									<div className="detail-card-kbank">
										<div className="card-kbank">
											<div className="font-17">
												<p>ธนาคารกสิกรไทย</p>
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
													}}
												>
													KBank
													<img
														src="/assets/icons/logo-kbank.svg"
														alt="logo"
														style={{ marginTop: -10 }}
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
													marginTop: 20,
													marginBottom: 30,
													display: "flex",
													justifyContent: "end",
												}}
											>
												<img src="/assets/icons/visa.svg" alt="visa" />
											</div>
										</div>
									</div>
									<div
										className="slide-image"
										style={{ display: "flex", justifyContent: "center" }}
									>
										<div className="active" />
										<div className="none-active" />
									</div>

									<div
										style={{
											marginTop: 20,
											display: "grid",
											color: "white",
											gridTemplateColumns: "repeat(3, 110px)",
											gap: 16,
											justifyContent: "center",
										}}
									>
										<div
											style={{ cursor: "pointer" }}
											data-bs-toggle="modal"
											data-bs-target="#autoDeposit"
											data-bs-dismiss="modal"
										>
											<div className="type-of-withdrawal">
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
											style={{ cursor: "pointer" }}
											data-bs-toggle="modal"
											data-bs-target="#leaveAdecimal"
											data-bs-dismiss="modal"
										>
											<div className="type-of-withdrawal">
												<div className="withdrawal">
													<img
														src="/assets/images/Leave a-decimal.svg"
														alt="kkk"
													/>
													<div>ฝากทศนิยม</div>
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
													<img
														src="/assets/images/Withdraw-money.svg"
														alt="kkk"
													/>
													<div>ถอนเงิน</div>
												</div>
											</div>
										</div>

										<div
											style={{ cursor: "pointer" }}
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
										</div>

										<div
											style={{ cursor: "pointer" }}
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
										</div>
									</div>

									<div
										style={{
											textAlign: "center",
											marginTop: 10,
											fontSize: 12,
										}}
									>
										<div>
											พบปัญหา
											<span
												style={{
													color: "rgba(0, 252, 252, 1)",
													textDecoration: "underline",
													cursor: "pointer",
												}}
											>
												ติดต่อฝ่ายบริการลูกค้า
											</span>
										</div>
									</div>
									<div className="button-line">
										<div>
											<img
												src="/assets/icons/icon-line.svg"
												alt="line"
												style={{ width: 30, height: 30 }}
											/>
											ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน
										</div>
									</div>
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
					tabIndex="-1"
					aria-labelledby="autoDeposit"
					aria-hidden="true"
					data-bs-dismiss="modal"
				>
					<div className="modal-dialog" style={{ width: 350 }}>
						<div className="modal-content">
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
											<p className="modal-title" id="autoDeposit">
												ฝากออโต้
											</p>
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
										<div className="detail-card-scb">
											<div className="card-scb">
												<div className="left">
													<p>ธนาคารกสิกรไทย</p>
													<p>
														026-999999-9
														<span>
															<img
																src="/assets/images/icon-coppy.svg"
																alt=""
																style={{
																	width: 20,
																	height: 20,
																	marginBottom: -3,
																}}
															/>
														</span>
													</p>
													<p>นาย xxxxx xxxxx</p>
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
										<div className="slide-image" style={{ marginTop: 12 }}>
											<div className="active" />
											<div className="none-active" />
										</div>
										<div>
											<div className="button-validationt">
												<div style={{ color: "white" }}>
													กรุณาใช้เลขบัญชีที่สมัครโอนเข้ามาเท่านั้น
												</div>
											</div>
										</div>
										<div
											style={{
												textAlign: "center",
												marginTop: 10,
												fontSize: 14,
											}}
										>
											<div>
												พบปัญหา
												<span
													style={{
														color: "rgba(0, 252, 252, 1)",
														textDecoration: "underline",
														cursor: "pointer",
													}}
												>
													ติดต่อฝ่ายบริการลูกค้า
												</span>
											</div>
										</div>
										<div className="button-line">
											<div>
												<img
													src="/assets/icons/icon-line.svg"
													style={{ width: 28, height: 28 }}
													alt="line"
												/>
												ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน
											</div>
										</div>
									</div>
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
					tabIndex="-1"
					aria-labelledby="leaveAdecimal"
					aria-hidden="true"
					data-bs-dismiss="modal"
				>
					<div className="modal-dialog" style={{ width: 350 }}>
						<div className="modal-content">
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
											<p className="modal-title" id="leaveAdecimal">
												ฝากทศนิยม
											</p>
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
										<div style={{ padding: 20, paddingTop: 30 }}>
											<ul>
												<li>ฝากขั้นต่ำ 1.00 บาท สูงสุด 2,000.00 บาท</li>
											</ul>
										</div>
										<div style={{ width: "100%" }}>
											<input
												type="text"
												className="text-amount-money"
												placeholder="กรอกจำนวนเงินที่ต้องการฝาก"
											/>
											<p style={{ color: "#ff0000", fontSize: 14 }}>
												กรุณากรอกข้อมูล
											</p>
										</div>
										<div style={{ width: "100%" }}>
											<div
												className="confirm-the-amount"
												style={{ cursor: "pointer" }}
												data-bs-toggle="modal"
												data-bs-target="#leaveAdecimal1"
												data-bs-dismiss="modal"
											>
												<div>ยืนยันจำนวนเงิน</div>
											</div>
										</div>
										<div
											style={{
												textAlign: "center",
												marginTop: 10,
												fontSize: 12,
											}}
										>
											<div>
												พบปัญหา
												<span
													style={{
														color: "rgba(0, 252, 252, 1)",
														textDecoration: "underline",
														cursor: "pointer",
													}}
												>
													ติดต่อฝ่ายบริการลูกค้า
												</span>
											</div>
										</div>
										<div
											className="button-line"
											style={{ cursor: "pointer", fontSize: 13 }}
										>
											<div>
												<img
													src="/assets/icons/icon-line.svg"
													style={{ width: 30, height: 30 }}
													alt="line"
												/>
												<span> ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน </span>
											</div>
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
					tabIndex="-1"
					aria-labelledby="leaveAdecimal1"
					aria-hidden="true"
					data-bs-dismiss="modal"
				>
					<div className="modal-dialog modal-xl">
						<div className="modal-content">
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
											<p className="modal-title" id="leaveAdecimal1">
												ฝากทศนิยม
											</p>
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
												padding: "20px 20px 0 20px",
												textAlign: "center",
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
													color: "#f9df7b",
												}}
											>
												111.11
											</div>
											<div style={{ fontSize: 14 }}>
												กรุณาโอนเงินภายใน
												<span style={{ color: "#ff0000" }}>00.00</span> นาที
											</div>
										</div>
										<div className="detail-card-scb1">
											<div className="card-scb1">
												<div className="left">
													<p>ธนาคารกสิกรไทย</p>
													<p>
														นาย xxxxx xxxxx{" "}
														<span>
															<img
																src="/assets/images/icon-coppy.svg"
																alt=""
																style={{
																	width: 20,
																	height: 20,
																	marginBottom: -3,
																}}
															/>
														</span>
													</p>
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
													style={{
														color: "rgba(0, 252, 252, 1)",
														textDecoration: "underline",
														cursor: "pointer",
													}}
												>
													ติดต่อฝ่ายบริการลูกค้า
												</span>
											</div>
										</div>
										<div className="button-line">
											<div>
												<img
													src="/assets/icons/icon-line.svg"
													style={{ width: 30, height: 30 }}
													alt="line"
												/>
												ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน
											</div>
										</div>
									</div>
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
				tabIndex="-1"
				aria-labelledby="withdraw"
				aria-hidden="true"
			>
				<div className="modal-dialog" style={{ width: 350 }}>
					<div className="modal-content">
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
										<p className="modal-title" id="withdraw">
											ถอนเงิน
										</p>
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
										<div className="detail-card-kbank">
											<div className="card-kbank">
												<div className="font-17">
													<p>ธนาคารกสิกรไทย</p>
													<div
														style={{
															display: "flex",
															justifyContent: "space-between",
														}}
													>
														<div style={{ marginRight: 10 }}>KBank</div>
														<img
															src="/assets/icons/logo-kbank.svg"
															alt="logo"
															style={{ marginTop: -10 }}
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
													<p>026-999999-9</p>
													<p>1000.00 บาท</p>
												</div>
												<div
													style={{
														marginTop: 30,
														marginBottom: 25,
														display: "flex",
														justifyContent: "end",
													}}
												>
													<img src="/assets/icons/visa.svg" alt="visa" />
												</div>
											</div>
										</div>

										<div className="slider-wrapper flexBetween">
											<div className="active slider" />
											<div className="slider" />
										</div>

										<div className="money-input flexBetween">
											<p>จำนวนเงินที่ถอนได้</p>
											<input type="text" placeholder="1000" />
										</div>
										<div className="money-input flexBetween">
											<p style={{ color: "red" }}>กรุณาระบุจำนวนที่จะถอน</p>
											<input type="text" placeholder="1000" />
										</div>

										<div className="button-warning">ถอนเงิน</div>

										<p>
											พบปัญหา <a href="/">ติดต่อฝ่ายบริการลูกค้า</a>
										</p>

										<button type="button" className="line-button flexCenter">
											<img src="/assets/icons/icon-line.svg" alt="line icon" />
											<p>ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน</p>
										</button>
									</div>
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
				tabIndex="-1"
				aria-labelledby="qrplay"
				aria-hidden="true"
			>
				<div className="modal-dialog" style={{ width: 370 }}>
					<div className="modal-content">
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
										<p className="modal-title" id="qrplay">
											QR PAY
										</p>
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
												marginBottom: -10,
												marginLeft: 5,
												color: "red",
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
												>
													a
												</option>
												<option
													value="au"
													data-thumbnail="https://www.uhub.co.th/assets/images/icons/mobile/scb-icon.png"
												>
													a
												</option>
											</select>

											{/* <!-- <div className="lang-select">
                  <button className="btn-select" value=""></button
                  ><img
                    src="/assets/icons/icon-drow.svg"
                    alt=""
                    style="margin: 5px 0 0 -27px"
                  />
                  <div className="b">
                    <ul id="a"></ul>
                  </div>
                </div> --> */}
											<div className="custom-dropdown" id="custom-dropdown">
												<div className="selected-item" id="selected-item" />
												<img
													src="/assets/icons/icon-drow.svg"
													alt=""
													className="dropdown-icon"
												/>
												<div className="dropdown-list" id="dropdown-list">
													{/* <!-- <div className="dropdown-option"><img className="dropdown-item-img" src="https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png" alt=""></div>
                    <div className="dropdown-option"><img className="dropdown-item-img" src="https://www.uhub.co.th/assets/images/icons/mobile/scb-icon.png" alt=""></div> --> */}
													<img
														className="dropdown-item-img"
														src="https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png"
														alt="logo"
													/>
													<img
														className="dropdown-item-img"
														src="https://www.uhub.co.th/assets/images/icons/mobile/scb-icon.png"
														alt=""
													/>
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
													href="/"
													style={{
														color: "rgba(0, 252, 252, 1)",

														textDecoration: "underline",
														cursor: "pointer",
													}}
												>
													ติดต่อฝ่ายบริการลูกค้า
												</a>
											</p>
										</div>
										<div className="button-line">
											<div>
												<img
													src="/assets/icons/icon-line.svg"
													style={{ width: 30, height: 30 }}
													alt="line"
												/>
												ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน
											</div>
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
			<div
				className="modal fade"
				id="showQR"
				tabIndex="-1"
				aria-labelledby="showQR"
				aria-hidden="true"
				data-bs-dismiss="modal"
			>
				<div className="modal-dialog modal-xl">
					<div className="modal-content">
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
										<p className="modal-title" id="showQR">
											QR PAY
										</p>
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
												<button type="button" className="save">
													<img src="/assets/icons/farm.svg" alt="save" /> บันทึก
												</button>
												<button type="button" className="refresh">
													<img src="/assets/icons/reload.svg" alt="save" />{" "}
													รีเฟรช
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
												<p>4.เลือกรูปภาพ QR Code ที่บันทึกหรือแคป เพื่อทำรายการจ่าย</p>
											</div>
											<div
												style={{
													textAlign: "center",
													marginTop: 10,
													fontSize: 12,
												}}
											>
												<div>
													พบปัญหา
													<span
														style={{
															color: "rgba(0, 252, 252, 1)",
															textDecoration: "underline",
															cursor: "pointer",
														}}
													>
														ติดต่อฝ่ายบริการลูกค้า
													</span>
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

			{/* <!-- end modal qr --> */}

			{/* <!-- slip verify modal --> */}
			<div
				className="modal fade"
				id="slipVerify"
				tabIndex="-1"
				aria-labelledby="slipVerifyLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog" style={{ width: 370 }}>
					<div className="modal-content">
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
										<div className="bank-selector1">
											<select className="vodiapicker1">
												<option
													value="kbank"
													className="test"
													data-thumbnail="https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png"
												>
													a
												</option>
												<option
													value="au"
													data-thumbnail="https://www.uhub.co.th/assets/images/icons/mobile/scb-icon.png"
												>
													a
												</option>
											</select>

											<div className="lang-select1">
												<button
													type="button"
													className="btn-select1"
													value=""
												/>
												<img
													src="/assets/icons/icon-drow.svg"
													alt=""
													style={{ margin: "5px 0 0 -27px" }}
												/>
												<div className="b1">
													<ul id="a1" />
												</div>
											</div>

											<div className="show-username-bank">นาย ปปปปป ปปปปป</div>
										</div>
										{/* <!-- <div className="bank-selector">
                <label for="name">เลือกธนาคารบัญชีฝาก</label>

                <div className="flexCenter" style="gap: 8px">
                  <div className="flexCenter" style="width: 20%">
                    <img
                      src="/assets/icons/icon-bank-default/Ellipse 10.svg"
                      alt="bank icon"
                      width="33"
                      height="33"
                    />
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5442 17.1414L6.28711 10.9062H18.8013L12.5442 17.1414Z"
                        fill="#FF9900"
                      />
                    </svg>
                  </div>
                  <input
                    style="width: 80%"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="นาย ปปปปป ปปปปป"
                  />
                </div>
              </div> --> */}

										<div className="bank-input">
											<label for="bank">เลือกธนาคารที่ทำรายการฝาก</label>
											<input type="text" name="bank" placeholder="เลือกธนาคาร" />
										</div>
										<div className="bank-input">
											<label for="bank">กรุณากรอกข้อมูล</label>
											<input type="text" name="bank" placeholder="0" />
											<small>กรอกจำนวนเงินตามสลิป</small>
										</div>
										<div className="bank-input">
											<label for="bank">กรุณากรอกข้อมูล</label>
											<input type="text" name="bank" placeholder="0" />
											<small>วันที่ทำรายการฝาก</small>
										</div>

										<button type="button" className="button-warning">
											ยืนยันยอดฝาก
										</button>
										<p>
											พบปัญหา <a href="/">ติดต่อฝ่ายบริการลูกค้า</a>
										</p>
									</div>
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
				tabIndex="-1"
				aria-labelledby="trueWalletLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-xl">
					<div className="modal-content">
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
												<p>
													026-999999-9{" "}
													<span>
														<img
															src="/assets/images/icon-coppy.svg"
															alt=""
															style={{
																width: 20,
																height: 20,
																marginBottom: -3,
															}}
														/>
													</span>
												</p>
												<p>นาย xxxxx xxxxx</p>
											</div>
											<div className="flexBetween right">
												<div className="true-wallet-title flexBetween">
													<p>True Wallet</p>

													<div>
														<img
															src="/assets/images/true-money-wallet.svg"
															alt=""
														/>
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
											พบปัญหา <a href="/">ติดต่อฝ่ายบริการลูกค้า</a>
										</p>

										<button type="button" className="line-button">
											<img
												src="/assets/icons/icon-line.svg"
												style={{ width: 30, height: 30 }}
												alt="line icon"
											/>
											<p>ไลน์บอท / แจ้งเตือนยอดฝาก - ถอน</p>
										</button>
									</div>
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
				tabIndex="-1"
				aria-labelledby="historyModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-border">
							<div className="modal-content">
								<div className="modal-header-container">
									<div className="modal-header">
										<p className="modal-title" id="history-title-deposit">
											{tabs}
										</p>
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
											<div
												className={
													tabName === "tab-deposit"
														? "history-tab-item active"
														: "history-tab-item"
												}
												onClick={() => _clickTabDeposit("tab-deposit", setTabs, setTabName)}
												onKeyDown={() => ""}
												id="tab-deposit"
											>
												ฝาก
											</div>
											<div
												className={
													tabName === "tab-withdraw"
														? "history-tab-item active"
														: "history-tab-item"
												}
												onClick={() => _clickTabDeposit("tab-withdraw", setTabs, setTabName)}
												onKeyDown={() => ""}
												id="tab-withdraw"
											>
												ถอน
											</div>
											<div
												className={
													tabName === "tab-bonus"
														? "history-tab-item active"
														: "history-tab-item"
												}
												onClick={() => _clickTabDeposit("tab-bonus", setTabs, setTabName)}
												onKeyDown={() => ""}
												id="tab-bonus"
											>
												โบนัส
											</div>
										</div>
										{/* <!-- ฝาก --> */}
										<div
											className="history-deposit"
											id="history-content-deposit"
										>
											<div className="history-list">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการฝาก
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
											<div className="history-list">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการฝาก
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
											<div className="history-list border-0">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการฝาก
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
											<div className="history-list border-0">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการฝาก
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
											<div className="history-list border-0">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการฝาก
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
											<div className="history-list border-0">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการฝาก
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
										</div>

										{/* <!-- ถอน --> */}
										<div
											className="history-withdraw"
											id="history-content-withdraw"
											style={{ display: "none" }}
										>
											<div className="history-list">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการถอน
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
											<div className="history-list">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการถอน
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
											<div className="history-list border-0">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการถอน
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
											<div className="history-list border-0">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการถอน
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
											<div className="history-list border-0">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการถอน
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
										</div>

										{/* <!-- โบนัส --> */}
										<div
											className="history-bonus"
											id="history-content-bonus"
											style={{ display: "none" }}
										>
											<div className="history-list">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการโบนัส
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
											<div className="history-list">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการโบนัส
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
											<div className="history-list border-0">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการโบนัส
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
											<div className="history-list border-0">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการโบนัส
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
											<div className="history-list border-0">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการโบนัส
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
												</div>
											</div>
											<div className="history-list border-0">
												<div className="history-list-left">
													<label className="history-list-label">
														รายการโบนัส
													</label>
													<p className="history-list-label">55</p>
													<p className="history-list-label">
														หมายเหตุ : ไม่รับโบนัส
													</p>
												</div>
												<div className="history-list-right">
													<div className="history-status success">สำเร็จ</div>
													<p className="history-date">2022-10-16 16.00</p>
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
			{/* <!-- history modal end --> */}

			{/* <!-- bag modal --> */}
			<div
				className="modal fade"
				id="bagModal"
				tabIndex="-1"
				aria-labelledby="bagModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog" style={{ width: 660 }}>
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
									<div className="bag-modal-slide-container">
										<img src="/assets/images/bag-background.png" alt="" />
									</div>

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
											id="spinner-modal-btn"
											data-bs-toggle="modal"
											data-bs-target="#spinnerModal"
											data-bs-dismiss="modal"
										>
											<div className="bag-menu-img-container">
												<img
													className="bag-menu-icon"
													src="/assets/icons/icon-spinner.svg"
													alt=""
												/>
											</div>
											<p className="bag-modal-menu-title">กงล้อ</p>
										</div>
										<div
											className="bag-modal-menu-item"
											id="credit-modal-btn"
											data-bs-toggle="modal"
											data-bs-target="#creditModal"
											data-bs-dismiss="modal"
										>
											<div className="bag-menu-img-container">
												<img
													className="bag-menu-icon"
													src="/assets/icons/icon-teasure.svg"
													alt=""
												/>
											</div>
											<p className="bag-modal-menu-title">เครดิตฟรี</p>
										</div>
										<div
											className="bag-modal-menu-item"
											data-bs-toggle="modal"
											data-bs-target="#cashback"
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
											id="diamond-modal-btn"
											data-bs-toggle="modal"
											data-bs-target="#diamondModal"
											data-bs-dismiss="modal"
										>
											<div className="bag-menu-img-container">
												<img
													className="bag-menu-icon"
													src="/assets/icons/icon-diamond.svg"
													alt=""
												/>
											</div>
											<p className="bag-modal-menu-title">แลกเพรช</p>
										</div>
										<div
											className="bag-modal-menu-item"
											id="tournament-modal-btn"
											data-bs-toggle="modal"
											data-bs-target="#tournamentModal"
											data-bs-dismiss="modal"
										>
											<div className="bag-menu-img-container">
												<img
													className="bag-menu-icon"
													src="/assets/icons/icon-trophy.svg"
													alt=""
												/>
											</div>
											<p className="bag-modal-menu-title">ทัวร์นาเมนต์</p>
										</div>
										<div className="bag-modal-menu-item">
											<div className="bag-menu-img-container">
												<img
													className="bag-menu-icon"
													src="/assets/icons/icon-road-map.svg"
													alt=""
												/>
											</div>
											<p className="bag-modal-menu-title">Road Map</p>
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
				tabIndex="-1"
				aria-labelledby="promotionModalLabel"
				aria-hidden="true"
				data-bs-dismiss="modal"
			>
				<div className="modal-dialog modal-xl">
					<div className="modal-content">
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
										<p className="modal-title">โปรโมชั่น</p>
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
									<div className="promotion-modal-content">
										<div className="promotion-modal-body">
											<div className="promotion-modal-image-container">
												<img
													src="/assets/images/image-promotion-modal.svg"
													className="promotion-modal-image"
													alt=""
												/>
											</div>
											<p className="promotion-content-title">
												สมาชิกใหม่หมุนกงล้อฟรี
											</p>
											<p className="promotion-content-text">
												วันเกิด หมุนกงล้อฟรี !!
											</p>
											<p className="promotion-content-text">
												(สอบถามข้อมูลเพิ่มเติมได้ที่แอดมิน)
											</p>
										</div>
										<div className="promotion-modal-footer">
											<div className="promotion-modal-footer-content">
												<p className="promotion-modal-footer-title">
													สถานะโปรโมชั่น
												</p>
												<div className="promotion-checkbox-group">
													<input
														type="radio"
														className="promotion-default-radio"
														name="promotion-status"
														id="get-promotion"
													/>
													<label
														className="promotion-checkbox-title"
														for="get-promotion"
													>
														<div className="promotion-custom-radio" />
														รับโบนัส
													</label>
													<input
														type="radio"
														className="promotion-default-radio"
														name="promotion-status"
														id="not-get-promotion"
													/>
													<label
														className="promotion-checkbox-title"
														for="not-get-promotion"
													>
														<div className="promotion-custom-radio" />
														ไม่รับโบนัส
													</label>
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
			{/* <!-- promotion modal end --> */}

			{/* <!-- code modal --> */}
			<div
				className="modal fade"
				id="codeModal"
				tabIndex="-1"
				aria-labelledby="codeModalLabel"
				aria-hidden="true"
				data-bs-dismiss="modal"
			>
				<div className="modal-dialog modal-xl">
					<div className="modal-content">
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
										/>

										<button type="button" className="button-warning">
											ยืนยัน
										</button>
									</div>
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
				tabIndex="-1"
				aria-labelledby="creditModalLabel"
				aria-hidden="true"
				data-bs-dismiss="modal"
			>
				<div className="modal-dialog modal-xl">
					<div className="modal-content">
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
												{/* <!-- show this if no credit --> */}
												{/* <!-- <div className="no-credit">
                    <div className="no-credit-right">
                      <p className="no-credit-text">ไม่พบรายการ</p>
                      <p className="no-credit-text">เครดิตฟรี</p>
                    </div>
                  </div> --> */}

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
														<p className="credit-button-title">
															สามารถรับเครดิตฟรีได้
														</p>
														<button
															type="button"
															className="btn-credit-confirm"
														>
															ยินยัน
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
			</div>
			{/* <!-- credit modal end --> */}

			{/* <!-- diamond modal --> */}
			<div
				className="modal fade"
				id="diamondModal"
				tabIndex="-1"
				aria-labelledby="diamondModalLabel"
				aria-hidden="true"
				data-bs-dismiss="modal"
			>
				<div className="modal-dialog modal-xl">
					<div className="modal-content">
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
														<p className="credit-button-title">
															สามารถรับเพชรฟรีได้
														</p>
														<button
															type="button"
															className="btn-credit-confirm"
														>
															ยินยัน
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
			</div>
			{/* <!-- diamond modal end --> */}

			{/* <!-- tournament modal --> */}
			<div
				className="modal fade"
				id="tournamentModal"
				tabIndex="-1"
				aria-labelledby="tournamentModalLabel"
				aria-hidden="true"
				data-bs-dismiss="modal"
			>
				<div className="modal-dialog modal-xl">
					<div className="modal-content">
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
										<p className="modal-title">ทัวร์นาเมนท์</p>
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
									<div className="tournament-modal-content">
										<div className="top-recharge-select-container">
											<div className="top-recharge-select">
												<img
													className="select-icon"
													id="icon-top-play"
													src="/assets/icons/icon-top-play.svg"
													alt=""
												/>
												<img
													className="select-icon"
													id="icon-top-recharge"
													src="/assets/icons/icon-top-recharge.svg"
													alt=""
												/>
												<img
													className="select-icon"
													id="icon-top-lose"
													src="/assets/icons/icon-top-lose.svg"
													alt=""
												/>
												<select
													className="top-recharge-select-content"
													id="top-rank-select"
												>
													<option value="top-play">ยอดเล่นสูงสุด 30 อันดับ</option>
													<option value="top-recharge">
														ยอดเติมสูงสุด 30 อันดับ
													</option>
													<option value="top-lose">ยอดเสียสูงสุด 30 อันดับ</option>
												</select>
											</div>
										</div>

										<p className="top-rank">TOP RANK</p>
										<div className="slide-rank">
											<div className="slide-rank-item top1">
												<img
													className="rank-icon"
													src="/assets/icons/icon-top1.svg"
													alt=""
												/>
												<img
													className="rank-profile"
													src="/assets/images/image-top1.svg"
													alt=""
												/>
												<p className="rank-item-text">ST14526641</p>
												{/* <!-- <p className="rank-item-text">095-xxx-xxxx</p> --> */}
												<p className="rank-item-text">1,500,000 บาท</p>
											</div>
											<div className="slide-rank-item top2">
												<img
													className="rank-icon"
													src="/assets/icons/icon-top2.svg"
													alt=""
												/>
												<img
													className="rank-profile"
													src="/assets/images/image-top2.svg"
													alt=""
												/>
												<p className="rank-item-text">ST14526641</p>
												{/* <!-- <p className="rank-item-text">095-xxx-xxxx</p> --> */}
												<p className="rank-item-text">1,200,000 บาท</p>
											</div>
											<div className="slide-rank-item top3">
												<img
													className="rank-icon"
													src="/assets/icons/icon-top3.svg"
													alt=""
												/>
												<img
													className="rank-profile"
													src="/assets/images/image-top3.svg"
													alt=""
												/>
												<p className="rank-item-text">ST14526641</p>
												{/* <!-- <p className="rank-item-text">095-xxx-xxxx</p> --> */}
												<p className="rank-item-text">1,000,000 บาท</p>
											</div>
											<div className="slide-rank-item">
												<img
													className="rank-profile"
													src="/assets/images/st-vegas-logo.png"
													alt=""
												/>
												<p className="rank-item-text">ST14526641</p>
												{/* <!-- <p className="rank-item-text">095-xxx-xxxx</p> --> */}
												<p className="rank-item-text">500,000 บาท</p>
											</div>
											<div className="slide-rank-item">
												<img
													className="rank-profile"
													src="/assets/images/st-vegas-logo.png"
													alt=""
												/>
												<p className="rank-item-text">ST14526641</p>
												{/* <!-- <p className="rank-item-text">095-xxx-xxxx</p> --> */}
												<p className="rank-item-text">500,000 บาท</p>
											</div>
											<div className="slide-rank-item">
												<img
													className="rank-profile"
													src="/assets/images/st-vegas-logo.png"
													alt=""
												/>
												<p className="rank-item-text">ST14526641</p>
												{/* <!-- <p className="rank-item-text">095-xxx-xxxx</p> --> */}
												<p className="rank-item-text">500,000 บาท</p>
											</div>
											<div className="slide-rank-item">
												<img
													className="rank-profile"
													src="/assets/images/st-vegas-logo.png"
													alt=""
												/>
												<p className="rank-item-text">ST14526641</p>
												{/* <!-- <p className="rank-item-text">095-xxx-xxxx</p> --> */}
												<p className="rank-item-text">500,000 บาท</p>
											</div>
											<div className="slide-rank-item">
												<img
													className="rank-profile"
													src="/assets/images/st-vegas-logo.png"
													alt=""
												/>
												<p className="rank-item-text">ST14526641</p>
												{/* <!-- <p className="rank-item-text">095-xxx-xxxx</p> --> */}
												<p className="rank-item-text">500,000 บาท</p>
											</div>
											<div className="slide-rank-item">
												<img
													className="rank-profile"
													src="/assets/images/st-vegas-logo.png"
													alt=""
												/>
												<p className="rank-item-text">ST14526641</p>
												{/* <!-- <p className="rank-item-text">095-xxx-xxxx</p> --> */}
												<p className="rank-item-text">500,000 บาท</p>
											</div>
											<div className="slide-rank-item">
												<img
													className="rank-profile"
													src="/assets/images/st-vegas-logo.png"
													alt=""
												/>
												<p className="rank-item-text">ST14526641</p>
												{/* <!-- <p className="rank-item-text">095-xxx-xxxx</p> --> */}
												<p className="rank-item-text">500,000 บาท</p>
											</div>
										</div>

										<div className="table-rank">
											<div className="table-rank-item">
												<div className="no-rank">11</div>
												<div className="rank-detail">
													<div className="rank-phone">095-xxx-xxxx</div>
													<div className="rank-detail-title">ยอด</div>
													<div className="rank-money">351,353</div>
												</div>
											</div>
											<div className="table-rank-item">
												<div className="no-rank">12</div>
												<div className="rank-detail">
													<div className="rank-phone">095-xxx-xxxx</div>
													<div className="rank-detail-title">ยอด</div>
													<div className="rank-money">351,353</div>
												</div>
											</div>
											<div className="table-rank-item">
												<div className="no-rank">13</div>
												<div className="rank-detail">
													<div className="rank-phone">095-xxx-xxxx</div>
													<div className="rank-detail-title">ยอด</div>
													<div className="rank-money">351,353</div>
												</div>
											</div>
											<div className="table-rank-item">
												<div className="no-rank">14</div>
												<div className="rank-detail">
													<div className="rank-phone">095-xxx-xxxx</div>
													<div className="rank-detail-title">ยอด</div>
													<div className="rank-money">351,353</div>
												</div>
											</div>
											<div className="table-rank-item">
												<div className="no-rank">15</div>
												<div className="rank-detail">
													<div className="rank-phone">095-xxx-xxxx</div>
													<div className="rank-detail-title">ยอด</div>
													<div className="rank-money">351,353</div>
												</div>
											</div>
											<div className="table-rank-item">
												<div className="no-rank">16</div>
												<div className="rank-detail">
													<div className="rank-phone">095-xxx-xxxx</div>
													<div className="rank-detail-title">ยอด</div>
													<div className="rank-money">351,353</div>
												</div>
											</div>
											<div className="table-rank-item">
												<div className="no-rank">17</div>
												<div className="rank-detail">
													<div className="rank-phone">095-xxx-xxxx</div>
													<div className="rank-detail-title">ยอด</div>
													<div className="rank-money">351,353</div>
												</div>
											</div>
											<div className="table-rank-item">
												<div className="no-rank">18</div>
												<div className="rank-detail">
													<div className="rank-phone">095-xxx-xxxx</div>
													<div className="rank-detail-title">ยอด</div>
													<div className="rank-money">351,353</div>
												</div>
											</div>
											<div className="table-rank-item">
												<div className="no-rank">19</div>
												<div className="rank-detail">
													<div className="rank-phone">095-xxx-xxxx</div>
													<div className="rank-detail-title">ยอด</div>
													<div className="rank-money">351,353</div>
												</div>
											</div>
											<div className="table-rank-item">
												<div className="no-rank">20</div>
												<div className="rank-detail">
													<div className="rank-phone">095-xxx-xxxx</div>
													<div className="rank-detail-title">ยอด</div>
													<div className="rank-money">351,353</div>
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
			{/* <!-- tournament modal end --> */}

			{/* <!-- spinner modal --> */}
			<div
				className="modal fade"
				id="spinnerModal"
				tabIndex="-1"
				aria-labelledby="spinnerModalLabel"
				aria-hidden="true"
				data-bs-dismiss="modal"
			>
				<div className="modal-dialog modal-xl">
					<div className="modal-content">
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
										<p className="spinner-modal-title">แต้มทั้งหมด : 0.00</p>
										<p className="spinner-modal-subtitle">
											10 แต้ม หมุนกงล้อได้ 1 ครั้ง
										</p>
										<div className="spinner-modal-body">
											<img
												className="spinner-modal-img"
												src="/assets/images/image-spinner.svg"
												alt=""
											/>
											<button type="button" className="btn-spinner">
												หมุนกงล้อ
											</button>
											<p className="spinner-modal-subtitle2">
												เครดิตกงล้อ : 0.00
											</p>
											<input
												type="text"
												placeholder="จำนวนเงิน"
												className="input-box"
											/>
											<p className="spinner-modal-text-danger">
												แลกเงินเข้าเครดิต ขั้นต่ำ 100.00
											</p>

											<button type="button" className="button-confirm-warning">
												แลกเงินเข้าเครดิต
											</button>
											<div className="spinner-rule-container">
												<p className="spinner-rule-text">อ่านกฎกติกา</p>
												<img
													className="spinner-icon-info"
													src="/assets/icons/icon-info.svg"
													alt=""
												/>
											</div>
										</div>
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
				tabIndex="-1"
				aria-labelledby="earnMoneyModalLabel"
				aria-hidden="true"
				data-bs-dismiss="modal"
			>
				<div className="modal-dialog modal-xl">
					<div className="modal-content">
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
										<div className="earn-qr-container">
											<div className="border-input-gold">
												<div className="earn-qr-content">
													<img
														className="earn-qr-img"
														src="/assets/images/qr-code-image.svg"
														alt=""
													/>
												</div>
											</div>
										</div>

										<div className="border-input-gold">
											<div className="link-shared">
												<p className="link-shared-title">ลิ้งค์แนะนำเพื่อน</p>
												<p className="link-shared-subtitle">
													คุณจะได้รับรายได้ฟรีจากการแนะนำเพื่อน
												</p>
												<input type="text" className="link-shared-input" />

												<div className="link-shared-btn-group">
													<div className="border-input-gold border-btn">
														<button type="button" className="btn-copy-link">
															คัดลอกลิ้งค์
														</button>
													</div>
													<button type="button" className="btn-share-link">
														แชร์
													</button>
												</div>
											</div>
										</div>

										<div className="earn-menu-content">
											<div className="border-input-gold">
												<div
													className="earn-menu-item"
													data-bs-toggle="modal"
													data-bs-target="#earnMoneyDetailModal"
													data-bs-dismiss="modal"
												>
													<img
														className="earn-menu-item-img"
														src="/assets/images/img-total-plays.svg"
														alt=""
													/>
													<p className="earn-menu-item-title">ยอดเล่น</p>
													<p className="earn-menu-item-subtitle">
														ยอดเล่นของเพื่อนทั้งหมด
													</p>
												</div>
											</div>
											<div className="border-input-gold">
												<div className="earn-menu-item">
													<img
														className="earn-menu-item-img"
														src="/assets/images/img-total-lose.png"
														alt=""
													/>
													<p className="earn-menu-item-title">ยอดเสีย</p>
													<p className="earn-menu-item-subtitle">
														ยอดเสียของเพื่อนทั้งหมด
													</p>
												</div>
											</div>
											<div className="border-input-gold">
												<div className="earn-menu-item">
													<img
														className="earn-menu-item-img"
														src="/assets/images/img-total-deposit.svg"
														alt=""
													/>
													<p className="earn-menu-item-title">ยอดฝาก</p>
													<p className="earn-menu-item-subtitle">
														ยอดฝากของเพื่อนทั้งหมด
													</p>
												</div>
											</div>
											<div className="border-input-gold">
												<div className="earn-menu-item">
													<img
														className="earn-menu-item-img"
														src="/assets/icons/icon-teasure.svg"
														alt=""
													/>
													<p className="earn-menu-item-title">รับเครดิตฟรี</p>
													<p className="earn-menu-item-subtitle">
														เครดิตฟรีจากการแนะนำ
													</p>
												</div>
											</div>
											<div className="border-input-gold">
												<div className="earn-menu-item">
													<img
														className="earn-menu-item-img"
														src="/assets/images/member-suggest.png"
														alt=""
													/>
													<p className="earn-menu-item-title">สมาชิกแนะนำ</p>
													<p className="earn-menu-item-subtitle">ดูรายละเอียด</p>
												</div>
											</div>
										</div>

										<div className="read-earn-rule">
											หากมีข้อสงสัยเพิ่มเติม
											<a
												href="https://www.google.com/"
												target="_blank"
												rel="noreferrer"
											>
												อ่านกฏกติกา
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className="modal fade"
				id="earnMoneyDetailModal"
				tabIndex="-1"
				aria-labelledby="earnMoneyDetailModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-xl">
					<div className="modal-content">
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
										<div className="earn-tab-container">
											<div className="border-input-gold">
												<div className="earn-tab">
													<div
														id="earn-tab-overview"
														className="earn-tab-item active"
													>
														ภาพรวม
													</div>
													<div className="border-input-gold earn-tab-item-2">
														<div id="earn-tab-income" className="earn-tab-item">
															รายได้
														</div>
													</div>
													<div
														id="earn-tab-withdraw-income"
														className="earn-tab-item"
													>
														ถอนรายได้
													</div>
												</div>
											</div>
										</div>

										<div className="earn-detail-data" id="earn-detail-overview">
											<div className="filter-date">
												<p className="filter-label">ภาพรวมวันที่</p>
												<input
													className="filter-date-input"
													type="date"
													name=""
													id=""
												/>
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
														<div className="tr-earn">
															<span className="td-earn">1/01/66</span>
															<span className="td-earn">110</span>
															<span className="td-earn">40</span>
															<span className="td-earn">11,668</span>
														</div>
														<div className="tr-earn">
															<span className="td-earn">1/01/66</span>
															<span className="td-earn">110</span>
															<span className="td-earn">40</span>
															<span className="td-earn">11,668</span>
														</div>
														<div className="tr-earn">
															<span className="td-earn">1/01/66</span>
															<span className="td-earn">110</span>
															<span className="td-earn">40</span>
															<span className="td-earn">11,668</span>
														</div>
														<div className="tr-earn">
															<span className="td-earn">1/01/66</span>
															<span className="td-earn">110</span>
															<span className="td-earn">40</span>
															<span className="td-earn">11,668</span>
														</div>
														<div className="tr-earn">
															<span className="td-earn">1/01/66</span>
															<span className="td-earn">110</span>
															<span className="td-earn">40</span>
															<span className="td-earn">11,668</span>
														</div>
														<div className="tr-earn">
															<span className="td-earn">1/01/66</span>
															<span className="td-earn">110</span>
															<span className="td-earn">40</span>
															<span className="td-earn">11,668</span>
														</div>
														<div className="tr-earn">
															<span className="td-earn">1/01/66</span>
															<span className="td-earn">110</span>
															<span className="td-earn">40</span>
															<span className="td-earn">11,668</span>
														</div>
													</div>
												</div>
											</div>

											<div className="filter-date">
												<p className="filter-label">ภาพรวมทั้งเดือน</p>
												<select className="filter-date-input">
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
													<option value="11">11</option>
													<option value="12">12</option>
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
														<div className="tr-earn">
															<span className="td-earn">January</span>
															<span className="td-earn">10,120</span>
															<span className="td-earn">1,336</span>
															<span className="td-earn">83,550</span>
														</div>
														<div className="tr-earn">
															<span className="td-earn">January</span>
															<span className="td-earn">10,120</span>
															<span className="td-earn">1,336</span>
															<span className="td-earn">83,550</span>
														</div>
														<div className="tr-earn">
															<span className="td-earn">January</span>
															<span className="td-earn">10,120</span>
															<span className="td-earn">1,336</span>
															<span className="td-earn">83,550</span>
														</div>
														<div className="tr-earn">
															<span className="td-earn">January</span>
															<span className="td-earn">10,120</span>
															<span className="td-earn">1,336</span>
															<span className="td-earn">83,550</span>
														</div>
														<div className="tr-earn">
															<span className="td-earn">January</span>
															<span className="td-earn">10,120</span>
															<span className="td-earn">1,336</span>
															<span className="td-earn">83,550</span>
														</div>
														<div className="tr-earn">
															<span className="td-earn">January</span>
															<span className="td-earn">10,120</span>
															<span className="td-earn">1,336</span>
															<span className="td-earn">83,550</span>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="earn-detail-data" id="earn-detail-income">
											<div className="filter-date">
												<p className="filter-label">ประวัติรายได้</p>
												<div style={{ float: "right" }}>
													<input
														className="filter-date-input"
														type="date"
														name=""
														id=""
													/>
													<select className="filter-date-input">
														<option value="" />
													</select>
												</div>
											</div>

											<div className="border-input-gold">
												<div className="table-earn-date">
													<div className="border-input-gold">
														<div className="th-earn-container">
															<span className="th-earn">วัน/เวลา</span>
															<span className="th-earn">ยูสเซอร์</span>
															<span className="th-earn">ระดับขั้น</span>
															<span className="th-earn">จำนวนเงิน</span>
															<span className="th-earn">ชนิด</span>
															<span className="th-earn">หมวด</span>
														</div>
													</div>

													<div className="tr-earn-container" />
												</div>
											</div>
										</div>

										<div
											className="earn-detail-data"
											id="earn-detail-withdraw-income"
										>
											<div className="border-input-gold">
												<div className="form-withdraw-income">
													<div className="form-withdraw-group">
														<label className="form-withdraw-label">
															รายได้ปัจจุบัน
														</label>
														<input
															type="text"
															className="form-withdraw-input"
														/>
													</div>
													<div className="form-withdraw-group">
														<label className="form-withdraw-label">
															จำนวนเงินที่ต้องการถอน
														</label>
														<input
															type="text"
															placeholder="ถอนไม่มีขั้นต่ำ"
															className="form-withdraw-input"
														/>
													</div>

													<button type="button" className="btn-withdraw-income">
														ถอนรายได้
													</button>
												</div>
											</div>
											<div className="filter-date">
												<p className="filter-label">ประวัติรายได้</p>
												<input
													className="filter-date-input"
													type="date"
													name=""
													id=""
												/>
											</div>

											<div className="border-input-gold">
												<div className="table-earn-date">
													<div className="border-input-gold">
														<div className="th-earn-container">
															<span className="th-earn">วัน/เวลา</span>
															<span className="th-earn">ยูสเซอร์</span>
															<span className="th-earn">จำนวนเงิน</span>
															<span className="th-earn">สถานะ</span>
														</div>
													</div>

													<div className="tr-earn-container">
														<div className="tr-earn">
															<span className="td-earn">1/01/66</span>
															<span className="td-earn">xcczsaw</span>
															<span className="td-earn">10,120</span>
															<span className="td-earn">รับแล้ว</span>
														</div>
														<div className="tr-earn">
															<span className="td-earn">1/01/66</span>
															<span className="td-earn">xcczsaw</span>
															<span className="td-earn">10,120</span>
															<span className="td-earn">รับแล้ว</span>
														</div>
														<div className="tr-earn">
															<span className="td-earn">1/01/66</span>
															<span className="td-earn">xcczsaw</span>
															<span className="td-earn">10,120</span>
															<span className="td-earn">รับแล้ว</span>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div className="read-earn-rule">
											หากมีข้อสงสัยเพิ่มเติม
											<a
												href="https://www.google.com/"
												target="_blank"
												rel="noreferrer"
											>
												อ่านกฏกติกา
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- earn money modal end --> */}

			{/* <!-- change password modal --> */}
			<div
				className="modal fade"
				id="changePasswordModal"
				tabIndex="-1"
				aria-labelledby="changePasswordModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-border">
						<div className="modal-content">
							<div className="modal-header-container">
								<div className="modal-header">
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
											type="text"
											placeholder="กรุณากรอกรหัสผ่านเดิม"
											className="input-for-border-gold"
										/>
									</div>
									<div className="change-password-hr">
										<div className="hr" />
									</div>
									<div className="border-input-gold">
										<input
											type="text"
											placeholder="กรุณากรอกรหัสผ่านใหม่"
											className="input-for-border-gold"
										/>
									</div>
									<div className="border-input-gold">
										<input
											type="text"
											placeholder="กรุณากรอกรหัสผ่านใหม่อีกครั้ง"
											className="input-for-border-gold"
										/>
									</div>

									<button type="button" className="button-warning">
										ยืนยัน
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- change password modal end --> */}

			<footer className="footer" id="footer-desktop">
				<div className="menu-wrapper">
					<div
						className="footer-item flexCenter"
						id="footer-login-button"
						onClick={handleLoginClick}
						onKeyDown={() => ""}
					>
						<img src="/assets/icons/login-icon.svg" alt="login" />
						<p className="font-20">เข้าสู่ระบบ</p>
					</div>
					<div
						className="footer-item flexCenter"
						id="footer-signup-button"
						data-bs-toggle="modal"
						data-bs-target="#signUpModal"
					>
						<img src="/assets/icons/register-icon.svg" alt="login" />
						<p className="font-20">สมัครสมาชิก</p>
					</div>
					<div className="footer-item flexCenter">
						<img src="/assets/images/contact-admin.svg" alt="login" />
						<p className="font-20">ติดต่อ</p>
					</div>
				</div>
			</footer>

			<footer className="footer" id="footer-mobile">
				<div className="menu-wrapper">
					<a
						href="/pages/login-page-mobile.html"
						style={{ textDecoration: "none" }}
					>
						<div className="footer-item flexCenter">
							<img src="/assets/icons/login-icon.svg" alt="login" />
							<p className="font-20">เข้าสู่ระบบ</p>
						</div>
					</a>
					<a
						href="/pages/register-step1.html"
						style={{ textDecoration: "none" }}
					>
						<div className="footer-item flexCenter">
							<img src="/assets/icons/register-icon.svg" alt="login" />
							<p className="font-20">สมัครสมาชิก</p>
						</div>
					</a>
					<div className="footer-item flexCenter">
						<img src="/assets/images/contact-admin.svg" alt="login" />
						<p className="font-20">ติดต่อเรา</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

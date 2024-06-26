import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import _LoginController from "../../api/login";
import { EncriptBase64 } from '../../helper';

export default function Home() {
	const UseParams = useParams();
	const { loginPlayNow } = _LoginController();
	useEffect(() => {
		if (UseParams?.token) {
			let _res = EncriptBase64(UseParams?.token);
			if (_res?.agentCode && _res?.username && _res?.password) {
				loginPlayNow(_res?.username, _res?.password);
			}
		}
	}, [UseParams?.token])
	return (
		<div>
			<div>.</div>
			{/* <iframe src="https://wordpress.shun808.com/" title="landing page"></iframe> */}
		</div>

	);
}

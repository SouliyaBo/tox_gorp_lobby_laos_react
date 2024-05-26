import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import Constant, { AGENT_CODE } from "../constant";
import axios from "axios";

const Roulette = ({ data, setOutputSpin, username, setCurrentPoint }) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [rouletteData, setRouletteData] = useState(data);
    const [errorText, setErrorText] = useState("");

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };
    useEffect(() => {
        if (!mustSpin) {
            setOutputSpin(rouletteData[prizeNumber].completeOption)
            if (rouletteData !== "")
                randomPrice(rouletteData[prizeNumber].codeEvent);
        }
    }, [mustSpin]);

    useEffect(() => {
        const addShortString = data.map((item) => {
            return {
                completeOption: item.s_name,
                option: item.s_name,
                codeEvent: item?.s_event_code
            };
        });
        setRouletteData(addShortString);
    }, [data]);

    const randomPrice = (eventCode) => {
        let data = JSON.stringify({
            "s_username": username,
            "s_agent_code": AGENT_CODE,
            "eventCode": eventCode
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${Constant?.SERVER_URL}/LuckyWheel/RandomPrize?XDEBUG_SESSION_START=netbeans-xdebug`,
            headers: {
                'authorization-agent': '{{AUTHEN-VALUE-AGENT}}',
                'authorization-token': '{{AUTHEN-VALUE-TOKEN}}',
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                if (response.data.statusCode === 0) {
                    setCurrentPoint(response.data?.data)
                } else {
                    setErrorText(response.data.statusDesc);
                }
            })
            .catch((error) => {

                console.log("error", error);
            });

    }
    return (
        <>
            <div align="center" className="roulette-container">
                <Wheel
                    mustStartSpinning={mustSpin}
                    spinDuration={[0.2]}
                    prizeNumber={prizeNumber}
                    data={rouletteData}
                    outerBorderColor={["#ccc"]}
                    outerBorderWidth={[9]}
                    innerBorderColor={["#f2f2f2"]}
                    radiusLineColor={["tranparent"]}
                    radiusLineWidth={[4]}
                    textColors={["#f5f5f5"]}
                    textDistance={55}
                    pointerProps={rouletteData}
                    fontSize={[16]}
                    backgroundColors={[
                        "#3f297e",
                        "#175fa9",
                        "#169ed8",
                        "#239b63",
                        "#64b031",
                        "#efe61f",
                        "#f7a416",
                        "#e6471d",
                        "#dc0936",
                        "#e5177b",
                        "#be1180",
                        "#871f7f"
                    ]}
                    onStopSpinning={() => {
                        setMustSpin(false);
                    }}
                />
                <button type="button" className="btn-spinner" onClick={handleSpinClick}>หมุนกงล้อ</button>
                <div style={{ color: "red", marginTop: 10 }}>{errorText}</div>
            </div>
        </>
    );
};

export default Roulette;

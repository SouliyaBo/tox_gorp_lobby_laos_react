import axios from "axios";
import Constant from "../constant";

export const GamgeList =async (value,setdataGameList)=>{
    const _res = await axios({
        method: "post",
        url: `${Constant.SERVER_URL}/Game/ListGame`,
        data: {
            s_agent_code: Constant.AGEN_CODE,
            s_brand_code: value,
        },
    });
    if (_res?.data?.statusCode === 0) {
        setdataGameList(_res?.data?.data)
    }
}
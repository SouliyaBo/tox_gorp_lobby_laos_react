import axios from "axios";
import Constant from "../constant";

export const gets = async (url, params, handleSuccess, handleError) => {
  const _res = await axios({
    method: "post",
    url,
    // url: `${Constant.SERVER_URL}/Game/ListGame`,
    params,
    handleSuccess,
    handleError,
    // data: {
    // 	s_agent_code: Constant.AGENT_CODE,
    // 	s_brand_code: value,
    // },
  });
  if (_res?.data?.statusCode === 0) {
    handleSuccess(_res?.data?.data);
  }
};

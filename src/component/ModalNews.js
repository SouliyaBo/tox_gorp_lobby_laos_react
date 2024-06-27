import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Constant from "../constant/index";

export default function ModalNews({ handleCloseNew, showNews, data }) {
  console.log("data: ", data);
  return (
    <div>
      <Modal show={showNews} onHide={handleCloseNew} backdrop="static" keyboard={false}>
        <div className="custom-news">
          <div></div>
          <div className="news-title">{data[0]?.title}</div>
          <div className="news-next">
            1/{data?.length} <span> ดูเพิ่ม &gt;&gt;</span>
          </div>
        </div>
        <Modal.Body style={{ background: "transparent" }}>
          <img src={Constant?.SERVER_URL_IMAGE + "/images/" + data[0]?.aftterLogin[0]?.image} style={{ width: 498, height: 510 }} alt="news" />
          {/* <div className="news-body">
            {data?.length > 0 &&
              data?.map((newsList, index) => (
                <div key={index}>
                  <img
                    src={Constant?.SERVER_URL_IMAGE + "/images/" + newsList?.aftterLogin[0]?.image}
                    style={{ width: 498, height: 510 }}
                    alt="news"
                  />
                </div>
              ))}
          </div> */}
        </Modal.Body>
      </Modal>
    </div>
  );
}

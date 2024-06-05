import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Language } from "../constant/languageList";
export default function Translate({ height, width }) {
  const { t, i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState(i18n?.language);
  const [imageLanguage, setImageLanguage] = useState("");

  useEffect(() => {
    const image = Language?.filter((data) => data?.lang === i18n?.language);
    setImageLanguage(image[0]?.image);
  }, [i18n]);

  const changeLanguage = (value) => {
    i18n.changeLanguage(value?.lang);
    setActiveLanguage(value?.lang);
    setImageLanguage(value?.image);
  };
  return (
    <div>
      <DropdownButton
        variant="second"
        id="dropdown-item-button"
        // id={`dropdown-button-drop-up`}
        drop="none"
        title={<img className="round-image" style={{ height: height, width: width }} src={imageLanguage} alt="th" />}
      >
        <Dropdown.Header style={{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "#fa0" }}>{t("titleDropdown")}</Dropdown.Header>
        {Language?.map((item, index) => (
          <Dropdown.Item
            key={index}
            style={{
              background: item?.lang === activeLanguage ? "#595252" : "#433d3d",
              textDecoration: "none",
            }}
            onClick={() => changeLanguage(item)}
          >
            <img className="round-image" src={item?.image} alt="lang" />
            <span style={{ color: item?.lang === activeLanguage ? "#fa0" : "#FFF" }}>{item?.name}</span>
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
}

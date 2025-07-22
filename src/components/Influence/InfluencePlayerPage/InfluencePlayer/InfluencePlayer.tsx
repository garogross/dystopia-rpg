import React from "react";
import TitleH3 from "../../../layout/TitleH3/TitleH3";

const InfluencePlayer = () => {
  return (
    <section className="influencePlayer">
      <TitleH3>Player</TitleH3>
      <div className="influencePlayer__main">
        <div className="influencePlayer__mainInner">
          <div className="influencePlayer__mainHeader">
            <div className="influencePlayer__mainAvatar">
              <img src="" alt="" className="influencePlayer__mainAvatarImg">
                <span className="influencePlayer__mainHeaderContent">
                  <button className="influencePlayer__nameEditBtn"></button>
                  <span className="influencePlayer__dropdownArrowWrapper"></span>
                </span>
              </img>
            </div>
          </div>
          <div className="influencePlayer__mainDropdownContent">
            <div className="influencePlayer__mainDropdownContentCol">
              <span className="influencePlayer__boldText"></span>
              <span className="influencePlayer__valueText"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="influencePlayer__dropdown">
        <button className="influencePlayer__dropdownBtn">
          <span className="influencePlayer__dropdownBtnDotsline"></span>
        </button>
        <div className="influencePlayer__dropdownContent"></div>
      </div>
    </section>
  );
};

export default InfluencePlayer;

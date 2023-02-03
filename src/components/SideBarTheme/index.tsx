import React from "react";
import { Link } from "react-router-dom";
import SideBarData from "../../data/SideBarData";
import { SideBarContainer, SideBarDataGroup } from "./styled";

const SideBarTheme: React.FC = () => {
  return (
    <SideBarContainer>
      <SideBarDataGroup>
        {SideBarData.map((_item, index) => {
          return (
            <div key={index}>
              <Link to={_item.link}>{_item.title}</Link>
            </div>
          );
        })}
      </SideBarDataGroup>
    </SideBarContainer>
  );
};

export default SideBarTheme;

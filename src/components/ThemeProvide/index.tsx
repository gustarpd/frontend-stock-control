import React, { ReactNode } from "react";
import { Content, DashBoard } from "./styled";
import { HeaderTheme } from "../HeaderTheme";
import SideBarTheme from "../SideBarTheme";

interface ChildrenProp {
  children: JSX.Element;
}

const ThemeProvider = ({ children }: ChildrenProp) => {
  return (
    <div>
      <HeaderTheme />
      <DashBoard>
        <SideBarTheme />
        <Content>{children}</Content>
      </DashBoard>
    </div>
  );
};

export default ThemeProvider;

import React, { ReactNode } from "react";
import { DetailsExpanse, Main } from "./styled";

interface Props {
  children: ReactNode;
  title?: string;
}

const ContainerProvider = ({ children, title }: Props) => {
  return (
    <DetailsExpanse>
      <Main>
        <h2>{title}</h2>
        {children}
      </Main>
    </DetailsExpanse>
  );
};

export default ContainerProvider;

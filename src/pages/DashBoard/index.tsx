import React from "react";
import ContainerProvider from "../../components/ContainerProvider";
import ThemeProvider from "../../components/ThemeProvide";
import { DetailsExpanseCard, DetailsExpanseCardContainer } from "./styled";

export const DashBoard: React.FC = () => {
  return (
    <ThemeProvider>
      <ContainerProvider title="DeshBoard">
       <DetailsExpanseCardContainer>
          <DetailsExpanseCard>
            <h3>Entradas</h3>
            <h2>234, 45R$</h2>
          </DetailsExpanseCard>
          <DetailsExpanseCard>
            <h3>Saídas</h3>
            <h2>234, 45R$</h2>
          </DetailsExpanseCard>
          <DetailsExpanseCard>
            <h3>Lucro</h3>
            <h2>234, 45R$</h2>
          </DetailsExpanseCard>
          </DetailsExpanseCardContainer>
      </ContainerProvider>
    </ThemeProvider>
  );
};

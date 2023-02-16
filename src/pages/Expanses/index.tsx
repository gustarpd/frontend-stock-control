import React from "react";
import Buttons from "../../components/Button";
import ContainerProvider from "../../components/ContainerProvider";
import InputForm from "../../components/Input/Input";
import ThemeProvider from "../../components/ThemeProvide";
import {
  CreateExitContainer,
  ExitsColumn,
  ExitsTable,
  ListExits,
  TitleHeader,
} from "./styled";

const Exits: React.FC = () => {
  return (
    <ThemeProvider>
      <ContainerProvider>
        <TitleHeader>
          <h2>Saídas</h2>
          <div>Saídas: 1</div>
        </TitleHeader>
        <CreateExitContainer>
          <div>
            <label>
              Descrição
              <InputForm type="text" placeholder="Descrição" />
            </label>
            <label>
              Valor
              <InputForm type="number" />
            </label>
            <label>
              Data
              <InputForm type="date" />
            </label>
          </div>
          <Buttons text="Salvar" type="edit" />
        </CreateExitContainer>
        <ListExits>
          <h3>Buscar todas as saídas</h3>
          <div>
            <div>
              <InputForm type="date" />
              <InputForm type="date" />
            </div>
            <Buttons text="Buscar" type={"edit"} />
          </div>
        </ListExits>
        <ExitsTable>
          <div>
            <span>Descrição</span>
            <span>Valor</span>
            <span>Data</span>
            <span>Ações</span>
          </div>
          <ExitsColumn>
            <div>Conta Àgua</div>
            <div>2322R$</div>
            <div>10/02/2001</div>
            <div>
            <Buttons text="Editar" type={"edit"}></Buttons>
            <Buttons text="Deletar" type={"edit"}></Buttons>
            </div>
          </ExitsColumn>
        </ExitsTable>
      </ContainerProvider>
    </ThemeProvider>
  );
};

export default Exits;

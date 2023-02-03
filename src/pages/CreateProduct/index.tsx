import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Buttons from "../../components/Button";
import ContainerProvider from "../../components/ContainerProvider";
import ThemeProvider from "../../components/ThemeProvide";
import useRequest from "../../hooks/useRequest";
import { api } from "../../lib/axios";
import {
  AddButton,
  ColumnContent,
  ColumnHeader,
  ColumnHeaderContainer,
  InputContainer,
  TableProducts,
} from "./styled";

const CreateProduct: React.FC = () => {
  const datas = {
    name: "Cadeira gamer",
    price: 1234,
    sale_price: 1000,
    quantity: 12,
    due_date: "01/01/2009",
  };

  const { data, error, isLoading } = useQuery("product", async () => {
    const rq = api.post("/products-registration", datas)

    return rq
  });
   
  console.log(data)
  return (
    <ThemeProvider>
      <ContainerProvider title="Cadastrar produtos">
        <InputContainer>
          <input placeholder="Nome do produto" />
          <input placeholder="Preço do produto" />
          <input placeholder="Preço de venda" />
          <input placeholder="Data de vencimento" type="date" />
          <input placeholder="Quantidade" type="number" />
        </InputContainer>
        <AddButton>
          <Buttons text="Adicionar" />
        </AddButton>
        <InputContainer>
          <h2>Buscar produto</h2>
          <input placeholder="Nome do produto" type="text" />
          <Buttons text="Buscar produto" />
        </InputContainer>
        <TableProducts>
          <ColumnHeaderContainer>
            <ColumnHeader>
              <div>Nome</div>
              <div>Preço</div>
              <div>Preço de venda</div>
              <div>Quantidade</div>
              <div>Ações</div>
            </ColumnHeader>
            <ColumnContent>
              <div>Teclado games</div>
              <div>192.32</div>
              <div>100, 21</div>
              <div>4</div>
              <div>
                <span>Editar</span>
                <span>Excluir</span>
              </div>
            </ColumnContent>
          </ColumnHeaderContainer>
        </TableProducts>
      </ContainerProvider>
    </ThemeProvider>
  );
};

export default CreateProduct;

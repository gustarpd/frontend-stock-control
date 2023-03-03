import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  UseQueryResult,
} from "react-query";
import Buttons from "../../components/Button";
import ContainerProvider from "../../components/ContainerProvider";
import InputForm from "../../components/Input/Input";
import { Pagination } from "../../components/Pagination";
import ThemeProvider from "../../components/ThemeProvide";
import { useCurrentPage } from "../../hooks/usePagination";
import { api } from "../../lib/axios";
import { Exits } from "../../types/Exits";
import currencyFormatter from "../../utils/currency";
import {
  CreateExitContainer,
  ExitsColumn,
  ExitsTable,
  ExitTableHeader,
  ListExits,
  TitleHeader,
} from "./styled";

const ExitsPage = () => {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [start_date, setStartDate] = useState("2023/03/02");
  const [end_date, setEndDate] = useState("2023/03/23");
  const queryClient = new QueryClient();
  let pageSize = 3;
  const { mutate } = useMutation(
    () =>
      api.post("/create-new-exit", {
        description,
        price,
        date,
      }),
    {
      onSuccess: () => alert("Saída adicionado com sucesso"),
    }
  );

  const getExits: UseQueryResult<Exits[], unknown> = useQuery(
    "products",
    async () => {
      const request = api.get("/get-exits-expanses", {
        params: {
          start_date,
          end_date,
        },
      });
      return (await request).data;
    },
    {
      enabled: true,
    }
  );

  const { currentItems, currentPage, setCurrentPage } = useCurrentPage(
    getExits.data ? getExits.data : [],
    pageSize
  );

  const deleteExit = useMutation(
    (id: string): Promise<void> => {
      return api.delete<Exits[], void>(`/delete/exit/${id}`);
    },
    {
      onSuccess: () => {
        alert("Produto exluído com sucesso");
        queryClient.invalidateQueries("products");
      },
    }
  );

  const upDateExit = useMutation(
    (id: number) => {
      return api.put<Exits[], void>(`/update/exit/expanses/${id}`);
    },
    {
      onSuccess: () => {
        alert("Produto exluído com sucesso");
        queryClient.invalidateQueries("products");
      },
    }
  );

  useEffect(() => {
    getExits.refetch();
  }, [start_date, end_date, getExits.refetch]);

  return (
    <ThemeProvider>
      <ContainerProvider>
        <TitleHeader>
          <h2>Saídas</h2>
          <div>{`VENDAS: ${getExits.data?.length}`}</div>
        </TitleHeader>
        <CreateExitContainer>
          <div>
            <label>
              Descrição
              <InputForm
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
              />
            </label>
            <label>
              Valor
              <InputForm
                type="number"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
              />
            </label>
            <label>
              Data
              <InputForm
                type="date"
                value={date}
                onChange={(ev) => setDate(ev.target.value)}
              />
            </label>
          </div>
          <div onClick={() => mutate()}>
            <Buttons text="Salvar" type="edit" />
          </div>
        </CreateExitContainer>
        <ListExits>
          <h3>Buscar todas as saídas</h3>
          <div>
            <div>
              <InputForm
                type="date"
                value={start_date}
                onChange={(ev) => setStartDate(ev.target.value)}
              />
              <InputForm
                type="date"
                value={end_date}
                onChange={(ev) => setEndDate(ev.target.value)}
              />
            </div>
            <div>
              <Buttons text="Buscar" type={"edit"} />
            </div>
          </div>
        </ListExits>
        <ExitsTable>
          <ExitTableHeader>
            <span>Descrição</span>
            <span>Valor</span>
            <span>Data</span>
            <span>Ações</span>
          </ExitTableHeader>
          {currentItems.map((item) => {
            return (
              <ExitsColumn>
                <span>{item.description}</span>
                <span>{currencyFormatter(item.price, "BRL", "pt-BR")}</span>
                <span>{moment(item.date).format("DD/MM/YYYY")}</span>
                <div>
                  <Buttons text="Editar" type={"edit"}></Buttons>
                  <span onClick={() => deleteExit.mutate(item.id)}>
                    <Buttons text="Deletar" type={"delete"}></Buttons>
                  </span>
                </div>
              </ExitsColumn>
            );
          })}
          {/* <Pagination
            currentPage={currentPage}
            totalCount={getExits.data ? getExits.data.length : 10}
            pageSize={pageSize}
            onPageChange={(page: number) => setCurrentPage(page)}
          /> */}
        </ExitsTable>
      </ContainerProvider>
    </ThemeProvider>
  );
};

export default ExitsPage;

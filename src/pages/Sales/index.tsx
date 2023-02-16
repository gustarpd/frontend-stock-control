import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, UseQueryResult } from "react-query";
import Buttons from "../../components/Button";
import ContainerProvider from "../../components/ContainerProvider";
import { Pagination } from "../../components/Pagination";
import ThemeProvider from "../../components/ThemeProvide";
import { useCurrentPage } from "../../hooks/usePagination";
import { api } from "../../lib/axios";
import Product from "../../types/Product";
import currencyFormatter from "../../utils/currency";
import { BoxSale, SaleContainer, SaleContainerBody } from "./styled";
import { InputContainer, HeaderContainer, Container } from "./styled";

const Sales: React.FC = () => {
  const date = new Date();
  const firtDayMonth = moment(new Date(date.getFullYear(), date.getMonth(), 1)).format("YYYY/MM/DD")
  const lastDayMonth = moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format("YYYY/MM/DD")
  const [startDate, setStartDate] = useState(firtDayMonth);
  const [endDate, setEndDate] = useState(lastDayMonth);
  const [total, setTotal] = useState<any>(0)
  
  console.log("s", startDate)
  console.log("e", endDate)

  const pageSize = 3
  const getData: UseQueryResult<any> = useQuery(
    "products",
    async () => {
      const request = api.get<Product>(`/get-all-sales`, {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      return (await request).data;
    },
  );

  const { currentItems, currentPage, setCurrentPage } = useCurrentPage(
    getData.data ? getData.data : [],
    pageSize
  );

  const mutate = useMutation(
   async (id) => {
    return api.delete(`/delete/sale/${id}`)
  }, {
    onSuccess: () => alert("Venda excluída com sucesso!")
  })
  
  function SumTotalForEachSale(quantity: number, price: any) {
    if(quantity > 1) {
      return price += price
    }

    return price
  }

  useEffect(() => {
     getData.refetch()
  }, [getData.data, startDate])
  return (
    <ThemeProvider>
      <ContainerProvider>
        <Container>
          <HeaderContainer>
            <div>
              <h2>Vendas</h2>
            </div>
            <div>
              <span>{`VENDAS: ${getData.data?.length}`}</span>
            </div>
          </HeaderContainer>
          <InputContainer>
            <input placeholder="data inicial" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input placeholder="data final" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <Buttons type="edit" text="Buscar">
              Buscar
            </Buttons>
          </InputContainer>
          <SaleContainerBody>
            {currentItems?.map((item) => {
             
              return (
                <SaleContainer>
                  <div>
                    <span>{moment(item.date).format("DD/MM/YYYY")}</span>
                    <span>{currencyFormatter(SumTotalForEachSale(item.quantity, item.price), 'BRL', 'pt-BR')}</span>
                  </div>
                  <div onClick={() => mutate.mutate(item.id)}>
                    <Buttons type="delete" text="Deletar" />
                  </div>

                  <BoxSale>
                    <p>{item.name}</p>
                    <p>{item.quantity}</p>
                    <p>{currencyFormatter((item.price), 'BRL', 'pt-BR')}</p>
                  </BoxSale>
                </SaleContainer>
              );
            })}
          </SaleContainerBody>
          <Pagination
            currentPage={currentPage}
            totalCount={getData.data ? getData.data.length : 10}
            pageSize={pageSize}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </Container>
      </ContainerProvider>
    </ThemeProvider>
  );
};

export default Sales;

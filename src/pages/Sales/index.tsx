import React, { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
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
  const [startDate, setStartDate] = useState("2022/02/01");
  const [endDate, setEndDate] = useState("2022/09/01");
  const [data, setData] = useState<Product[] | undefined>([]);
  const [total, setTotal] = useState<number | undefined>(0)

  const pageSize = 3
  const getData: UseQueryResult<Product[], string> = useQuery(
    "products",
    async () => {
      const request = api.get<Product>(`/get-all-sales`, {
        params: {
          start_date: "2023-01-09",
          end_date: "2023-02-20",
        },
      });
      return (await request).data;
    },
    {
      enabled: true,
    }
  );

  const { currentItems, currentPage, setCurrentPage } = useCurrentPage(
    getData.data ? getData.data : [],
    pageSize
  );
  
  function SumTotalForEachSale(quantity: number, price: any) {
    if(quantity > 1) {
      return price += price
    }

    return price
  }

  function SumTotalForAllSale() {
    setTotal(getData.data?.reduce((total, item) => total + item.price, 0));
  }
 
  useEffect(() => {
     SumTotalForAllSale()
  }, [getData.data])
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
              <span>{`TOTAL: ${currencyFormatter(total, 'BRL', 'pt-BR')}`}</span>
            </div>
          </HeaderContainer>
          <InputContainer>
            <input placeholder="data inicial" type="date"></input>
            <input placeholder="data final" type="date"></input>
            <Buttons type="edit" text="Buscar">
              Buscar
            </Buttons>
          </InputContainer>
          <SaleContainerBody>
            {currentItems?.map((item) => {
             
              return (
                <SaleContainer>
                  <div>
                    <span>2022/02/01</span>
                    <span>{currencyFormatter(SumTotalForEachSale(item.quantity, item.price), 'BRL', 'pt-BR')}</span>
                  </div>
                  <div>
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

import React, { useEffect, useState } from "react";
import { useMutation, useQuery, UseQueryResult } from "react-query";
import Buttons from "../../components/Button";
import ContainerProvider from "../../components/ContainerProvider";
import { Input } from "../../components/Input/styled";
import { Pagination } from "../../components/Pagination";
import ThemeProvider from "../../components/ThemeProvide";
import { useCurrentPage } from "../../hooks/usePagination";
import { api } from "../../lib/axios";
import Product from "../../types/Product";
import currencyFormatter from "../../utils/currency";
import {
  BoxPagination,
  ButtonDelete,
  MakeSaleContainer,
  ProductResults,
  SelectProductInput,
} from "./styled";

const MakeSales: React.FC = () => {
  const [product, setProduct] = useState("");
  const [totalAmount, setTotal] = useState(0);
  const [qntd, setQntd] = useState<any[]>([]);

  const PageSize = 2;
  const getData: UseQueryResult<Product[], string> = useQuery(
    "products",
    async () => {
      const request = api.get<Product>(`/get-product/`, {
        params: {
          name: product,
        },
      });
      return (await request).data;
    },
  );

  const add = useMutation(
    async () => {
      console.log(productData);
      const ap = api.post("/add-sold-in", {
        data: productData,
      });

      return (await ap).data;
    },
    {
      onSuccess: () => alert("Venda confirmada!"),
    }
  );

  const { currentItems, currentPage, setCurrentPage } = useCurrentPage(
    getData.data ? getData.data : [],
    PageSize
  );

  const [productData, setproductData] = useState<Product[]>([]);
  function addProductData({ id, name, price, quantity, sale_price }: Product) {
    const productExists = productData.find((itm) => itm.id === id);

    if (productExists) {
      return alert("Produto já adicionado!");
    }

    setproductData([
      ...productData,
      {
        name,
        price,
        quantity,
        id,
        sale_price,
      },
    ]);
  }

  useEffect(() => {
    console.log("Quantidade", qntd);
    console.log("Pdata", productData);
  }, [qntd, productData]);

  function DeleteSale(id: string) {
    const deleteProduct = productData.filter((item) => item.id != id);
    setproductData([...deleteProduct]);
  }

  function increment(idx: number, type: boolean, price: number, id: string) {
    if (type) {
      productData[idx].quantity += 1;
      return setTotal((total) => total + price);
    }

    if (!type) {
      productData[idx].quantity === 0
        ? DeleteSale(id)
        : (productData[idx].quantity -= 1);
      return setTotal((total) => (total <= 0 ? 0 : total - price));
    }
  }

  function IncrementSale(
    idx: number,
    type: boolean,
    price: number,
    id: string
  ) {
    setQntd([...productData, increment(idx, type, price, id)]);
  }

  useEffect(() => {
    setTotal(productData.reduce((total, item) => total + item.price, 0));
  }, [productData]);

  useEffect(() => {
    getData.refetch();
  }, [product, getData.refetch]);
  return (
    <ThemeProvider>
      <ContainerProvider>
        <SelectProductInput>
          <div>
            <div>
              <h2>Frente de caixa</h2>
            </div>
            <div>
              <Input
                placeholder="Nome do produto"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
              <Buttons type="edit" text="Buscar" />
            </div>
          </div>
          <div>
            <p>TOTAL: {currencyFormatter(totalAmount, "BRL", "pt-BR")}</p>
          </div>
        </SelectProductInput>
        <ProductResults>
          <div>
            <span>Nome</span>
            <span>Preço</span>
            <span>Acão</span>
          </div>
          <p>
            {currentItems?.map((item, index) => {
              return (
                <div key={index}>
                  <div>{item.name}</div>
                  <div>{currencyFormatter(item.price, "BRL", "pt-BR")}</div>
                  <span
                    onClick={() => {
                      addProductData({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: 1,
                        sale_price: item.sale_price,
                      });
                    }}
                  >
                    <Buttons text="Salvar" type="edit" />
                  </span>
                </div>
              );
            })}
          </p>
        </ProductResults>
        <BoxPagination>
          <Pagination
            currentPage={currentPage}
            totalCount={getData.data ? getData.data.length : 10}
            pageSize={PageSize}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </BoxPagination>
        <MakeSaleContainer>
          {productData.length > 0 ? (
            <>
              {productData.map((item, index) => {
                return (
                  <div key={index}>
                    <p>
                      <span>Nome: {item.name}</span>
                      <span>
                        Valor: {currencyFormatter(item.price, "BRL", "pt-BR")}
                      </span>
                      <span>QTD: {item.quantity}</span>
                      <span>
                        <div
                          onClick={() =>
                            IncrementSale(index, true, item.price, item.id)
                          }
                        >
                          +
                        </div>
                        <div
                          onClick={() =>
                            IncrementSale(index, false, item.price, item.id)
                          }
                        >
                          -
                        </div>
                      </span>
                      <ButtonDelete onClick={() => DeleteSale(item.id)}>
                        x
                      </ButtonDelete>
                    </p>
                  </div>
                );
              })}
              <span onClick={() => add.mutate()}>
                <Buttons type="edit" text="Finalizar venda" />
              </span>
            </>
          ) : null}
        </MakeSaleContainer>
      </ContainerProvider>
    </ThemeProvider>
  );
};

export default MakeSales;

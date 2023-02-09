import React, { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import Buttons from "../../components/Button";
import ContainerProvider from "../../components/ContainerProvider";
import { Input } from "../../components/Input/styled";
import ThemeProvider from "../../components/ThemeProvide";
import { api } from "../../lib/axios";
import Product from "../../types/Product";
import {
  ButtonDelete,
  MakeSaleContainer,
  ProductResults,
  SelectProductInput,
} from "./styled";

const MakeSales: React.FC = () => {
  const [product, setProduct] = useState("");
  const [total, setTotal] = useState(0);
  const [qntd, setQntd] = useState<any[]>([]);

  const { refetch, data }: UseQueryResult<Product[], string> = useQuery(
    "products",
    async () => {
      const request = api.get<Product>("/get-products", {
        params: {
          name: product,
        },
      });
      return (await request).data;
    },
    {
      enabled: true,
    }
  );

  const [productData, setproductData] = useState<Product[]>([]);
  function addProductData({ id, name, price, quantity, sale_price }: Product) {
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

  function DeleteSale(id: string) {
    const deleteProductDeleted = productData.filter((item) => item.id != id);
    setproductData([...deleteProductDeleted]);
  }

  function IncrementSale(idx: number, type: boolean) {
    setQntd([
      ...productData,
      type
        ? (productData[idx].quantity += 1)
        : (productData[idx].quantity -= 1),
    ]);
  }

  useEffect(() => {
    setTotal(productData.reduce((total, item) => total + item.price, 0));
  }, [productData]);

  useEffect(() => {
    refetch();
  }, [product, refetch]);
  return (
    <ThemeProvider>
      <ContainerProvider>
        <h2>Frente de caixa</h2>
        <SelectProductInput>
          <div>
            <Input
              placeholder="Nome do produto"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
            <Buttons type="edit" text="Buscar" />
          </div>
          <div>
            <p>{`TOTAL: R$ ${Math.round(total)}`}</p>
          </div>
        </SelectProductInput>
        <ProductResults>
          <div>
            <span>Nome</span>
            <span>Preço</span>
            <span>Acão</span>
          </div>
          <p>
            {data?.map((item, index) => {
              return (
                <div key={index}>
                  <div>{item.name}</div>
                  <div>{item.price}</div>
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
        <MakeSaleContainer>
          {productData.map((item, index) => {
            return (
              <div key={index}>
                <p>
                  <span>Nome: {item.name}</span>
                  <span>Valor: {item.price}</span>
                  <span>QTD: {item.quantity}</span>
                  <span>
                    <div onClick={() => IncrementSale(index, true)}>+</div>
                    <div onClick={() => IncrementSale(index, false)}>-</div>
                  </span>
                  <ButtonDelete onClick={() => DeleteSale(item.id)}>
                    x
                  </ButtonDelete>
                </p>
              </div>
            );
          })}
          <Buttons type="edit" text="Finalizar venda" />
          <Buttons type="delete" text="Cancelar venda" />
        </MakeSaleContainer>
      </ContainerProvider>
    </ThemeProvider>
  );
};

export default MakeSales;

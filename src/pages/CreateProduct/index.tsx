import React, { SetStateAction, useEffect, useState } from "react";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import Buttons from "../../components/Button";
import ContainerProvider from "../../components/ContainerProvider";
import { Pagination } from "../../components/Pagination";
import ThemeProvider from "../../components/ThemeProvide";
import { useCurrentPage } from "../../hooks/usePagination";
import { api } from "../../lib/axios";
import Product from "../../types/Product";
import {
  AddButton,
  ColumnContent,
  ColumnHeader,
  ColumnHeaderContainer,
  InputContainer,
  TableProducts,
} from "./styled";

const CreateProduct: React.FC = () => {
  const [searchProduct, setSearchProducts] = useState("");
  const [nameProductm, setNameProduct] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [dueDate, setDueDate] = useState("");

  const { refetch, data, isLoading }: UseQueryResult<Product[] | null, string> =
    useQuery(
      "products",
      async () => {
        const request = api.get<Product>("/get-products", {
          params: {
            name: searchProduct,
          },
        });
        return (await request).data;
      },
      {
        enabled: true,
      }
    );

  const PageSize = 4;

  const { currentItems, currentPage, setCurrentPage } = useCurrentPage(
    data ? data : [],
    PageSize
  );
  const { mutate } = useMutation(
    () =>
      api.post<Product>("/products-registration", {
        name: nameProductm,
        price,
        sale_price: salePrice,
        quantity,
        due_date: dueDate,
      }),
    {
      onSuccess: () => alert("Produto adionado com sucesso"),
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch, searchProduct]);

  return (
    <ThemeProvider>
      <ContainerProvider title="Cadastrar produtos">
        <InputContainer>
          <input
            placeholder="Nome do produto"
            value={nameProductm}
            onChange={(e) => setNameProduct(e.target.value)}
          />
          <input
            placeholder="Preço do produto"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            placeholder="Preço de venda"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />
          <input
            placeholder="Data de vencimento"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <input
            placeholder="Quantidade"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </InputContainer>
        <AddButton>
          <span
            onClick={() => {
              mutate();
            }}
          >
            <Buttons text="Adicionar" />
          </span>
        </AddButton>
        <InputContainer>
          <h2>Buscar produto</h2>
          <input
            placeholder="Nome do produto"
            type="text"
            value={searchProduct}
            onChange={(e) => setSearchProducts(e.target.value)}
          />
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
            <>
              {data?.length === 0 ? <p>Nenhum produto cadastrado</p> : null}
              {!isLoading ? (
                currentItems?.map((item) => {
                  return (
                    <ColumnContent>
                      <div>{item.name}</div>
                      <div>{item.price}</div>
                      <div>{item.sale_price}</div>
                      <div>{item.quantity}</div>
                      <div>
                        <span>Editar</span>
                        <span>Excluir</span>
                      </div>
                    </ColumnContent>
                  );
                })
              ) : (
                <p>Carregando</p>
              )}
            </>
          </ColumnHeaderContainer>
        </TableProducts>
        <Pagination
          currentPage={currentPage}
          totalCount={data ? data.length : 10}
          pageSize={PageSize}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </ContainerProvider>
    </ThemeProvider>
  );
};

export default CreateProduct;

import { useEffect, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
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
  const [isEdit, setIsEdit] = useState(false);
  const [productId, setProductId] = useState("");

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

  const PageSize = 3;

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
      onSuccess: () => alert("Produto adicionado com sucesso"),
    }
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (): Promise<void> =>
      api.put<Product, void>(`/edit/product/${productId}`, {
        name: nameProductm,
        price,
        sele_price: salePrice,
        quantity,
        due_date: dueDate,
      }),
    {
      onSuccess: () => {
        alert("Produto adicionado com sucesso");
        queryClient.invalidateQueries("products");
      },
    }
  );

  const deleteProduct = useMutation(
    (id: string): Promise<void> => {
      return api.delete<Product, void>(`/delele/product/${id}`);
    },
    {
      onSuccess: () => {
        alert("Produto exluído com sucesso");
        queryClient.invalidateQueries("products");
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [searchProduct, refetch]);

  return (
    <ThemeProvider>
      <span>
        <ContainerProvider>
          <h2>{!isEdit ? "Adicionar produto" : "Editar produto"}</h2>

          <>
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
                  !isEdit ? mutate() : mutation.mutate();
                  setIsEdit(false);
                }}
              >
                <Buttons type="edit" text={isEdit ? "Editar" : "Adicionar"} />
              </span>
              <span onClick={() => setIsEdit(false)}>
                {isEdit ? <Buttons text="Cancelar" type="delete" /> : null}
              </span>
            </AddButton>

            {!isEdit ? (
              <InputContainer>
                <h2>Buscar produto</h2>
                <input
                  placeholder="Nome do produto"
                  type="text"
                  value={searchProduct}
                  onChange={(e) => setSearchProducts(e.target.value)}
                />
              </InputContainer>
            ) : null}

            {!isEdit ? (
              <>
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
                      {data?.length === 0 ? (
                        <p>Nenhum produto cadastrado</p>
                      ) : null}
                      {!isLoading || !isEdit ? (
                        currentItems?.map((item: Product) => {
                          return (
                            <ColumnContent>
                              <div>{item.name}</div>
                              <div>{item.price}</div>
                              <div>{item.sale_price}</div>
                              <div>{item.quantity}</div>
                              <div>
                                <span
                                  onClick={() => {
                                    setIsEdit(true);
                                    setProductId(item.id);
                                  }}
                                >
                                  <Buttons type="edit" text="Editar" />
                                </span>
                                <span
                                  onClick={() => {
                                    deleteProduct.mutate(item.id);
                                  }}
                                >
                                  <Buttons type="delete" text="Excluir" />
                                </span>
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
              </>
            ) : null}
          </>
        </ContainerProvider>
      </span>
    </ThemeProvider>
  );
};

export default CreateProduct;

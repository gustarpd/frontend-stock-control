interface Product {
  id: string;
  name: string;
  price: number;
  sale_price: number;
  quantity: number;
  date?: Date;
}

export default Product;

import { SideBarTypes } from "../types/SideBar";
import * as Icon from "phosphor-react";

const SideBarData: SideBarTypes[] = [
  {
    title: "DashBoard",
    link: "/",
  },
  {
    title: "Cadastro de produtos",
    link: "/newproduct",
  },
  {
    title: "Realizar venda",
    link: "/createsale",
  },
  {
    title: "Vendas",
    link: "/sales",
  },
  {
    title: "Saídas",
    link: "/exits",
  },
];

export default SideBarData;

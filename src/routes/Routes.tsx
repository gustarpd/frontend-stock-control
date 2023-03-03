import { Routes, Route } from "react-router-dom";
import CreateProduct from "../pages/CreateProduct";
import { DashBoard } from "../pages/DashBoard";
import Exits from "../pages/Expanses";
import MakeSales from "../pages/MakeSales";
import Sales from "../pages/Sales";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/newproduct" element={<CreateProduct />} />
      <Route path="/createsale" element={<MakeSales />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/exits" element={<Exits />} />
    </Routes>
  );
};

import { Routes, Route } from "react-router-dom";
import CreateProduct from "../pages/CreateProduct";
import { DashBoard } from "../pages/DashBoard";
import MakeSales from "../pages/MakeSales";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/newproduct" element={<CreateProduct />} />
      <Route path="/createsale" element={<MakeSales />} />
    </Routes>
  );
};

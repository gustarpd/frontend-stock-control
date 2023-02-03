import { Routes, Route } from "react-router-dom";
import CreateProduct from "../pages/CreateProduct";
import { DashBoard } from "../pages/DashBoard";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/newproduct" element={<CreateProduct />} />
    </Routes>
  );
};

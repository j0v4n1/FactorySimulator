import { Route, Routes } from "react-router";
import Constructions from "../constructions/constructions.tsx";
import View from "../view/view.tsx";
import Construction from "../construction/construction.tsx";
import Enterprises from "../enterprises/enterprises.tsx";
import Enterprise from "../enterprise/enterprise.tsx";
import Warehouses from "../warehouses/warehouses.tsx";
import Warehouse from "../warehouse/warehouse.tsx";
import Deposits from "../deposits/deposits.tsx";
import Deposit from "../deposit/deposit.tsx";

export default function Workflow() {
  return (
    <Routes>
      <Route path="/" element={<View />} />
      <Route path="/construction" element={<Constructions />} />
      <Route path="/construction/:id" element={<Construction />} />
      <Route path="/deposits/*" element={<Deposits />} />
      <Route path="/deposits/:id" element={<Deposit />} />
      <Route path="/enterprises" element={<Enterprises />} />
      <Route path="/enterprises/:id" element={<Enterprise />} />
      <Route path="/warehouses/*" element={<Warehouses />} />
      <Route path="/warehouses/:id" element={<Warehouse />} />
    </Routes>
  );
}

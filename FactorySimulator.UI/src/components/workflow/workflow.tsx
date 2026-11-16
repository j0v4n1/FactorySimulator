import { Routes, Route } from "react-router";
import Constructions from "../constructions/constructions.tsx";
import View from "../view/view.tsx";
import Construction from "../construction/construction.tsx";
import Enterprises from "../enterprises/enterprises.tsx";

export default function Workflow() {
  return (
    <Routes>
      <Route path="/" element={<View />} />
      <Route path="/construction" element={<Constructions />} />
      <Route path="/construction/:id" element={<Construction />} />
      <Route path="/enterprises" element={<Enterprises />} />
    </Routes>
  );
}

import { Routes, Route } from "react-router";
import Construction from "../construction/construction.tsx";
import View from "../view/view.tsx";
import ConstructionCard from "../construction-card/construction-card.tsx";
import Enterprises from "../enterprises/enterprises.tsx";

export default function Workflow() {
  return (
    <Routes>
      <Route path="/" element={<View />} />
      <Route path="/construction" element={<Construction />} />
      <Route path="/construction/:id" element={<ConstructionCard />} />
      <Route path="/enterprises" element={<Enterprises />} />
    </Routes>
  );
}

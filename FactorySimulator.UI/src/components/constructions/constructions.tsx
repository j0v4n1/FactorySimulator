import "./constructions.css";
import { NavLink } from "react-router";
import { constructionImages } from "../../data/constructionImages.ts";
import { useAppSelector } from "../../store/hook.ts";
import Badge from "react-bootstrap/Badge";
import type { Construction } from "../../store/types.ts";
import { useState } from "react";

export default function Constructions() {
  const constructions = useAppSelector(
    (state) => state.constructionsSlice.constructions,
  );
  const extractingConstructions = constructions.filter((construction) => {
    return construction.allowedEquipment.equipmentCode === "extraction";
  });
  const meltingConstructions = constructions.filter((construction) => {
    return construction.allowedEquipment.equipmentCode === "melting";
  });
  const assemblingConstructions = constructions.filter((construction) => {
    return construction.allowedEquipment.equipmentCode === "assembly";
  });
  const energyConstructions = constructions.filter((construction) => {
    return construction.allowedEquipment.equipmentCode === "energy";
  });
  const logisticsConstructions = constructions.filter((construction) => {
    return construction.allowedEquipment.equipmentCode === "logistics";
  });

  const [currentConstructions, setCurrentConstructions] =
    useState<Construction[]>(constructions);

  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "Все объекты", constructions: constructions },
    {
      id: "extraction",
      label: "Добыча",
      constructions: extractingConstructions,
    },
    {
      id: "assembly",
      label: "Производство",
      constructions: assemblingConstructions,
    },
    { id: "melting", label: "Переплавка", constructions: meltingConstructions },

    { id: "energy", label: "Энергетика", constructions: energyConstructions },
    {
      id: "logistics",
      label: "Логистика",
      constructions: logisticsConstructions,
    },
  ];

  const buttons = tabs.map((tab) => {
    return (
      <button
        key={tab.id}
        onClick={() => {
          setActiveTab(tab.id);
          setCurrentConstructions(tab.constructions);
        }}
        type="button"
        className={`btn btn-dark ${activeTab === "all" ? "mt-1 mb-1 me-1" : "m-1"} ${activeTab === tab.id ? "active" : ""}`}
      >
        {tab.label} <Badge bg="secondary">{tab.constructions.length}</Badge>
      </button>
    );
  });

  const cards = (constructions: Construction[]) =>
    constructions.map((card) => {
      return (
        <div key={card.id} className="card" style={{ width: "18rem" }}>
          <img
            src={constructionImages[card.imageKey]}
            className="card-img-top w-100 h-100 object-fit-cover"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{card.name}</h5>
            <p className="card-text">
              {new Intl.NumberFormat("ru-RU").format(card.constructionCost)} ₽
            </p>
            <NavLink
              to={`/construction/${card.id}`}
              className="btn btn-primary"
            >
              Подробнее
            </NavLink>
          </div>
        </div>
      );
    });

  return (
    <div className="wrapper">
      <div className="form-floating w-100">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder=" "
        />
        <label htmlFor="floatingInput">Поиск предприятия...</label>
      </div>
      <div className="buttons">{buttons}</div>
      <div className="cards">{cards(currentConstructions)}</div>
    </div>
  );
}

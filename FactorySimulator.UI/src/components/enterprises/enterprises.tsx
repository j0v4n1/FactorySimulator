import "./enterprises.css";
import { NavLink } from "react-router";
import { useAppSelector } from "../../store/hook.ts";
import Badge from "react-bootstrap/Badge";
import type { Enterprise } from "../../store/types.ts";
import { useState } from "react";
import { statusBadge, statusLabel } from "../../types/types.ts";

export default function Enterprises() {
  const enterprises = useAppSelector(
    (state) => state.corporationSlice.enterprises,
  );

  const [activeTab, setActiveTab] = useState("all");
  const [currentEnterprises, setCurrentEnterprises] =
    useState<Enterprise[]>(enterprises);

  const enterprisesList = (enterprises: Enterprise[]) =>
    enterprises
      .toSorted((a, b) => {
        return a.name.localeCompare(b.name, "ru", { numeric: true });
      })
      .map((enterprise) => {
        return (
          <div key={enterprise.id} className="card" style={{ width: "18 rem" }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">{enterprise.name}</h5>
                <Badge bg={statusBadge[enterprise.status]}>
                  {statusLabel[enterprise.status]}
                </Badge>
              </div>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {enterprise.recipe.name}
              </h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Оборудование</span>{" "}
                  <span className="fw-bold">
                    {enterprise.equipmentCount} ед.
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Сотрудники</span>{" "}
                  <span className="fw-bold">{enterprise.employees}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Производство</span>{" "}
                  <span className="fw-bold">
                    {enterprise.equipmentCount * 2} ед./сек.
                  </span>
                </li>
              </ul>
              <NavLink
                to={`/enterprises/${enterprise.id}`}
                className="btn btn-primary mt-5"
              >
                Подробнее
              </NavLink>
            </div>
          </div>
        );
      });

  const operationalEnterprises = enterprises.filter((enterprise) => {
    return enterprise.status === "Operational";
  });

  const underConstructionEnterprises = enterprises.filter((enterprise) => {
    return enterprise.status === "UnderConstruction";
  });

  const pausedEnterprises = enterprises.filter((enterprise) => {
    return enterprise.status === "Paused";
  });

  const noResourcesEnterprises = enterprises.filter((enterprise) => {
    return enterprise.status === "NoResources";
  });

  const tabs = [
    { id: "all", label: "Все объекты", enterprises },
    {
      id: "operational",
      label: "Работают",
      enterprises: operationalEnterprises,
    },
    {
      id: "under_construction",
      label: "Строятся",
      enterprises: underConstructionEnterprises,
    },

    { id: "paused", label: "Остановлено", enterprises: pausedEnterprises },
    {
      id: "no_resources",
      label: "Нет ресурсов",
      enterprises: noResourcesEnterprises,
    },
  ];

  const buttons = tabs.map((tab) => {
    return (
      <button
        key={tab.id}
        onClick={() => {
          setActiveTab(tab.id);
          setCurrentEnterprises(tab.enterprises);
        }}
        type="button"
        className={`btn btn-dark ${activeTab === tab.id ? "active" : ""} ${activeTab === "all" ? "mt-1 mb-1 me-1" : "m-1"}`}
      >
        {tab.label} <Badge bg="secondary">{tab.enterprises.length}</Badge>
      </button>
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
      <div className="cards enterprises">
        {enterprisesList(currentEnterprises)}
      </div>
    </div>
  );
}

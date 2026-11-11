import "./enterprises.css";
import { NavLink } from "react-router";
import { useAppSelector } from "../../store/hook.ts";

export default function Enterprises() {
  const enterprises = useAppSelector(
    (state) => state.corporationSlice.enterprises,
  );
  const enterprisesList = enterprises.map((enterprise) => {
    return (
      <div className="card" style={{ width: "18 rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{enterprise.name}</h5>
            <span className="badge text-bg-success align-self-lg-start">
              Работает
            </span>
          </div>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Добыча железной руды
          </h6>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
              <span>Оборудование</span>{" "}
              <span className="fw-bold">{enterprise.equipmentCount} ед.</span>
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
          <NavLink to="" className="btn btn-primary mt-5">
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
      <div className="buttons">
        <button type="button" className="btn btn-dark mt-1 mb-1 me-1 active">
          Все 4
        </button>
        <button type="button" className="btn btn-dark m-1">
          Работают 2
        </button>
        <button type="button" className="btn btn-dark m-1">
          Строятся 1
        </button>
        <button type="button" className="btn btn-dark m-1">
          Остановлены 1
        </button>
      </div>
      <div className="cards">{enterprisesList}</div>
    </div>
  );
}

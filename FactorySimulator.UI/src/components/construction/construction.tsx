import "./construction.css";
import { constructionImages } from "../../data/constructionImages.ts";
import { useParams } from "react-router";
import { useAppSelector } from "../../store/hook.ts";
import { useMemo, useState } from "react";
import Modal from "../modal/modal.tsx";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import type { Deposit, Recipe } from "../../store/types.ts";

export default function Construction() {
  const { id } = useParams();

  const recipePopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">ВНИМАНИЕ!</Popover.Header>
      <Popover.Body>Перед строительством надо выбрать рецепт!</Popover.Body>
    </Popover>
  );

  const depositPopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">ВНИМАНИЕ!</Popover.Header>
      <Popover.Body>
        Перед строительством надо выбрать месторождение!
      </Popover.Body>
    </Popover>
  );

  const buildButton = () => {
    if (recipe === null) {
      return (
        <OverlayTrigger
          trigger="click"
          placement="left"
          overlay={recipePopover}
        >
          <Button variant="primary">Построить</Button>
        </OverlayTrigger>
      );
    } else if (deposit === null) {
      return (
        <OverlayTrigger
          trigger="click"
          placement="left"
          overlay={depositPopover}
        >
          <Button variant="primary">Построить</Button>
        </OverlayTrigger>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-content="Выберите рецепт"
        >
          Построить
        </button>
      );
    }
  };

  const [employees, setEmployees] = useState(10);
  const [equipmentCount, setEquipment] = useState(10);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [deposit, setDeposit] = useState<Deposit | null>(null);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("ru-RU").format(value);

  const constructions = useAppSelector(
    (state) => state.constructionsSlice.constructions,
  );
  const equipments = useAppSelector(
    (state) => state.equipmentsSlice.equipments,
  );
  const construction = constructions.find((item) => {
    return item.id === id;
  });
  const currentEquipment = equipments.find(
    (item) => item.code === construction?.allowedEquipment.equipmentCode,
  );
  const deposits = useAppSelector((state) => state.gameSlice.deposits);
  const filteredDeposits = useMemo(() => {
    if (!recipe) return [];
    return deposits.filter(
      (d) =>
        d.isLeased &&
        !d.enterpriseId &&
        d.resource.id === recipe.outputResourceCode.id,
    );
  }, [recipe, deposits]);
  const noAvailableDeposits = (
    <li>
      <button type="button" className="dropdown-item">
        Нет доступных месторождений
      </button>
    </li>
  );

  if (!construction || !currentEquipment) {
    return <p>Ошибка поиска предприятия или оборудования</p>;
  }
  const allowedRecipes = construction.allowedRecipes.map((recipe) => {
    return (
      <li key={recipe.code}>
        <button
          onClick={() => {
            setRecipe(recipe);
            setDeposit(null);
          }}
          type="button"
          className="dropdown-item"
        >
          {recipe.name}
        </button>
      </li>
    );
  });

  return (
    <div className="card w-100 me-3 mb-3 mt-3">
      <div className="card-header d-flex justify-content-between">
        {construction.name}
        <span className="badge text-bg-success">Доступен</span>
      </div>
      <img
        style={{
          height: "calc(100vh - 286px)",
          objectFit: "cover",
          objectPosition: "50% 40%",
        }}
        src={constructionImages[construction.imageKey]}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <p className="card-text">{construction.description}</p>

        <label htmlFor="employees" className="form-label">
          Количество сотрудников: {employees}
        </label>
        <input
          type="range"
          className="form-range"
          min={construction.minEmployees}
          max={construction.maxEmployees}
          value={employees}
          id="employees"
          onChange={(e) => setEmployees(Number(e.target.value))}
        />

        <label htmlFor="equipment" className="form-label">
          Количество оборудования: {equipmentCount}
        </label>
        <input
          type="range"
          className="form-range"
          min={construction.allowedEquipment.minCount}
          max={construction.allowedEquipment.maxCount}
          value={equipmentCount}
          id="equipment"
          onChange={(e) => setEquipment(Number(e.target.value))}
        />
        <div className="dropdown mt-3 mb-3 dropend">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {recipe ? recipe.name : "Выберите рецепт"}
          </button>
          <ul className="dropdown-menu">{allowedRecipes}</ul>
        </div>
        <div className="dropdown mt-3 mb-3 dropend">
          <button
            disabled={recipe === null}
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {deposit ? deposit.name : "Выберите месторождение"}
          </button>
          <ul className="dropdown-menu">
            {filteredDeposits.length > 0
              ? filteredDeposits.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setDeposit(item)}
                      type="button"
                      className="dropdown-item"
                    >
                      {item.name}
                    </button>
                  </li>
                ))
              : noAvailableDeposits}
          </ul>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <span className="fw-bold">Показатель</span>{" "}
            <span className="fw-bold">Значение</span>
          </li>

          <li className="list-group-item d-flex justify-content-between">
            <span>Стоимость 1 оборудования</span>{" "}
            <span>{formatNumber(currentEquipment.unitCost)} ₽</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Производительность</span>{" "}
            <span>
              {currentEquipment.productionPerSecond * equipmentCount} шт/ч
            </span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Энергопотребление</span>{" "}
            <span>
              {currentEquipment.powerConsumption * equipmentCount} кВт
            </span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Содержание</span>{" "}
            <span>{formatNumber(35000 * employees)} ₽/месяц</span>
          </li>
        </ul>
        <div className="d-flex justify-content-between mt-3 border-top pt-3">
          <span>
            Итоговая стоимость{" "}
            {formatNumber(
              construction.constructionCost +
                equipmentCount * currentEquipment.unitCost,
            )}{" "}
            ₽
          </span>
          {buildButton()}
          {recipe && (
            <Modal
              employees={employees}
              equipment={currentEquipment}
              equipmentCount={equipmentCount}
              maintenance={35000 * employees}
              powerConsumption={
                currentEquipment.powerConsumption * equipmentCount
              }
              production={currentEquipment.productionPerSecond * equipmentCount}
              totalCost={
                construction.constructionCost +
                equipmentCount * currentEquipment.unitCost
              }
              constructionId={construction.id}
              recipe={recipe}
              depositId={deposit !== null ? deposit.id : ""}
              setDeposit={setDeposit}
              setRecipe={setRecipe}
            />
          )}
        </div>
      </div>
    </div>
  );
}

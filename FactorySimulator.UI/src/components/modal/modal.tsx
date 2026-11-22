import "./modal.css";
import api from "../../utils/api.ts";
import { useRef } from "react";
import { useAppDispatch } from "../../store/hook.ts";
import { addEnterprise } from "../../store/slices/corporation-slice.ts";
import type { Equipment, Recipe } from "../../store/types.ts";
import { formatNumber } from "../../utils/common-fn.ts";

type ModalProps = {
  employees: number;
  equipmentCount: number;
  equipment: Equipment;

  maintenance: number;
  powerConsumption: number;
  production: number;
  totalCost: number;
  constructionCode: string;
  recipe: Recipe | string;
};

export default function Modal({
  employees,
  equipment,
  equipmentCount,
  maintenance,
  powerConsumption,
  production,
  totalCost,
  constructionCode,
  recipe,
}: ModalProps) {
  const dispatch = useAppDispatch();

  const modalRef = useRef<HTMLDivElement>(null);

  const buildEnterprise = () => {
    if (typeof recipe !== "string") {
      const updatedRecipe = {
        name: recipe.name,
        code: recipe.code,
        inputs: recipe.inputs,
        outputResourceCode: recipe.outputResourceCode.code,
      };
      api
        .post("/api/constructions/build", {
          constructionCode,
          equipmentCount,
          employees,
          recipe: updatedRecipe,
          equipment,
        })
        .then((response) => {
          dispatch(addEnterprise(response.data));
          if (modalRef.current) {
            modalRef.current
              .querySelector<HTMLButtonElement>('[data-bs-dismiss="modal"]')
              ?.click();
          }
        })
        .catch(() => {
          // Ошибка уже выведена в консоль глобальным интерцептором
        });
    }
  };

  return (
    <div
      ref={modalRef}
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Подтверждение строительства
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              Рецепт: {typeof recipe === "string" ? recipe : recipe.name}
            </div>
            <div>Количество сотрудников: {employees}</div>
            <div>Количество оборудования: {equipmentCount}</div>
            <div>
              Ежемесячное содержание предприятия: {formatNumber(maintenance)}{" "}
              ₽/месяц
            </div>
            <div>Энергопотребление: {powerConsumption} кВт</div>
            <div>Производительность: {production} шт/ч</div>
            <div>Итоговая стоимость: {formatNumber(totalCost)} ₽</div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Отменить
            </button>
            <button
              onClick={buildEnterprise}
              type="submit"
              className="btn btn-primary"
            >
              Начать строительство
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

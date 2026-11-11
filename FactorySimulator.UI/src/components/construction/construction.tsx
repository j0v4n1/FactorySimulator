import "./construction.css";
import { NavLink } from "react-router";
import { constructionImages } from "../../data/constructionImages.ts";
import { useAppSelector } from "../../store/hook.ts";

export default function Construction() {
  const constructions = useAppSelector(
    (state) => state.constructionsSlice.constructions,
  );

  const cards = constructions.map((card) => {
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
          <NavLink to={`/construction/${card.id}`} className="btn btn-primary">
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
          Все объекты
        </button>
        <button type="button" className="btn btn-dark m-1">
          Добыча
        </button>
        <button type="button" className="btn btn-dark m-1">
          Производство
        </button>
        <button type="button" className="btn btn-dark m-1">
          Энергетика
        </button>
        <button type="button" className="btn btn-dark m-1">
          Логистика
        </button>
      </div>
      <div className="cards">{cards}</div>
    </div>
  );
}

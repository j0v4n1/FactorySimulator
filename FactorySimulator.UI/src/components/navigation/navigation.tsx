import "./navigation.css";
import { NavLink } from "react-router";

export default function Navigation() {
  return (
    <ul className="list-group">
      <ul
        className="list-group"
        style={{ width: "200px", marginRight: "20px" }}
      >
        <li className="list-item">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `btn btn-dark btn--width ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-columns-gap"></i> Обзор
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink
            to="/enterprises"
            className={({ isActive }) =>
              `btn btn-dark btn--width ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-buildings"></i> Предприятия
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink
            to="/construction"
            className={({ isActive }) =>
              `btn btn-dark btn--width ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-hammer"></i> Строительство
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink
            to="/deposits"
            className={({ isActive }) =>
              `btn btn-dark btn--width ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-image-alt"></i> Месторождения
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink
            to="/logistics"
            className={({ isActive }) =>
              `btn btn-dark btn--width ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-truck"></i> Логистика
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink
            to="/warehouses"
            className={({ isActive }) =>
              `btn btn-dark btn--width ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-box-seam"></i> Склады
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink
            to="/energy"
            className={({ isActive }) =>
              `btn btn-dark btn--width ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-lightning-charge-fill"></i> Энергетика
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink
            to="/finance"
            className={({ isActive }) =>
              `btn btn-dark btn--width ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-currency-exchange"></i> Финансы
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink
            to="/research"
            className={({ isActive }) =>
              `btn btn-dark btn--width ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-flask"></i> Исследования
          </NavLink>
        </li>

        <li className="list-item">
          <NavLink
            to="/mail"
            className={({ isActive }) =>
              `btn btn-dark btn--width ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-envelope"></i> Почта
          </NavLink>
        </li>
      </ul>
    </ul>
  );
}

import "./warehouses.css";
import { Badge, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink, Route, Routes, useLocation } from "react-router";
import WarehousesList from "../warehouses-list/warehouses-list";
import AddWarehouseForm from "../add-warehouse-form/add-warehouse-form";
import { useAppSelector } from "../../store/hook.ts";
import { convertNumToLocale } from "../../utils/common-fn.ts";

export default function Warehouses() {
  const location = useLocation();
  const isAddPage = location.pathname.endsWith("/add");
  const warehousesCount = useAppSelector(
    (state) => state.corporationSlice.warehouses.length,
  );
  const convertWord = (count: number): string => {
    const rules = new Intl.PluralRules("ru-RU");
    const category = rules.select(Math.abs(count));
    switch (category) {
      case "one":
        return "склад работает";
      case "few":
        return "склада работают";
      default:
        return "складов работает";
    }
  };
  const warehouses = useAppSelector(
    (state) => state.corporationSlice.warehouses,
  );
  const totalCapacity = warehouses.reduce((acc, el) => el.capacity + acc, 0);
  const totalRent = warehouses
    .filter((el) => el.type === "rent")
    .reduce((acc, el) => el.rentPrice + acc, 0);
  let totalOccupied = 0;
  warehouses.forEach((w) => {
    totalOccupied += w.items.reduce((acc, el) => {
      return acc + el.amount;
    }, 0);
  });
  return (
    <div className="warehouse">
      <div className="warehouse__header d-flex justify-content-between align-items-center">
        <h2>Складское хозяйство</h2>
        <Badge bg="success">
          {warehousesCount} {convertWord(warehousesCount)}
        </Badge>
      </div>
      <Container className="mt-3 warehouse__grid">
        <Row>
          <Col>Общая вместимость</Col>
          <Col>Занято</Col>
        </Row>
        <Row>
          <Col>{convertNumToLocale(totalCapacity)} ед.</Col>
          <Col>{convertNumToLocale(totalOccupied)} ед.</Col>
        </Row>
        <Row className="mt-3">
          <Col>Свободно</Col>
          <Col>Общие расходы на аренду</Col>
        </Row>
        <Row>
          <Col>{convertNumToLocale(totalCapacity - totalOccupied)}</Col>
          <Col>{convertNumToLocale(totalRent)} ₽ за игровой месяц</Col>
        </Row>
      </Container>
      <Routes>
        <Route path="/" element={<WarehousesList />} />
        <Route path="add" element={<AddWarehouseForm />} />
      </Routes>
      {isAddPage ? null : (
        <NavLink to="add">
          <Button className="w-100 mb-3" size="lg" variant="dark">
            Добавить склад
          </Button>
        </NavLink>
      )}
    </div>
  );
}

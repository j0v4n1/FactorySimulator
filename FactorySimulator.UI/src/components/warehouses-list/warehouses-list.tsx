import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Badge, Button } from "react-bootstrap";
import { useAppSelector } from "../../store/hook.ts";
import {
  warehouseSizeLabels,
  warehouseTypeLabels,
} from "../../variables/variables.ts";
import { NavLink } from "react-router";

export default function WarehousesList() {
  const warehouses = useAppSelector(
    (state) => state.corporationSlice.warehouses,
  );
  const warehousesList = warehouses
    .toSorted((a, b) => {
      return a.name.localeCompare(b.name, "ru", { numeric: true });
    })
    .map((warehouse) => {
      return (
        <Card key={warehouse.id} className="mt-3 mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Card.Title>{warehouse.name}</Card.Title>
              <Badge bg="success">работает</Badge>
            </div>
            <Card.Subtitle as="div" className="mb-3 text-muted">
              {warehouseTypeLabels[warehouse.type]}{" "}
              {warehouseSizeLabels[warehouse.size]}
            </Card.Subtitle>
            <Card.Text as="div" className="w-100">
              <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                <Card.Subtitle as="div">Занятость</Card.Subtitle>
                <Card.Subtitle as="div">
                  {" "}
                  {warehouse.items.reduce((acc, el) => {
                    return acc + el.amount;
                  }, 0)}{" "}
                  / {warehouse.capacity.toLocaleString("ru-RU")} ед.
                </Card.Subtitle>
              </div>
              <ProgressBar
                now={Math.round(
                  (warehouse.items.reduce((acc, el) => {
                    return acc + el.amount;
                  }, 0) /
                    warehouse.capacity) *
                    100,
                )}
              />
              <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                {warehouse.type === "rent" ? (
                  <>
                    <Card.Subtitle as="div">Аренда</Card.Subtitle>
                    <Card.Subtitle as="div">
                      {warehouse.rentPrice?.toLocaleString("ru-RU") +
                        " ₽ / месяц"}
                    </Card.Subtitle>
                  </>
                ) : null}
              </div>
            </Card.Text>
            <NavLink to={warehouse.id}>
              <Button className="w-100 mb-3" size="lg" variant="primary">
                Подробнее
              </Button>
            </NavLink>
          </Card.Body>
        </Card>
      );
    });

  return (
    <div className="warehouse__warehouse-list mt-3 mb-3">
      <h2>Мои склады</h2>
      {warehousesList}
    </div>
  );
}

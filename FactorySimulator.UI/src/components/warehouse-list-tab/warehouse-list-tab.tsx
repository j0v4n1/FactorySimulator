import Card from "react-bootstrap/esm/Card";
import { Badge, Button } from "react-bootstrap";
import {
  warehouseSizeLabels,
  warehouseTypeLabels,
} from "../../variables/variables.ts";
import ProgressBar from "react-bootstrap/esm/ProgressBar";
import type { Warehouse } from "../../store/types.ts";
import { NavLink } from "react-router";

type WarehouseListTabProps = {
  warehouse: Warehouse;
};

export default function WarehouseListTab({ warehouse }: WarehouseListTabProps) {
  const totalOccupied = warehouse?.items.reduce((acc, el) => {
    return acc + el.amount;
  }, 0);
  return (
    <Card className="mt-3 mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title>{warehouse.name}</Card.Title>
          <Badge bg="success">работает</Badge>
        </div>
        <Card.Subtitle className="mb-3  text-start">
          {warehouseTypeLabels[warehouse.type]}{" "}
          {warehouseSizeLabels[warehouse.size]}
        </Card.Subtitle>
        <Card.Text as="div" className="w-100">
          <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
            <Card.Subtitle>Занятость</Card.Subtitle>
            <Card.Subtitle>
              {" "}
              {totalOccupied} / {warehouse.capacity.toLocaleString("ru-RU")} ед.
            </Card.Subtitle>
          </div>
          <ProgressBar
            now={Math.round((totalOccupied / warehouse.capacity) * 100)}
          />
          <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
            {warehouse.type === "rent" ? (
              <>
                <Card.Subtitle>Аренда</Card.Subtitle>
                <Card.Subtitle>
                  {warehouse.rentPrice?.toLocaleString("ru-RU") + " ₽ / месяц"}
                </Card.Subtitle>
              </>
            ) : null}
          </div>
        </Card.Text>
        <NavLink to={`/warehouses/${warehouse.id}`}>
          <Button className="w-100 mb-3" size="lg" variant="primary">
            Подробнее
          </Button>
        </NavLink>
      </Card.Body>
    </Card>
  );
}

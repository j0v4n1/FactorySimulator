import Card from "react-bootstrap/Card";
import { useParams } from "react-router";
import { useAppSelector } from "../../store/hook.ts";
import { Badge, Table } from "react-bootstrap";
import type { Distance } from "../../store/types.ts";
import { formatNumber } from "../../utils/common-fn.ts";

export default function Warehouse() {
  const { id } = useParams();
  const warehouses = useAppSelector(
    (state) => state.corporationSlice.warehouses,
  );
  const warehouse = warehouses.find((w) => w.id === id);
  if (warehouse === undefined) {
    return <h1> СКЛАДА НЕТ</h1>;
  }
  const totalOccupied = warehouse?.items.reduce((acc, el) => {
    return acc + el.amount;
  }, 0);

  const DISTANCE_LABELS: Record<Distance, string> = {
    near: "близко",
    medium: "на средней удаленности",
    far: "далеко",
  };
  function getWarehouseDistanceText(distance: Distance): string {
    return `Склад находится ${DISTANCE_LABELS[distance]} от предприятия`;
  }
  const resources = warehouse.items.map((item, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.resource.name}</td>
        <td>{item.amount}</td>
        <td>Изменений нет</td>
      </tr>
    );
  });
  return (
    warehouse && (
      <Card className="w-100">
        <Card.Header className="d-flex justify-content-between">
          <div>Склад {warehouse.name.match(/№\d+$/)?.[0]}</div>
          <Badge bg="success">работает</Badge>
        </Card.Header>
        <Card.Body>
          <Card.Title>{warehouse.name.replace(/\s*№\d+$/, "")}</Card.Title>
          <div>{getWarehouseDistanceText(warehouse.distance)}</div>
          <Card.Text>
            <div className="w-100 d-flex justify-content-between mb-1 mt-3">
              <span>Вместимость</span> <span>Занято</span>
            </div>
            <div className="w-100 d-flex justify-content-between mb-3 fs-4">
              <span>{formatNumber(warehouse.capacity)} ед.</span>{" "}
              <span>{totalOccupied}</span>
            </div>
            <div className="w-100 d-flex justify-content-between mb-1 mt-3">
              <span>Свободно</span> <span>Содержание</span>
            </div>
            {warehouse.type === "rent" ? (
              <div className="w-100 d-flex justify-content-between mb-3 fs-4">
                <span>
                  {formatNumber(warehouse.capacity - totalOccupied)} ед.
                </span>{" "}
                <span>{formatNumber(warehouse.rentPrice)} ₽/мес.</span>
              </div>
            ) : null}
            <div></div>
          </Card.Text>
          <Card.Text className="mt-5">
            <Card.Title>Запасы ресурсов</Card.Title>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ресурс</th>
                  <th>Количество</th>
                  <th>Изменение</th>
                </tr>
              </thead>
              <tbody>{resources}</tbody>
            </Table>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  );
}

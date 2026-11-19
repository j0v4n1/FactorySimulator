import "./add-warehouse-form.css";
import Card from "react-bootstrap/Card";
import { Button, Form } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { useAppSelector } from "../../store/hook.ts";
import type { WarehouseType } from "../../store/types.ts";
import api from "../../utils/api.ts";

export default function AddWarehouseForm() {
  //
  const [currentWarehouse, setCurrentWarehouse] = useState<string | null>(null);
  const [distanceFromEnterprise, setDistanceFromEnterprise] = useState(1);
  const [currentWarehouseType, setCurrentWarehouseType] = useState<
    "rent" | "owned"
  >("rent");
  //
  const warehouses = useAppSelector((state) => state.gameSlice.warehouses);
  const selectedWarehouse = warehouses.find(
    (warehouse) => warehouse.id === currentWarehouse,
  );
  const distanceLabels: Record<number, string> = {
    1: "Близко",
    2: "Средняя удалённость",
    3: "Далеко",
  };
  const distancePrice: Record<string, number> = {
    Близко: 1.0,
    "Средняя удалённость": 0.7,
    Далеко: 0.5,
  };
  const convertDistance = (distance: string): string => {
    switch (distance) {
      case "Близко":
        return "near";
      case "Средняя удалённость":
        return "medium";
      case "Далеко":
        return "far";
      default:
        throw new Error("Неизвестная удалённость");
    }
  };
  const rentWarehouses = warehouses.filter((warehouse) => {
    return warehouse.type === "rent";
  });
  const ownedWarehouses = warehouses.filter((warehouse) => {
    return warehouse.type === "owned";
  });
  const calculatedRent =
    selectedWarehouse?.rentPrice! *
    distancePrice[distanceLabels[distanceFromEnterprise]];
  const buildOrRentWarehouse = () => {
    console.log({
      id: selectedWarehouse?.id,
      warehouseTypeCode: selectedWarehouse?.type,
      enterpriseId: null,
      rentPrice: selectedWarehouse?.type === "rent" ? calculatedRent : null,
      warehousePrice: selectedWarehouse?.constructionCost,
      capacity: selectedWarehouse?.capacity,
      name: selectedWarehouse?.name,
      distance: convertDistance(distanceLabels[distanceFromEnterprise]),
    });
    api
      .post("api/warehouses/build", {
        id: selectedWarehouse?.id,
        warehouseTypeCode: selectedWarehouse?.type,
        enterpriseId: null,
        rentPrice: selectedWarehouse?.type === "rent" ? calculatedRent : null,
        warehousePrice: selectedWarehouse?.constructionCost,
        capacity: selectedWarehouse?.capacity,
        name: selectedWarehouse?.name,
        distance: convertDistance(distanceLabels[distanceFromEnterprise]),
      })
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        // Ошибка уже выведена в консоль глобальным интерцептором
      });
  };

  const warehousesCards = (warehouses: WarehouseType[]) =>
    warehouses.map((warehouse) => (
      <Card
        onClick={() => {
          const defaultDistance = 1;
          setDistanceFromEnterprise(defaultDistance);
          setCurrentWarehouse(warehouse.id);
        }}
        key={warehouse.id}
        style={{ cursor: "pointer" }}
        className={`mb-3 add-warehouse-form ${currentWarehouse === warehouse.id ? "add-warehouse-form--active" : ""}`}
      >
        <Card.Body>
          <Card.Title>{warehouse.name}</Card.Title>
          <div className="d-flex justify-content-between"></div>
          {warehouse.type === "rent" ? warehouse.benefit : null}
          <Container>
            <Row className="d-flex justify-content-between mb-3">
              <Col className="p-0" xs="auto">
                Вместительность
              </Col>
              <Col className="p-0" xs="auto">
                {warehouse.capacity.toLocaleString("ru-RU")} ед.
              </Col>
            </Row>
            <Row className="d-flex justify-content-between">
              <Col className="p-0" xs="auto">
                {warehouse.type === "rent"
                  ? "Арендная плата"
                  : "Стоимость покупки"}
              </Col>
              {warehouse.type === "rent" ? (
                <Col className="p-0" xs="auto">
                  {warehouse.rentPrice!.toLocaleString("ru-RU")} р/мес.
                </Col>
              ) : (
                <Col className="p-0" xs="auto">
                  {warehouse.constructionCost!.toLocaleString("ru-RU")} р.
                </Col>
              )}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    ));

  return (
    <div>
      <h2 className="mt-3 mb-3">Новый склад</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item
          onClick={() => {
            setCurrentWarehouseType("rent");
          }}
          eventKey="0"
        >
          <Accordion.Header>Арендовать склад</Accordion.Header>
          <Accordion.Body>{warehousesCards(rentWarehouses)}</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item
          onClick={() => {
            setCurrentWarehouseType("owned");
          }}
          eventKey="1"
        >
          <Accordion.Header>Построить склад</Accordion.Header>
          <Accordion.Body>{warehousesCards(ownedWarehouses)}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Form.Label className="mt-5 w-100">
        <div className="d-flex justify-content-between">
          Удалённость от предприятия: {distanceLabels[distanceFromEnterprise]}
          <div>
            Итого:{" "}
            {selectedWarehouse?.type === "rent"
              ? calculatedRent.toLocaleString("ru-RU") + " р/мес."
              : selectedWarehouse?.constructionCost!.toLocaleString("ru-RU") +
                " р"}{" "}
          </div>
        </div>
      </Form.Label>
      <Form.Range
        style={{ marginLeft: 1 }}
        disabled={currentWarehouse === null}
        value={distanceFromEnterprise}
        id="distance_from_enterprise"
        onChange={(e) => {
          setDistanceFromEnterprise(Number(e.target.value));
        }}
        min={1}
        max={3}
      />
      <Button
        onClick={buildOrRentWarehouse}
        className="w-100 mt-3"
        disabled={currentWarehouse === null}
        size="sm"
      >
        {currentWarehouseType === "rent" ? "Арендовать" : "Построить"}
      </Button>
    </div>
  );
}

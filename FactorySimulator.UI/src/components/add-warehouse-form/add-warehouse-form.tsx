import "./add-warehouse-form.css";
import Card from "react-bootstrap/Card";
import { Button, Form } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook.ts";
import type { WarehouseType } from "../../store/types.ts";
import api from "../../utils/api.ts";
import { addWarehouse } from "../../store/slices/corporation-slice.ts";
import {
  changeStatusIsLoading,
  closeModal,
  openModal,
} from "../../store/slices/ui-slice.ts";
import AppModal from "../app-modal/app-modal.tsx";
import ConfirmAddWarehouse from "../confirm-add-warehouse/confirm-add-warehouse.tsx";
import { convertDistance } from "../../utils/common-fn.ts";
import { useSearchParams } from "react-router";

export default function AddWarehouseForm() {
  const [activeKey, setActiveKey] = useState<string | null>("0");
  const [currentWarehouse, setCurrentWarehouse] = useState<string | null>(null);
  const [distanceFromEnterprise, setDistanceFromEnterprise] = useState(1);
  const [currentWarehouseType, setCurrentWarehouseType] = useState<
    "rent" | "owned"
  >("rent");
  const dispatch = useAppDispatch();
  const warehouses = useAppSelector((state) => state.gameSlice.warehouses);
  const enterprises = useAppSelector(
    (state) => state.corporationSlice.enterprises,
  );
  const selectedWarehouse = warehouses.find(
    (warehouse) => warehouse.id === currentWarehouse,
  );
  const [searchParams] = useSearchParams();
  const enterpriseId = searchParams.get("enterpriseId");
  const validEnterpriseId = enterprises.some((e) => e.id === enterpriseId)
    ? enterpriseId
    : null;

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

  const rentWarehouses = warehouses
    .filter((warehouse) => {
      return warehouse.type === "rent";
    })
    .sort((a, b) => a.capacity - b.capacity);
  const ownedWarehouses = warehouses
    .filter((warehouse) => {
      return warehouse.type === "owned";
    })
    .sort((a, b) => a.capacity - b.capacity);
  const calculatedRent =
    selectedWarehouse?.rentPrice! *
    distancePrice[distanceLabels[distanceFromEnterprise]];
  const warehouseApiData = {
    id: selectedWarehouse?.id,
    code: selectedWarehouse?.code,
    name: selectedWarehouse?.name,
    size: selectedWarehouse?.size,
    type: selectedWarehouse?.type,
    enterpriseId: validEnterpriseId,
    rentPrice: selectedWarehouse?.type === "rent" ? calculatedRent : null,
    buildPrice: selectedWarehouse?.buildPrice,
    capacity: selectedWarehouse?.capacity,
    distance: convertDistance(distanceLabels[distanceFromEnterprise]),
  };
  const buildOrRentWarehouse = async () => {
    dispatch(changeStatusIsLoading(true));
    try {
      const res = await api.post("api/warehouses/build", warehouseApiData);
      dispatch(addWarehouse(res.data));
      dispatch(closeModal());
    } catch {
      // Ошибка уже выведена в консоль глобальным интерцептором
    }
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
                  {warehouse.buildPrice!.toLocaleString("ru-RU")} р.
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
      <Accordion
        activeKey={activeKey}
        onSelect={(eventKey) => {
          const nextKey = typeof eventKey === "string" ? eventKey : null;
          setActiveKey(nextKey);
          if (nextKey === null || nextKey !== activeKey) {
            setCurrentWarehouse(null);
            setDistanceFromEnterprise(1);
          }
          if (nextKey === "0") setCurrentWarehouseType("rent");
          if (nextKey === "1") setCurrentWarehouseType("owned");
        }}
        defaultActiveKey="0"
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Арендовать склад</Accordion.Header>
          <Accordion.Body>{warehousesCards(rentWarehouses)}</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Построить склад</Accordion.Header>
          <Accordion.Body>{warehousesCards(ownedWarehouses)}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {currentWarehouseType === "rent" ? (
        <>
          <Form.Label className="mt-5 w-100">
            <div className="d-flex justify-content-between">
              Удалённость от предприятия:{" "}
              {distanceLabels[distanceFromEnterprise]}
              <div>
                Итого:{" "}
                {selectedWarehouse?.type === "rent"
                  ? calculatedRent.toLocaleString("ru-RU") + " р/мес."
                  : selectedWarehouse?.type === "owned"
                    ? selectedWarehouse?.buildPrice!.toLocaleString("ru-RU") +
                      " р"
                    : ""}
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
        </>
      ) : null}
      <Button
        onClick={() => {
          dispatch(
            openModal({
              size: "sm",
              title: "Подтвердите данные",
            }),
          );
        }}
        className="w-100 mt-3"
        disabled={currentWarehouse === null}
        size="sm"
      >
        {currentWarehouseType === "rent" ? "Арендовать" : "Построить"}
      </Button>
      {selectedWarehouse && (
        <AppModal confirmAction={buildOrRentWarehouse}>
          <ConfirmAddWarehouse
            type={selectedWarehouse.type}
            size={selectedWarehouse.size}
            capacity={selectedWarehouse.capacity}
            rentPrice={selectedWarehouse.rentPrice}
            buildPrice={selectedWarehouse.buildPrice}
          />
        </AppModal>
      )}
    </div>
  );
}

import "./warehouses.css";
import { Badge, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink, Route, Routes, useLocation } from "react-router";
import WareHousesList from "../warehouses-list/warehouses-list";
import AddWarehouseForm from "../add-warehouse-form/add-warehouse-form";
export default function Warehouses() {
  const location = useLocation();
  const isAddPage = location.pathname.endsWith("/add");

  return (
    <div className="warehouse">
      <div className="warehouse__header d-flex justify-content-between align-items-center">
        <h2>Складское хозяйство</h2>
        <Badge bg="success">2 склада работают</Badge>
      </div>
      <Container className="mt-3 warehouse__grid">
        <Row >
          <Col>Общая вместимость</Col>
          <Col>Занято</Col>
        </Row>
        <Row>
          <Col>150 000</Col>
          <Col>98 500</Col>
        </Row>
        <Row className="mt-3">
          <Col>Общая вместимость</Col>
          <Col>Расходы на аренду</Col>
        </Row>
        <Row>
          <Col>51 500</Col>
          <Col>45 000 ₽ за игровой месяц</Col>
        </Row>
      </Container>
      <Routes>
        <Route path="/" element={<WareHousesList />} />
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

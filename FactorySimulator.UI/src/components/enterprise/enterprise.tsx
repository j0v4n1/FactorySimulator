import { useParams } from "react-router";
import { useAppSelector } from "../../store/hook";
import Card from "react-bootstrap/Card";
import { Badge } from "react-bootstrap";
import { statusBadge, statusLabel } from "../../types/types.ts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import EnterpriseViewTab from "../enterprise-view-tab/enterprise-view-tab.tsx";

export default function Enterprise() {
  const { id } = useParams();

  const enterprises = useAppSelector((state) => {
    return state.corporationSlice.enterprises;
  });

  const enterprise = enterprises.find((item) => {
    return item.id === id;
  });

  if (!enterprise) {
    return <p>Ошибка поиска предприятия или оборудования</p>;
  }

  return (
    <Card className="text-center" style={{ width: "100%" }}>
      <Card.Header className="d-flex justify-content-between">
        {enterprise.name}
        <Badge bg={statusBadge[enterprise.status]}>
          {statusLabel[enterprise.status]}
        </Badge>
      </Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col className="fs-5 text-muted">Производство</Col>
            <Col className="fs-5 text-muted">Потребление энергии</Col>
          </Row>
          <Row>
            <Col className="fs-2 text-success">
              {enterprise.equipment.productionPerSecond *
                enterprise.equipmentCount}{" "}
              ед/с
            </Col>
            <Col className="fs-2 ">
              {(
                enterprise.equipment.powerConsumption *
                enterprise.equipmentCount
              ).toLocaleString("ru-RU")}{" "}
              кВт
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="fs-5 text-muted">Сотрудники</Col>
            <Col className="fs-5 text-muted">Состояние</Col>
          </Row>
          <Row>
            <Col className="fs-2">{enterprise.employees} / 100 чел.</Col>
            <Col className="fs-2 ">100%</Col>
          </Row>
        </Container>
        <Tabs
          defaultActiveKey="view"
          id="justify-tab-example"
          className="mt-5 mb-3 "
          justify
        >
          <Tab eventKey="view" title="Обзор">
            <EnterpriseViewTab enterprise={enterprise} />
          </Tab>
          <Tab eventKey="production" title="Производство">
            Tab content for Profile
          </Tab>
          <Tab eventKey="equipment" title="Оборудование">
            Tab content for Loooonger Tab
          </Tab>
          <Tab eventKey="warehouse" title="Склад">
            Tab content for Contact
          </Tab>
          <Tab eventKey="employees" title="Персонал">
            Tab content for Contact
          </Tab>
          <Tab eventKey="finance" title="Финансы">
            Tab content for Contact
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
}

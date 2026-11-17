import "./enterprise-view-tab.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import type { Enterprise } from "../../store/types";
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";
import coal from "../../assets/coal.png";
import ironOreImage from "../../assets/iron_ore.png";
import cooperOre from "../../assets/cooper_ore.png";
import wood from "../../assets/wood.png";
import ironPlate from "../../assets/iron_plate.png";
import cooperPlate from "../../assets/cooper_plate.png";
import uranOre from "../../assets/uran_ore.png";
import uranPlate from "../../assets/uran_plate.png";
import repairTools from "../../assets/repair_tools.png";

type ModalProps = {
  enterprise: Enterprise;
};

export default function EnterpriseViewTab({ enterprise }: ModalProps) {
  return (
    <>
      <div className="fs-5 mb-4">Производственная статистика</div>
      <Container>
        <Row className="mb-3">
          <Col className="fs-5 fw-bold">Показатель</Col>
          <Col className="fs-5 fw-bold">Значение</Col>
        </Row>
        <Row className="mb-2">
          <Col className="fs-5">Добыча за час игры</Col>
          <Col className="fs-5">
            {enterprise.equipment.productionPerSecond *
              enterprise.equipmentCount}{" "}
            ед.
          </Col>
        </Row>
        <Row className="mb-2">
          <Col className="fs-5">Добыча за сутки игры</Col>
          <Col className="fs-5">
            {enterprise.equipment.productionPerSecond *
              enterprise.equipmentCount *
              24}{" "}
            ед.
          </Col>
        </Row>
        <Row className="mb-2">
          <Col className="fs-5">Эффективность</Col>
          <Col className="fs-5">100%</Col>
        </Row>
      </Container>
      <div className="fs-5 mb-4 mt-4">Основное оборудование</div>
      <Row className="mb-4">
        <Col className="fs-5">{enterprise.equipment.name}</Col>
        <Col className="fs-5">{enterprise.equipmentCount} / 100</Col>
      </Row>
      <div className="w-75 m-auto">
        <ProgressBar now={60} />
      </div>
      <div className="fs-5 mb-4 mt-4">Состояние склада</div>
      <div className="enterprise-view-tab-cards">
        <Card
          className="d-flex align-items-center"
          style={{ width: "8rem", border: "none" }}
        >
          <Card.Img
            style={{ width: 96, height: 96 }}
            variant="top"
            src={coal}
          />
          <Card.Body>
            <Card.Title>Уголь</Card.Title>
            <Card.Text>23 шт</Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="d-flex align-items-center"
          style={{ width: "8rem", border: "none" }}
        >
          <Card.Img
            style={{ width: 96, height: 96 }}
            variant="top"
            src={ironOreImage}
          />
          <Card.Body>
            <Card.Title>Железная руда</Card.Title>
            <Card.Text>11 шт</Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="d-flex align-items-center"
          style={{ width: "8rem", border: "none" }}
        >
          <Card.Img
            style={{ width: 96, height: 96 }}
            variant="top"
            src={cooperOre}
          />
          <Card.Body>
            <Card.Title>Медная руда</Card.Title>
            <Card.Text>2 шт</Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="d-flex align-items-center"
          style={{ width: "8rem", border: "none" }}
        >
          <Card.Img
            style={{ width: 96, height: 96 }}
            variant="top"
            src={wood}
          />
          <Card.Body>
            <Card.Title>Дерево</Card.Title>
            <Card.Text>45 шт</Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="d-flex align-items-center"
          style={{ width: "8rem", border: "none" }}
        >
          <Card.Img
            style={{ width: 96, height: 96 }}
            variant="top"
            src={uranOre}
          />
          <Card.Body>
            <Card.Title>Урановая руда</Card.Title>
            <Card.Text>1 шт</Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="d-flex align-items-center"
          style={{ width: "8rem", border: "none" }}
        >
          <Card.Img
            style={{ width: 96, height: 96 }}
            variant="top"
            src={ironPlate}
          />
          <Card.Body>
            <Card.Title>Железная плита</Card.Title>
            <Card.Text>26 шт</Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="d-flex align-items-center"
          style={{ width: "8rem", border: "none" }}
        >
          <Card.Img
            style={{ width: 96, height: 96 }}
            variant="top"
            src={uranPlate}
          />
          <Card.Body>
            <Card.Title>Урановая плита</Card.Title>
            <Card.Text>78 шт</Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="d-flex align-items-center"
          style={{ width: "8rem", border: "none" }}
        >
          <Card.Img
            style={{ width: 96, height: 96 }}
            variant="top"
            src={cooperPlate}
          />
          <Card.Body>
            <Card.Title>Медная плита</Card.Title>
            <Card.Text>40 шт</Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="d-flex align-items-center"
          style={{ width: "8rem", border: "none" }}
        >
          <Card.Img
            style={{ width: 96, height: 96 }}
            variant="top"
            src={repairTools}
          />
          <Card.Body>
            <Card.Title>Ремонтный набор</Card.Title>
            <Card.Text>240 шт</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

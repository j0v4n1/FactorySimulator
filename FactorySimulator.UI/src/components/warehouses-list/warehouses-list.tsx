import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Badge } from "react-bootstrap";

export default function WareHousesList() {
  return (
    <div className="warehouse__warehouse-list mt-3 mb-3">
      <h2>Мои склады</h2>
      <Card className="mt-3 mb-3">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title>Городской склад №1</Card.Title>
            <Badge bg="success">работает</Badge>
          </div>
          <div className="d-flex align-items-center">
            <Card.Subtitle className="mb-2 me-2 text-muted">
              Арендованный
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Средний размер
            </Card.Subtitle>
          </div>
          <Card.Text>
            <Container className="mb-3">
              <Row className="d-flex justify-content-between">
                <Col className="p-0" xs="auto">
                  Занятость
                </Col>
                <Col className="p-0" xs="auto">
                  26 500 / 50 000
                </Col>
              </Row>
            </Container>
            <ProgressBar now={Math.round((26500 / 50000) * 100)} />
            <Container className="mt-3">
              <Row className="d-flex justify-content-between">
                <Col className="p-0" xs="auto">
                  Аренда
                </Col>
                <Col className="p-0" xs="auto">
                  30 000 ₽ / месяц
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="mt-3 mb-3">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title>Городской склад №2</Card.Title>
            <Badge bg="success">работает</Badge>
          </div>
          <div className="d-flex align-items-center">
            <Card.Subtitle className="mb-2 me-2 text-muted">
              Собственный
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Средний размер
            </Card.Subtitle>
          </div>
          <Card.Text>
            <Container className="mb-3">
              <Row className="d-flex justify-content-between">
                <Col className="p-0" xs="auto">
                  Занятость
                </Col>
                <Col className="p-0" xs="auto">
                  26 500 / 50 000
                </Col>
              </Row>
            </Container>
            <ProgressBar now={Math.round((26500 / 50000) * 100)} />
            <Container className="mt-3">
              <Row className="d-flex justify-content-between">
                <Col className="p-0" xs="auto">
                  Аренда
                </Col>
                <Col className="p-0" xs="auto">
                  0 ₽ / месяц
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

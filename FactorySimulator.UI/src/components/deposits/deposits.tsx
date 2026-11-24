import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "react-bootstrap";
import { useAppSelector } from "../../store/hook.ts";
import { formatNumber } from "../../utils/common-fn.ts";
import { useNavigate } from "react-router";
import Badge from "react-bootstrap/Badge";

export default function Deposits() {
  const deposits = useAppSelector((state) => state.gameSlice.deposits);
  const inOperation = deposits.filter((d) => d.enterpriseId !== null);
  const ownedDeposits = deposits.filter((d) => d.isOwned);
  const rentDeposits = deposits
    .filter((d) => !d.isOwned)
    .filter((d) => d.isLeased);
  const totalRentPrice = rentDeposits.reduce(
    (acc, el) => acc + el.rentPrice,
    0,
  );
  const navigate = useNavigate();
  const depositsList = deposits.map((d, i) => (
    <tr
      key={d.id}
      role="button"
      onClick={() => {
        navigate(`${d.id}`);
      }}
    >
      <td>{i + 1}</td>
      <td>{d.resource.name}</td>
      <th>
        {`${formatNumber(d.remainingReserves)} / ${formatNumber(d.remainingReserves)}`}{" "}
        ед.
      </th>
      <th>
        <Badge bg={d.isLeased ? "success" : "warning"}>
          {d.isLeased ? "куплено" : "доступно"}
        </Badge>
      </th>
    </tr>
  ));
  return (
    <Card className="w-100 me-3 mb-5">
      <Card.Header className="fs-3">Месторождения</Card.Header>
      <Card.Body>
        <Card.Title className="text-muted fs-6">
          Управление ресурсной базой корпорации
        </Card.Title>
        <Container className="mt-3">
          <Row className="text-muted">
            <Col>Доступно</Col>
            <Col>В эксплуатации</Col>
          </Row>
          <Row className="mb-3 fs-3">
            <Col className="text-success">{deposits.length}</Col>
            <Col>{inOperation.length}</Col>
          </Row>
          <Row className="text-muted">
            <Col>Собственные</Col>
            <Col>Арендуемые</Col>
          </Row>
          <Row className="mb-3 fs-3">
            <Col>{ownedDeposits.length}</Col>
            <Col>{rentDeposits.length}</Col>
          </Row>
          <Row className="text-muted">
            <Col>Арендные платежи</Col>
          </Row>
          <Row className=" fs-3">
            <Col>{formatNumber(totalRentPrice)} ₽/мес.</Col>
          </Row>
        </Container>
        <Card.Title className="text-muted fs-6 mt-5 mb-3">
          Доступные месторождения по ресурсам
        </Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Ресурс</th>
              <th>Количество</th>
              <th>Доступность</th>
            </tr>
          </thead>
          <tbody>{depositsList}</tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

import { useParams } from "react-router";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { useAppDispatch, useAppSelector } from "../../store/hook.ts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { convertReverseDistance, formatNumber } from "../../utils/common-fn.ts";
import Button from "react-bootstrap/Button";
import api from "../../utils/api.ts";
import type { AxiosResponse } from "axios";
import { rentDepositAction } from "../../store/slices/game-slice.ts";
import AppModal from "../app-modal/app-modal.tsx";
import ConfirmAddDeposit from "../confirm-add-deposit/confirm-add-deposit.tsx";
import {
  changeStatusIsLoading,
  closeModal,
  openModal,
} from "../../store/slices/ui-slice.ts";
import { useState } from "react";

export default function Deposit() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const deposits = useAppSelector((state) => state.gameSlice.deposits);
  const deposit = deposits.find((d) => d.id === id);
  const [transactionType, setTransactionType] = useState<"rent" | "purchase">(
    "rent",
  );
  const rentDeposit = async () => {
    if (!id) return;
    dispatch(changeStatusIsLoading(true));
    try {
      const res: AxiosResponse<{ isLeased: boolean }> = await api.post(
        "/api/deposits",
        { id },
      );
      dispatch(rentDepositAction({ id, isLeased: res.data.isLeased }));
    } catch (error) {
      console.error("Ошибка при аренде месторождения:", error);
    } finally {
      dispatch(closeModal());
    }
  };
  const purchaseDeposit = async () => {
    if (!id) return;
    dispatch(changeStatusIsLoading(true));
    try {
    } catch (error) {
      console.error("Ошибка при покупке месторождения:", error);
    } finally {
      dispatch(closeModal());
    }
  };
  return (
    deposit && (
      <>
        <Card className="w-100 ">
          <Card.Header
            className={"d-flex justify-content-between align-items-center"}
          >
            {deposit.name}
            <Badge bg={deposit.isLeased ? "success" : "warning"}>
              {deposit.isLeased ? "куплено" : "доступно"}
            </Badge>
          </Card.Header>
          <Card.Body>
            <Container className="mt-5">
              <Row className="text-muted">
                <Col>Ресурс</Col>
                <Col>Удалённость</Col>
              </Row>
              <Row className="mb-5 fs-4">
                <Col>{deposit.resource.name}</Col>
                <Col>{convertReverseDistance(deposit.distance)}</Col>
              </Row>
              <Row className="text-muted">
                <Col>Общие запасы</Col>
                <Col>Остаток</Col>
              </Row>
              <Row className="mb-5 fs-4">
                <Col>{formatNumber(deposit.totalReserves)} ед.</Col>
                <Col>{formatNumber(deposit.remainingReserves)} ед.</Col>
              </Row>
              <Row className="text-muted">
                <Col>Аренда в месяц</Col>
                <Col>Стоимость выкупа</Col>
              </Row>
              <Row className="mb-5 fs-4">
                <Col>{formatNumber(deposit.rentPrice)} ₽</Col>
                <Col>{formatNumber(deposit.purchasePrice)} ₽</Col>
              </Row>
            </Container>
            {deposit.isLeased ? null : (
              <div className="d-flex w-100 ">
                <Button
                  onClick={() => {
                    setTransactionType("rent");
                    dispatch(
                      openModal({
                        size: "sm",
                        title: "Подтвердите данные",
                      }),
                    );
                  }}
                  className="w-100 me-3"
                >
                  Арендовать
                </Button>
                <Button
                  onClick={() => {
                    setTransactionType("purchase");
                    dispatch(
                      openModal({
                        size: "sm",
                        title: "Подтвердите данные",
                      }),
                    );
                  }}
                  className="w-100 "
                >
                  Выкупить
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
        {transactionType === "rent" ? (
          <AppModal
            children={
              <ConfirmAddDeposit
                resourceType={deposit.resource.name}
                totalReserves={deposit.totalReserves}
                rentPrice={deposit.rentPrice}
                purchasePrice={deposit.purchasePrice}
                type={"rent"}
              />
            }
            confirmAction={rentDeposit}
          />
        ) : transactionType === "purchase" ? (
          <AppModal
            children={
              <ConfirmAddDeposit
                resourceType={deposit.resource.name}
                totalReserves={deposit.totalReserves}
                rentPrice={deposit.rentPrice}
                purchasePrice={deposit.purchasePrice}
                type={"purchase"}
              />
            }
            confirmAction={purchaseDeposit}
          />
        ) : null}
      </>
    )
  );
}

import { formatNumber } from "../../utils/common-fn.ts";

type ConfirmAddDepositProps = {
  resourceType: string;
  totalReserves: number;
  rentPrice: number;
  purchasePrice: number;
  type: "rent" | "purchase";
};
export default function ConfirmAddDeposit({
  resourceType,
  totalReserves,
  rentPrice,
  purchasePrice,
  type,
}: ConfirmAddDepositProps) {
  return (
    <div>
      <div>Тип ресурса: {resourceType}</div>
      <div>Общее количество запасов: {formatNumber(totalReserves)} ед.</div>
      {type === "rent" ? (
        <div>Аренда: {formatNumber(rentPrice!)} ₽/месяц</div>
      ) : type === "purchase" ? (
        <div>Стоимость выкупа: {formatNumber(purchasePrice)} ₽</div>
      ) : null}
    </div>
  );
}

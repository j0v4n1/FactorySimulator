import { capitalizeFirst, formatNumber } from "../../utils/common-fn.ts";

type confirmAddWarehouseProps = {
  type: "rent" | "owned";
  size: string;
  capacity: number;
  rentPrice: number | null;
  buildPrice: number | null;
};

export default function ConfirmAddWarehouse({
  type,
  size,
  capacity,
  rentPrice,
  buildPrice,
}: confirmAddWarehouseProps) {
  const warehouseTypeLabels: Record<string, string> = {
    rent: "Арендуемый",
    owned: "Личный",
  };
  const warehouseSizeLabels: Record<string, string> = {
    small: "малый склад",
    medium: "средний склад",
    large: "большой склад",
  };
  return (
    <div>
      <div>Тип склада: {warehouseTypeLabels[type]}</div>
      <div>Размер: {capitalizeFirst(warehouseSizeLabels[size])}</div>
      <div>Вместительность: {formatNumber(capacity)} ед.</div>
      {type === "rent" ? (
        <div>Аренда: {formatNumber(rentPrice!)} ₽/месяц</div>
      ) : type === "owned" ? (
        <div>Стоимость: {formatNumber(buildPrice!)} ₽</div>
      ) : null}
    </div>
  );
}

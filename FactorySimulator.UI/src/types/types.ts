import type { EnterpriseStatus } from "../store/types";

export const statusLabel: Record<EnterpriseStatus, string> = {
  UnderConstruction: "Строится",
  Operational: "Работает",
  Paused: "Остановлено",
  NoResources: "Нет ресурсов",
};

export const statusBadge: Record<EnterpriseStatus, string> = {
  UnderConstruction: "info",
  Operational: "success",
  Paused: "warning",
  NoResources: "danger",
};

export type WarehousePost = {
  id: string;
  warehouseTypeCode: string;
  enterpriseId: string | null;
  rentPrice: number | null;
  warehousePrice: number | null;
  capacity: number;
  name: string;
  distance: string;
};

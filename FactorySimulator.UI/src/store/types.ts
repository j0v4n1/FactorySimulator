export type EnterpriseStatus =
  "UnderConstruction" | "Operational" | "Paused" | "NoResources";

export type Enterprise = {
  id: string;
  name: string;
  status: EnterpriseStatus;
  equipmentCount: number;
  employees: number;
  recipe: Recipe;
  equipment: Equipment;
};

type Resource = {
  code: string;
  name: string;
  description: string;
  basePrice: number;
};

type RecipeResourceDocument = {
  resource: Resource | null;
  amount: number;
};

export type Recipe = {
  id: string;
  code: string;
  name: string;
  inputs: RecipeResourceDocument[];
  outputResourceCode: Resource;
};

export type Construction = {
  id: string;
  code: string;
  name: string;
  description: string;
  constructionCost: number;
  imageKey: string;
  allowedEquipment: {
    equipmentCode: string;
    minCount: number;
    maxCount: number;
  };
  minEmployees: number;
  maxEmployees: number;
  allowedRecipes: Recipe[];
};

export type CorporationData = {
  balance: number;
  enterprises: Enterprise[];
  warehouses: Warehouse[];
};

interface BaseWarehouseType {
  id: string;
  name: string;
  size: string;
  code: string;
  benefit: string;
  distance: string;
  capacity: number;
}

export interface RentWarehouseType extends BaseWarehouseType {
  type: "rent";
  rentPrice: number;
  buildPrice: null;
}

export interface OwnedWarehouseType extends BaseWarehouseType {
  type: "owned";
  rentPrice: null;
  buildPrice: number;
}

export type Distance = "near" | "medium" | "far";

export type WarehouseType = RentWarehouseType | OwnedWarehouseType;

export type Item = {
  resource: Resource;
  amount: number;
};

interface BaseWarehouse {
  id: string;
  name: string;
  size: string;
  enterpriseId: string | null;
  code: string;
  distance: Distance;
  capacity: number;
  items: Item[];
}

export interface RentWarehouse extends BaseWarehouse {
  type: "rent";
  rentPrice: number;
  buildPrice: null;
}

export interface OwnedWarehouse extends BaseWarehouse {
  type: "owned";
  rentPrice: null;
  buildPrice: number;
}

export type Warehouse = RentWarehouse | OwnedWarehouse;

export type GameData = {
  recipes: Recipe[];
  warehouses: WarehouseType[];
};

export type Equipment = {
  id: string;
  code: string;
  name: string;
  description: string;
  powerConsumption: number;
  unitCost: number;
  productionPerSecond: number;
  reducedProductionPerSecond: number;
};

export type ModalState = {
  isLoading: boolean;
  show: boolean;
  size?: "sm" | "lg" | "xl";
  title: string;
};

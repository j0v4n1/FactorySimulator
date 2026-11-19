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
};

export type WarehouseType = {
  id: string;
  code: string;
  name: string;
  type: string;
  benefit: string;
  distanceFromEnterprise: string;
  capacity: number;
  rentPrice: number | null;
  constructionCost: number | null;
};

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

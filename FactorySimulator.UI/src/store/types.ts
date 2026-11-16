export type EnterpriseStatus =
  "UnderConstruction" | "Operational" | "Paused" | "NoResources";

export type Enterprise = {
  id: string;
  name: string;
  status: EnterpriseStatus;
  equipmentCount: number;
  employees: number;
  recipe: string;
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

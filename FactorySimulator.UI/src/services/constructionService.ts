export interface Construction {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  constructionCost: number;
  imageKey: string;
}

export async function getConstructions(): Promise<Construction[]> {
  const response = await fetch("http://localhost:5188/api/constructions");

  if (!response.ok) {
    throw new Error("Не удалось загрузить каталог предприятий");
  }

  return response.json();
}

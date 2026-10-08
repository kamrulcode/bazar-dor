export interface ProductChange {
  dir: "up" | "down" | "same";
  pct: number;
}

export interface ProductT {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  change: ProductChange;
}

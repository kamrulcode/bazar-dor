export interface ProductChange {
  dir: "up" | "down" | "same";
  pct: number;
}

export type MarketT = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type ProductT = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  icon: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: ProductChange;
  markets: MarketT[];
};

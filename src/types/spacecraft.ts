export interface Spacecraft {
  id: number;
  name: string;
  description: string;
  affiliation: string;
  dimensions: string;
  appearances: number;
}

export interface SpacecraftItems {
  items: Spacecraft[];
  item_count: number;
  page_count: number;
  prev_page: number | null;
  next_page: number | null;
}

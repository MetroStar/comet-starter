import { ReactNode } from 'react';

export interface LaunchData {
  provider: SortableDataCell;
  name: SortableDataCell;
  status: SortableDataCell;
  last_updated: SortableDataCell;
}

export interface SortableDataCell {
  value: string | ReactNode;
  sortValue: string;
}

export interface ChartData {
  x: string;
  y: number;
}

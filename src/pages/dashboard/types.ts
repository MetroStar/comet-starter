import { ReactNode } from 'react';

export interface TableData {
  name: string | ReactNode;
  affiliation: string;
  dimensions: string;
  appearances: number;
}

export interface ChartData {
  x: string;
  y: number;
}

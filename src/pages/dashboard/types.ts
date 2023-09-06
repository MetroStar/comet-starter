import { ReactNode } from 'react';

export interface LaunchData {
  name: string | ReactNode;
  provider: string;
  status: string;
  last_updated: string;
}

export interface ChartData {
  x: string;
  y: number;
}

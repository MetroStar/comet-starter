import { ReactNode } from 'react';

export interface CaseTableData {
  case_id: number;
  case_id_link: ReactNode;
  last_name: string;
  first_name: string;
  status: string;
  assigned_to?: string;
  created_at: string;
}

export interface ChartData {
  x: string;
  y: number;
}

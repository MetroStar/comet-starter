export interface Applicant {
  id: number;
  first_name: string;
  last_name: string;
  middle_name?: string;
  gender: string;
  date_of_birth: Date;
  ssn: string;
  email?: string;
  home_phone?: string;
  mobile_phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country: string;
  created_at: Date;
  updated_at?: Date;
}

export interface Case {
  id: number;
  status: 'Not Started' | 'In Progress' | 'Approved' | 'Denied';
  assigned_to?: string;
  created_at: Date;
  updated_at?: Date;
  applicant: Applicant;
}

export interface CaseItems {
  items: Case[];
  item_count: number;
  page_count: number;
  prev_page: number | null;
  next_page: number | null;
}

export interface CaseSearchFilters {
  id?: string;
  gender?: string[] | undefined;
  status?: string[] | undefined;
  created_before?: string; // ISO date string
  created_after?: string; // ISO date string
  q?: string; // Simple search query
}

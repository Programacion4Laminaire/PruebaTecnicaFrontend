export interface Person {
  identification: string;
  birthDate: string; // ISO string o 'YYYY-MM-DD'
  firstName: string;
  lastName: string;
  state?: string;
}

export interface PersonFilter {
  identification?: string;
  firstName?: string;
  lastName?: string;
}

export interface PersonListResponse {
  isSuccess: boolean;
  data: Person[];
  message: string;
  totalRecords: number;
}

export interface PersonCreateResponse {
  isSuccess: boolean;
  data: Person;
  message: string;
}

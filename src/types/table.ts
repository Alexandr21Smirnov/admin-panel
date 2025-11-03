export type SortField =
  | 'id'
  | 'firstName'
  | 'email'
  | 'birthDate'
  | 'weight'
  | 'height';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

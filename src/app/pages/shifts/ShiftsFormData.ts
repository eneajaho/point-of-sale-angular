import { Shift } from '@core/models/shift.model';

export interface ShiftsFormData {
  type: 'add' | 'edit';
  shift: Shift | null;
}

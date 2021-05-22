import { Category } from '@core/models/Category';

export interface CategoryFormData {
  type: 'add' | 'edit';
  category: Category | null;
}

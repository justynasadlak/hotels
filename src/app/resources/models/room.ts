import { Hotel } from './hotel';

export interface Room {
  id?: string;
  number?: number;
  capacity?: number;
  price?: number;
  hotel?: Hotel;
}

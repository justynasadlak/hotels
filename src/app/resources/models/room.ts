import {Hotel} from './hotel';

export interface Room {
  id?: string;
  number?: number;
  capacity?: number;
  prices?: number;
  hotel?: Hotel;
}

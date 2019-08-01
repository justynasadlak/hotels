import {Hotel} from './hotel';

export interface Facility {
  id?: number;
  type?: string;
  hotel?: Hotel;
}

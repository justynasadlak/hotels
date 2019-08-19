import { Room } from './room';

export interface Hotel {
  id?: number;
  name?: string;
  location?: string;
  facilities?: [];
  rooms?: Room[];
}

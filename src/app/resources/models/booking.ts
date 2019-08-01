import {Room} from './room';

export interface Booking {
  id?: number;
  user: string;
  startDate: string;
  endDate: string;
  rooms: Room[];
}

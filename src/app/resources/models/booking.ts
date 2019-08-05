import {Room} from './room';

export interface Booking {
  id?: string;
  user: string;
  startDate: string;
  endDate: string;
  rooms: Room[];
}

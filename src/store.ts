import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, pluck} from 'rxjs/operators';
import {Hotel} from './app/resources/models/hotel';
import {Room} from './app/resources/models/room';
import {Facility} from './app/resources/models/facility';
import {Booking} from './app/resources/models/booking';

interface InitialState {
  isLogged: boolean;
  hotels: Hotel[];
  rooms: Room[];
  facilities: Facility[];
  bookings: Booking[];
  startDate: string;
  endDate: string;
}

const initialState: InitialState = {
  isLogged: false,
  hotels: [],
  rooms: [],
  facilities: [],
  bookings: [],
  startDate: null,
  endDate: null
};

export class Store {

  private subject = new BehaviorSubject<InitialState>(initialState);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, newStateVal: any) {
    this.subject.next({...this.subject.value, [name]: newStateVal});
  }

}

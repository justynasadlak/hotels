import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, pluck} from 'rxjs/operators';
import {Hotel} from './app/resources/models/hotel';

interface InitialState {
  isLogged: boolean;
  hotels: Hotel[];
}

const initialState: InitialState = {
  isLogged: false,
  hotels: []
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

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Hotel} from '../resources/models/hotel';
import {Room} from '../resources/models/room';
import {delay, tap} from 'rxjs/operators';
import {Store} from '../../store';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private url = 'http://185.157.80.88:8080/api';

  constructor(private http: HttpClient, private store: Store) {
  }

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.url + '/hotels')
      .pipe(delay(2000), tap(response => this.store.set('hotels', response)));
  }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.url + '/rooms').pipe(delay(2000), tap(response => this.store.set('rooms', response)));
  }
}

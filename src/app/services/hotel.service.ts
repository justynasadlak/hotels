import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../resources/models/hotel';
import { delay, tap } from 'rxjs/operators';
import { Room } from '../resources/models/room';
import { Facility } from '../resources/models/facility';
import { Store } from '../../store';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private url = 'http://185.157.80.88:8080/api';

  constructor(private http: HttpClient, private store: Store) {}

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.url + '/hotels').pipe(
      delay(2000),
      tap(response => this.store.set('hotels', response))
    );
  }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.url + '/rooms').pipe(
      delay(2000),
      tap(response => this.store.set('rooms', response))
    );
  }

  getRoom(roomId: string): Observable<Room> {
    return this.http.get<Room>(this.url + `/rooms/${roomId}`);
  }

  getAllFacilities(): Observable<Facility[]> {
    return this.http.get<Facility[]>(this.url + '/facilities').pipe(
      delay(2000),
      tap(response => this.store.set('facilities', response))
    );
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Hotel} from '../resources/models/hotel';
import {Room} from '../resources/models/room';
import {delay, tap} from 'rxjs/operators';
import {Store} from '../../store';
import {Facility} from '../resources/models/facility';
import {Booking} from '../resources/models/booking';

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

  getRoom(roomId: string): Observable<Room> {
    return this.http.get<Room>(this.url + `/rooms/${roomId}`);
  }

  getAllFacilities(): Observable<Facility[]> {
    return this.http.get<Facility[]>(this.url + '/facilities').pipe(delay(2000), tap(response => this.store.set('facilities', response)));
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.url + '/bookings').pipe(delay(2000), tap(response => this.store.set('bookings', response)));
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.url + '/bookings', booking);
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Store } from '../../store';
import { Booking } from '../resources/models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private url = 'http://185.157.80.88:8080/api';

  constructor(private http: HttpClient, private store: Store) {}

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.url + '/bookings').pipe(
      delay(2000),
      tap(response => this.store.set('bookings', response))
    );
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.url + '/bookings', booking);
  }
}

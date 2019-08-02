import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../services/booking.service';
import {Hotel} from '../../resources/models/hotel';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Room} from '../../resources/models/room';
import {Store} from '../../../store';
import {Facility} from '../../resources/models/facility';
import {SearchData} from '../../resources/models/searchData';
import {Booking} from '../../resources/models/booking';
import {LoginDialogComponent} from '../../modules/user/login-dialog/login-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  private rooms: Room[] = [];
  private location: string;
  private bookingData: Booking;
  private startDate;
  private endDate;
  private username;
  private bookedRoomsId = [];

  private hotels$: Observable<Hotel[]>;
  private locations$: Observable<string[]>;
  private rooms$: Observable<Room[]>;
  private bookings$: Observable<Booking[]>;
  private bookingsOnThisDate$: Observable<Booking[]>;

  // TODO
  // private facilities$: Observable<Facility[]>;

  private filterRooms$: Observable<Room[]>;
  private filterHotels$: Observable<Hotel[]>;
  private filterFacilities$: Observable<Facility[]>;

  constructor(private bookingService: BookingService,
              private formBuilder: FormBuilder,
              private router: Router,
              private store: Store,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getHotels();
    this.getBookings();

  }

  onSearch(searchValues: SearchData): void {
    this.store.set('startDate', new Date(searchValues.checkIn).toISOString());
    this.store.set('endDate', new Date(searchValues.checkOut).toISOString());
    this.location = searchValues.city;
    this.filterHotels$ = this.hotels$.pipe(map(hotels => hotels.filter(h => h.location === this.location)));

    this.filterRoomsBySearchValues(searchValues);
  }

  onBook(roomId: string): void {
    this.store.select('isLogged').subscribe(val => !val ? this.openLoginDialog() : this.bookRoom(roomId));
  }

  private openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      disableClose: true,
      width: '250px',
      maxHeight: '350px'
    });
  }

  private bookRoom(roomId: string): void {
    this.bookingService.getRoom(roomId).subscribe(room => {
      this.rooms.push(room);
      this.getStartDate();
      this.getEndDate();
      this.getUsername();
      this.bookingData = {
        user: this.username,
        startDate: this.startDate,
        endDate: this.endDate,
        rooms: this.rooms
      };
      console.log(this.bookingData);
      this.bookingService.addBooking(this.bookingData).subscribe();

    });
  }

  private getStartDate(): void {
    this.store.select('startDate').pipe(tap(date => this.startDate = date)).subscribe();
  }

  private getEndDate(): void {
    this.store.select('endDate').pipe(tap(date => this.endDate = date)).subscribe();
  }

  private getUsername(): void {
    this.store.select('username').pipe(tap(user => this.username = user)).subscribe();
  }

  private getHotels(): void {
    this.bookingService.getAllHotels().subscribe(hotels => {
      this.getRooms();
      this.hotels$ = this.store.select<Hotel[]>('hotels');
      this.locations$ = this.getLocations();
    });
  }

  private getRooms(): void {
    this.bookingService.getAllRooms().subscribe(rooms => this.rooms$ = this.store.select<Room[]>('rooms'));
  }

  // TODO
  // private getBookings(): void {
  //   this.bookingService.getAllBookings().subscribe(bookings => this.bookings$ = this.store.select<Booking[]>('bookings'));
  // }
  //
  // private getFacilities(): Observable<Facility[]> {
  //   return this.bookingService.getAllFacilities().pipe(
  //     tap(facilities => this.facilities$ = this.store.select<Facility[]>('facilities')));
  // }

  private getLocations(): Observable<string[]> {
    return this.hotels$.pipe(
      map(hotels => {
        const res = hotels.map(hotel => hotel.location);
        const set = new Set(res);
        return Array.from(set);
      })
    );
  }

  private getBookings(): void {
    this.bookingService.getAllBookings().subscribe(bookings => this.bookings$ = this.store.select('bookings'));
  }

  private filterRoomsBySearchValues(searchValues: SearchData): Observable<Room[]> {
    const checkIn = new Date(searchValues.checkIn).toISOString();
    const checkOut = new Date(searchValues.checkOut).toISOString();

    this.bookingsOnThisDate$ = this.bookings$.pipe(
      map(bookings => bookings
        .filter(
          b => (checkIn >= b.startDate && checkIn < b.endDate)
            || (checkOut >= b.startDate && checkOut < b.endDate)
            || (checkIn <= b.startDate && checkOut > b.endDate)
        )
      ),
      tap(console.log)
    );

    let freeRooms;
    let freeRoomsInLocation;

    const combined = combineLatest(this.bookingsOnThisDate$, this.rooms$)
      .pipe(
        map(
          ([bookingsOnThisDate, rooms]) =>
            bookingsOnThisDate.map(booking => booking.rooms.map(bookedRoom =>
              freeRooms = rooms.filter(room => room.id !== bookedRoom.id)))),
        map(x => freeRoomsInLocation = freeRooms.filter(freeRoom => freeRoom.hotel.location === this.location)),
        map(y => freeRoomsInLocation.filter(room => room.capacity >= searchValues.guests))
      );

    return this.filterRooms$ = combined;
  }
}

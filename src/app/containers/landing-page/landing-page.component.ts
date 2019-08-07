import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../services/booking.service';
import {Hotel} from '../../resources/models/hotel';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {first, map, tap} from 'rxjs/operators';
import {Room} from '../../resources/models/room';
import {Store} from '../../../store';
import {Facility} from '../../resources/models/facility';
import {SearchData} from '../../resources/models/searchData';
import {Booking} from '../../resources/models/booking';
import {LoginDialogComponent} from '../../modules/user/login-dialog/login-dialog.component';
import {MatDialog} from '@angular/material';
import {HotelService} from '../../services/hotel.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  progressBar = true;
  isDisabled = false;

  locations$: Observable<string[]>;
  filterRooms$: Observable<Room[]>;
  filterHotels$: Observable<Hotel[]>;
  filterFacilities$: Observable<Facility[]>;

  private rooms: Room[] = [];
  private location: string;
  private bookingData: Booking;
  private startDate;
  private endDate;
  private username;

  private hotels$: Observable<Hotel[]>;
  private rooms$: Observable<Room[]>;
  private bookings$: Observable<Booking[]>;
  private bookingsOnThisDate$: Observable<Booking[]>;
  // TODO
  // private facilities$: Observable<Facility[]>;

  constructor(private bookingService: BookingService,
              private hotelService: HotelService,
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
    this.progressBar = true;
    this.isDisabled = true;
    this.store.select('isLogged').pipe(first()).subscribe(val => !val ? this.openLoginDialog() : this.bookRoom(roomId));
  }

  private openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      data: {
        isRegisterView: false
      },
      disableClose: true,
      panelClass: 'login__wrapper'
    });
  }

  private bookRoom(roomId: string): void {
    this.hotelService.getRoom(roomId).subscribe(room => {
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
      this.bookingService.addBooking(this.bookingData).subscribe(x => {
          this.progressBar = false;
          this.router.navigate(['my-profile']);
        },
        error1 => {
          alert(error1);
          this.isDisabled = false;
        });

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
    this.hotelService.getAllHotels().subscribe(hotels => {
      this.getRooms();
      this.hotels$ = this.store.select<Hotel[]>('hotels');
      this.locations$ = this.getLocations();
      this.progressBar = false;
    });
  }

  private getRooms(): void {
    this.hotelService.getAllRooms().subscribe(rooms => this.rooms$ = this.store.select<Room[]>('rooms'));
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
    this.getBookingsOnThisDate(searchValues);

    let freeRooms;
    let freeRoomsInLocation;

    const combined = combineLatest(this.bookingsOnThisDate$, this.rooms$)
      .pipe(
        map(
          ([bookingsOnThisDate, rooms]) =>
            freeRooms = bookingsOnThisDate.length > 0 ?
              this.getFreeRoomsOnThisDate(bookingsOnThisDate, rooms) : rooms
        ),
        map(x => freeRoomsInLocation = freeRooms.filter(freeRoom => freeRoom.hotel.location === this.location)),
        map(y => freeRoomsInLocation.filter(room => room.capacity >= searchValues.guests))
      );

    return this.filterRooms$ = combined;
  }

  private getBookingsOnThisDate(searchValues: SearchData): void {
    const checkIn = new Date(searchValues.checkIn).toISOString();
    const checkOut = new Date(searchValues.checkOut).toISOString();

    this.bookingsOnThisDate$ = this.bookings$.pipe(
      map(bookings => bookings
        .filter(
          b => (checkIn >= b.startDate && checkIn < b.endDate)
            || (checkOut >= b.startDate && checkOut < b.endDate)
            || (checkIn <= b.startDate && checkOut > b.endDate)
        )
      )
    );
  }

  private getFreeRoomsOnThisDate(bookingsOnThisDate: Booking[], rooms: Room[]): Room[] {
    let freeRooms = rooms;
    bookingsOnThisDate.map(booking => booking.rooms.map(bookedRoom =>
      freeRooms = rooms.filter(room => room.id !== bookedRoom.id)
    ));
    return freeRooms;
  }
}

import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../../services/booking.service';
import { Hotel } from '../../../../resources/models/hotel';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Room } from '../../../../resources/models/room';
import { Store } from '../../../../../store';
import { Facility } from '../../../../resources/models/facility';
import { SearchData } from '../../../../resources/models/searchData';
import { Booking } from '../../../../resources/models/booking';
import { LoginDialogComponent } from '../../../user/login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material';
import { HotelService } from '../../../../services/hotel.service';
import { MainPageFacade } from '../../+state/main-page.facade';

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

  // private hotels$: Observable<Hotel[]>;
  hotels$ = this.mainPageFacade.hotels$;

  private rooms$: Observable<Room[]>;
  private bookings$: Observable<Booking[]>;
  private bookingsOnThisDate$: Observable<Booking[]>;
  private hotelsResults: Observable<Hotel[]>;
  // TODO
  // private facilities$: Observable<Facility[]>;

  constructor(
    private mainPageFacade: MainPageFacade,
    private bookingService: BookingService,
    private hotelService: HotelService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getHotels();
    this.getBookings();
  }

  onSearch(searchValues: SearchData): Observable<Hotel[]> {
    console.log(searchValues.checkIn);
    console.log(searchValues.checkOut);
    this.store.set('startDate', new Date(searchValues.checkIn).toISOString());
    this.store.set('endDate', new Date(searchValues.checkOut).toISOString());
    this.location = searchValues.city;
    // this.filterHotels$ = this.hotels$.pipe(map(hotels => hotels.filter(h => h.location === this.location)));
    console.log(searchValues);

    this.filterHotelsBySearchValues(searchValues).subscribe(val => (this.hotelsResults = of(val)));
    return this.hotelsResults;
  }

  // TODO
  // onBook(roomId: string): void {
  //   this.progressBar = true;
  //   this.isDisabled = true;
  //   this.store.select('isLogged').pipe(first()).subscribe(val => !val ? this.openLoginDialog() : this.bookRoom(roomId));
  // }

  onDetails(hotel: Hotel): void {
    this.router.navigate([`hotel-details`], {
      queryParams: {
        id: hotel.id,
        name: hotel.name,
        location: hotel.location,
        facilities: JSON.stringify(hotel.facilities),
        rooms: JSON.stringify(hotel.rooms)
      }
    });
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

  private getHotels(): void {
    this.mainPageFacade.getHotels();
    console.log('this.hotels$');
    this.hotels$.subscribe(console.log);

    // this.hotelService.getAllHotels().subscribe(hotels => {
    //   this.getRooms();
    //
    //   // this.hotels$ =
    //
    //
    //   // this.hotels$ = this.store.select<Hotel[]>('hotels');
    this.locations$ = this.getLocations();
    console.log('this.locations$');
    this.locations$.subscribe(console.log);
    //   this.progressBar = false;
    // });
  }

  private getRooms(): void {
    this.hotelService
      .getAllRooms()
      .subscribe(rooms => (this.rooms$ = this.store.select<Room[]>('rooms')));
  }

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
    this.bookingService
      .getAllBookings()
      .subscribe(bookings => (this.bookings$ = this.store.select('bookings')));
  }

  private filterHotelsBySearchValues(searchValues: SearchData): Observable<Hotel[]> {
    this.getBookingsOnThisDate(searchValues);

    let hotelsInLocation;

    const combined = combineLatest(this.bookingsOnThisDate$, this.hotels$).pipe(
      map(([bookingsOnThisDate, hotels]) => {
        hotelsInLocation = hotels.filter(hotel => hotel.location === this.location);
        this.filterHotels(bookingsOnThisDate, hotelsInLocation, searchValues.guests);

        return hotelsInLocation.filter(h => h.rooms.length);
      })
    );

    return (this.filterHotels$ = combined);
  }

  private filterHotels(
    bookingsOnThisDate: Booking[],
    hotelsInLocation: Hotel[],
    numberOfGuests: number
  ): Hotel[] {
    hotelsInLocation.forEach(hotel => {
      hotel.rooms =
        bookingsOnThisDate.length > 0
          ? this.getFreeRoomsOnThisDate(bookingsOnThisDate, hotel.rooms)
          : hotel.rooms;
      hotel.rooms = this.getRoomsByCapacity(hotel.rooms, numberOfGuests);
    });
    return hotelsInLocation;
  }

  private getBookingsOnThisDate(searchValues: SearchData): void {
    const checkIn = new Date(searchValues.checkIn).toISOString();
    const checkOut = new Date(searchValues.checkOut).toISOString();

    this.bookingsOnThisDate$ = this.bookings$.pipe(
      map(bookings =>
        bookings.filter(
          b =>
            (checkIn >= b.startDate && checkIn < b.endDate) ||
            (checkOut >= b.startDate && checkOut < b.endDate) ||
            (checkIn <= b.startDate && checkOut > b.endDate)
        )
      ),
      tap(console.log)
    );
  }

  private getFreeRoomsOnThisDate(bookingsOnThisDate: Booking[], rooms: Room[]): Room[] {
    let freeRooms = rooms;

    bookingsOnThisDate.map(booking =>
      booking.rooms.map(bookedRoom => (freeRooms = rooms.filter(room => room.id !== bookedRoom.id)))
    );
    return freeRooms;
  }

  private getRoomsByCapacity(rooms: Room[], numberOfGuests: number): Room[] {
    return rooms.filter(room => room.capacity >= numberOfGuests);
  }
}

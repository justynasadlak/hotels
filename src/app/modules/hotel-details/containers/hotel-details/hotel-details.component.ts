import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../../../../../store';
import { HotelService } from '../../../../services/hotel.service';
import { BookingService } from '../../../../services/booking.service';
import { Booking } from '../../../../resources/models/booking';
import { filter, first, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Facility } from '../../../../resources/models/facility';
import { Room } from '../../../../resources/models/room';
import { SearchDatesFacade } from '../../../../+state/search-dates/search-dates.facade';
import { UserFacade } from '../../../../+state/user/user.facade';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {
  id: string;
  name: string;
  location: string;
  facilities: Facility[];
  rooms: Room[];
  isDisabled = false;

  private bookingData: Booking;
  private startDate: string;
  private endDate: string;
  private username: string;
  private roomsToBook: Room[] = [];
  private successBooking: Booking;

  public constructor(
    private route: ActivatedRoute,
    private store: Store,
    private searchDatesFacade: SearchDatesFacade,
    private userFacade: UserFacade,
    private hotelService: HotelService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.name = params.name;
      this.location = params.location;
      this.facilities = JSON.parse(params.facilities);
      this.rooms = JSON.parse(params.rooms);
    });
    this.userFacade.getUsername();
  }

  onBook(roomId: string): Observable<Booking> {
    this.isDisabled = true;
    this.hotelService.getRoom(roomId).subscribe(room => {
      this.roomsToBook.push(room);
      this.getUsername();

      this.getStartDate();
      this.getEndDate();

      this.bookingData = {
        user: this.username,
        startDate: this.startDate,
        endDate: this.endDate,
        rooms: this.roomsToBook
      };
      console.log(this.bookingData);
      this.bookingService.addBooking(this.bookingData).subscribe(
        val => {
          // this.progressBar = false;
          this.successBooking = val;
          this.router.navigate(['my-profile']);
        },
        error1 => {
          alert(error1);
          this.isDisabled = false;
        }
      );
    });
    return of(this.successBooking);
  }

  private getStartDate(): void {
    this.searchDatesFacade
      .getStartDate()
      .pipe(first())
      .subscribe(date => (this.startDate = date));
  }

  private getEndDate(): void {
    this.searchDatesFacade
      .getEndDate()
      .pipe(first())
      .subscribe(date => (this.endDate = date));
  }

  private getUsername(): void {
    this.userFacade.username$.subscribe(username => (this.username = username));
  }
}

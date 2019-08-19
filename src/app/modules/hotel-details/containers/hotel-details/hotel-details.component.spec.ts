import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDetailsComponent } from './hotel-details.component';
import { SharedModule } from '../../../shared/shared.module';
import { HotelDetailsViewComponent } from '../../components/hotel-details-view/hotel-details-view.component';
import { RouterModule } from '@angular/router';
import { Store } from '../../../../../store';
import { HttpClientModule } from '@angular/common/http';
import { Room } from '../../../../resources/models/room';
import { Observable, of } from 'rxjs';
import { HotelService } from '../../../../services/hotel.service';
import { Booking } from '../../../../resources/models/booking';
import { BookingService } from '../../../../services/booking.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UserProfileComponent } from '../../../user/user-profile/user-profile.component';
import { UserBookingsComponent } from '../../../user/user-bookings/user-bookings.component';

export const room: Room = {
  id: '1',
  number: 1,
  capacity: 1,
  price: 1
};

class MockStore {
  initialState = {
    username: 'test',
    startDate: 'testStartDate',
    endDate: 'testEndDate'
  };

  select<T>(name: string): Observable<T> {
    return of(this.initialState[name]);
  }
}

class MockHotelService {
  getRoom(roomId: string): Observable<Room> {
    return of(room);
  }
}

class MockBookingService {
  addBooking(bookingData: Booking): Observable<Booking> {
    return of(bookingData);
  }
}

describe('HotelDetailsComponent', () => {
  let component: HotelDetailsComponent;
  let fixture: ComponentFixture<HotelDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HotelDetailsComponent,
        HotelDetailsViewComponent,
        UserProfileComponent,
        UserBookingsComponent
      ],
      imports: [
        SharedModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([{ path: 'my-profile', component: UserProfileComponent }]),
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: HotelService, useClass: MockHotelService },
        { provide: BookingService, useClass: MockBookingService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return booked room', () => {
    let booking;

    component.onBook(room.id).subscribe(val => (booking = val));

    expect(booking.user).toEqual('test');
    expect(booking.startDate).toEqual('testStartDate');
    expect(booking.endDate).toEqual('testEndDate');
    expect(booking.rooms).toEqual([room]);
  });
});

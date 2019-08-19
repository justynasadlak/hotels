import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { SharedModule } from '../../../shared/shared.module';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';
import { SearchHotelsListComponent } from '../../components/search-hotels-list/search-hotels-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '../../../../../store';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { Booking } from '../../../../resources/models/booking';
import { Room } from '../../../../resources/models/room';
import { BookingService } from '../../../../services/booking.service';
import { Hotel } from '../../../../resources/models/hotel';
import { HotelService } from '../../../../services/hotel.service';
import { SearchData } from '../../../../resources/models/searchData';

export const room: Room = {
  id: '1',
  number: 1,
  capacity: 1,
  price: 1
};

export const hotels: Hotel[] = [
  {
    id: 1,
    name: 'test',
    location: 'test',
    facilities: [],
    rooms: [room]
  }
];

export const bookings: Booking[] = [
  {
    user: 'test',
    startDate: '2019-08-11T22:00:00.000Z',
    endDate: '2019-08-13T22:00:00.000Z',
    rooms: [room]
  }
];

class MockStore {
  initialState = {
    username: 'test',
    startDate: 'testStartDate',
    endDate: 'testEndDate',
    hotels: hotels,
    rooms: [room],
    facilities: [],
    bookings: bookings
  };

  select<T>(name: string): Observable<T> {
    return of(this.initialState[name]);
  }

  set(name: string, newStateVal: any) {
    this.initialState[name] = newStateVal;
  }
}

class MockBookingService {
  getAllBookings(): Observable<Booking[]> {
    return of(bookings);
  }
}

class MockHotelService {
  getRoom(roomId: string): Observable<Room> {
    return of(room);
  }

  getAllHotels(): Observable<Hotel[]> {
    return of(hotels);
  }
}

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPageComponent, SearchBoxComponent, SearchHotelsListComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: BookingService, useClass: MockBookingService },
        { provide: HotelService, useClass: MockHotelService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return searched hotels', () => {
    let hotels = [];

    const searchValues: SearchData = {
      city: 'test',
      guests: 1,
      checkIn: 'Thu Aug 01 2019 00:00:00 GMT+0200',
      checkOut: 'Sat Aug 03 2019 00:00:00 GMT+0200'
    };
    component.onSearch(searchValues).subscribe(res => console.log(res));
    // console.log(hotels);
    // const bs = TestBed.get(HotelService);
    // bs.getAllHotels().subscribe(x => console.log(x));
  });
});

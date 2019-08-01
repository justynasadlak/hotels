import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../services/booking.service';
import {Hotel} from '../../resources/models/hotel';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Room} from '../../resources/models/room';
import {Store} from '../../../store';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  private hotels: Hotel[];
  private rooms: Room[];
  private location: string;
  private hotels$: Observable<Hotel[]>;
  private locations$: Observable<string[]>;
  private rooms$: Observable<Room[]>;
  private filterRooms$: Observable<Room[]>;
  private filterHotels$: Observable<Hotel[]>;

  constructor(private bookingService: BookingService, private formBuilder: FormBuilder, private router: Router, private store: Store) {
  }

  ngOnInit(): void {
    this.getHotels();
  }

  onSearch(loc: string): void {
    this.location = loc;
    this.filterHotels$ = this.hotels$.pipe(map(hotels => hotels.filter(h => h.location === this.location)));
    this.filterRooms$ = this.rooms$.pipe(map(rooms => rooms.filter(room => room.hotel.location === this.location)));
  }

  private getHotels(): void {
    this.bookingService.getAllHotels().subscribe(hotel => {
      this.getRooms();
      this.hotels$ = this.store.select<Hotel[]>('hotels');
      this.locations$ = this.getLocations();
    });
  }

  private getRooms(): void {
    this.bookingService.getAllRooms().subscribe(rooms => this.rooms$ = this.store.select<Room[]>('rooms'));
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

}

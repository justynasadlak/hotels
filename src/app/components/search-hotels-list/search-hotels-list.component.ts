import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Hotel} from '../../resources/models/hotel';
import {Room} from '../../resources/models/room';
import {Facility} from '../../resources/models/facility';

@Component({
  selector: 'app-search-hotels-list',
  templateUrl: './search-hotels-list.component.html',
  styleUrls: ['./search-hotels-list.component.scss']
})
export class SearchHotelsListComponent {

  @Input()
  hotels: Hotel[];

  // @Input()
  // rooms: Room[];
  //
  // @Input()
  // facilities: Facility[];

  @Input()
  isDisabled: boolean;

  @Output()
  book: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  details: EventEmitter<Hotel> = new EventEmitter<Hotel>();


  onDetails(hotel: Hotel): void {
    this.details.emit(hotel);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hotel } from '../../../../resources/models/hotel';

@Component({
  selector: 'app-search-hotels-list',
  templateUrl: './search-hotels-list.component.html',
  styleUrls: ['./search-hotels-list.component.scss']
})
export class SearchHotelsListComponent {
  @Input()
  hotels: Hotel[];

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

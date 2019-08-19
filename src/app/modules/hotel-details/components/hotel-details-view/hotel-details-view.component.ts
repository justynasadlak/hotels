import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Facility } from '../../../../resources/models/facility';
import { Room } from '../../../../resources/models/room';

@Component({
  selector: 'app-hotel-details-view',
  templateUrl: './hotel-details-view.component.html',
  styleUrls: ['./hotel-details-view.component.scss']
})
export class HotelDetailsViewComponent {
  @Input()
  name: string;

  @Input()
  location: string;

  @Input()
  facilities: Facility[];

  @Input()
  rooms: Room[];

  @Input()
  isDisabled: boolean;

  @Output()
  book: EventEmitter<string> = new EventEmitter<string>();

  onBook(room: Room): void {
    this.book.emit(room.id);
  }
}

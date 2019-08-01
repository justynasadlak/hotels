import {Component, Input, OnInit} from '@angular/core';
import {Hotel} from '../../resources/models/hotel';
import {Room} from '../../resources/models/room';

@Component({
  selector: 'app-search-hotels-list',
  templateUrl: './search-hotels-list.component.html',
  styleUrls: ['./search-hotels-list.component.scss']
})
export class SearchHotelsListComponent {

  @Input()
  hotels: Hotel[];

  @Input()
  rooms: Room[];

}

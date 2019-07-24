import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Input()
  filteredOptions: string[];

  @Output()
  search = new EventEmitter();

  cities = new FormControl();

  constructor() {
  }

  ngOnInit() {
  }

  onSearch(): void {
    this.search.emit();
  }

}

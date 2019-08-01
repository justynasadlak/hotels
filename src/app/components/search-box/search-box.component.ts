import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  searchForm: FormGroup;
  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();
  private filteredLocations: string[];
  private allLocations: string[];

  constructor(private formBuilder: FormBuilder) {
  }

  @Input() set locations(locations: string[]) {
    if (locations) {
      this.allLocations = locations;

      if (this.searchForm.controls.city.value) {
        this.filteredLocations = this._filter(locations, this.searchForm.controls.city.value);
      }
    }
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
        city: [''],
        guests: [''],
        checkIn: [''],
        checkOut: ['']
      }
    );
    this.setFilteredLocations();
  }

  onSearch(): void {
    this.search.emit(this.searchForm.value);

  }

  private setFilteredLocations(): void {
    this.searchForm.controls.city.valueChanges.subscribe(
      value => {
        this.filteredLocations = this._filter(this.allLocations, value);
      }
    );
  }

  private _filter(locations: string[], value: string): string[] {
    const filterValue = value.toLowerCase();
    return locations.filter(option => option.toLowerCase().includes(filterValue));
  }
}

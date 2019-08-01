import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
        city: ['', Validators.required],
        guests: ['', Validators.required],
        checkIn: ['', Validators.required],
        checkOut: ['', Validators.required]
      }
    );
    this.setFilteredLocations();
  }

  onSearch(): void {
    this.isStartDateBeforeEndDate(this.searchForm) ? this.search.emit(this.searchForm.value) : alert('Check-in should be earlier than check-out!');

  }

  private isStartDateBeforeEndDate(searchForm: FormGroup) {
    return searchForm.controls.checkIn.value < searchForm.controls.checkOut.value;
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

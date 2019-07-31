import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  private cities = new FormControl();
  private filteredLocations: string[];
  private allLocations: string[];
  searchForm: FormGroup

  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {
  }

  @Input() set locations(locations: string[]) {
    if (locations) {
      this.allLocations = locations;

      if (this.cities.value) {
        this.filteredLocations = this._filter(locations, this.cities.value);
        console.log(this.filteredLocations);
      }
    }
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
        cities: [''],
        hotel: [''],
        guests: [''],
        checkIn: [''],
        duration: ['']
      }
    );
    this.setFilteredLocations();
  }

  onSearch(): void {
    this.search.emit(this.cities.value);

  }

  private setFilteredLocations(): void {
    this.cities.valueChanges.subscribe(
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHotelsListComponent } from './search-hotels-list.component';

describe('SearchHotelsListComponent', () => {
  let component: SearchHotelsListComponent;
  let fixture: ComponentFixture<SearchHotelsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchHotelsListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHotelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

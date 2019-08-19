import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDetailsViewComponent } from './hotel-details-view.component';

describe('HotelDetailsViewComponent', () => {
  let component: HotelDetailsViewComponent;
  let fixture: ComponentFixture<HotelDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotelDetailsViewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

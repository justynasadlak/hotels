import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelDetailsComponent } from './containers/hotel-details/hotel-details.component';
import { HotelDetailsViewComponent } from './components/hotel-details-view/hotel-details-view.component';
import { HotelDetailsRoutingModule } from './hotel-details-routing.module';
import { SharedModule } from '../shared/shared.module';
import { Store } from '../../../store';
import { SearchDatesFacade } from '../../+state/search-dates/search-dates.facade';

@NgModule({
  declarations: [HotelDetailsComponent, HotelDetailsViewComponent],
  exports: [HotelDetailsComponent],
  imports: [CommonModule, SharedModule, HotelDetailsRoutingModule],
  providers: [SearchDatesFacade, Store]
})
export class HotelDetailsModule {}

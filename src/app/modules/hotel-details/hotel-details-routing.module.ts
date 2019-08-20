import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HotelDetailsComponent } from './containers/hotel-details/hotel-details.component';

const routes: Routes = [
  {
    path: '',
    component: HotelDetailsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelDetailsRoutingModule {}

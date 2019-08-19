import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { initialState, MAIN_PAGE_FEATURE_KEY, mainPageReducer } from './+state/main-page.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MainPageEffects } from './+state/main-page.effects';
import { LandingPageComponent } from './containers/landing-page/landing-page.component';
import { MainPageFacade } from './+state/main-page.facade';
import { SharedModule } from '../shared/shared.module';
import { MainPageRoutingModule } from './main-page-routing.module';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SearchHotelsListComponent } from './components/search-hotels-list/search-hotels-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '../../../store';

@NgModule({
  declarations: [LandingPageComponent, SearchBoxComponent, SearchHotelsListComponent],
  exports: [LandingPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    MainPageRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(MAIN_PAGE_FEATURE_KEY, mainPageReducer, { initialState }),
    EffectsModule.forFeature([MainPageEffects])
  ],
  providers: [MainPageFacade, Store]
})
export class MainPageModule {}

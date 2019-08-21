import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CustomMaterialModule } from './modules/custom-material/custom-material.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { initialState, USER_FEATURE_KEY, userReducer } from '../../+state/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../../+state/user/user.effects';
import { UserFacade } from '../../+state/user/user.facade';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
    RouterModule,
    StoreModule.forFeature(USER_FEATURE_KEY, userReducer, { initialState }),
    EffectsModule.forFeature([UserEffects])
  ],
  exports: [CustomMaterialModule, ToolbarComponent],
  providers: [UserFacade]
})
export class SharedModule {}

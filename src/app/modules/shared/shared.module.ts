import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {CustomMaterialModule} from './modules/custom-material/custom-material.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    RouterModule
  ],
  exports: [
    CustomMaterialModule,
    ToolbarComponent
  ]
})
export class SharedModule { }

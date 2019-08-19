import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatSelectModule,
  MatOptionModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatListModule,
  MatDividerModule,
  MatProgressBarModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatProgressBarModule
  ]
})
export class CustomMaterialModule {}

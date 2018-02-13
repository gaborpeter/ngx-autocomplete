import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxAutocompleteComponent } from './ngx-autocomplete.component';
import { NgxAutocompleteService } from './ngx-autocomplete.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    NgxAutocompleteComponent
  ],
  exports: [
    NgxAutocompleteComponent
  ],
  providers: [
      NgxAutocompleteService
  ]
})
export class NgxAutocompleteModule { }
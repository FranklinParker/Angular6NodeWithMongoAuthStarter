import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactAddEditComponent} from './components/contact-add-edit/contact-add-edit.component';
import {SharedModule} from "../shared/shared.module";
import { ContactMainComponent } from './components/contact-main/contact-main.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ContactAddEditComponent,
    ContactMainComponent
  ],
  exports: [
    ContactMainComponent
  ]
})
export class ContactModule {
}

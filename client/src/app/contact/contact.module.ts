import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactComponent} from './components/contact/contact.component';
import {SharedModule} from "../shared/shared.module";
import { ContactMainComponent } from './components/contact-main/contact-main.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ContactComponent,
    ContactMainComponent
  ],
  exports: [
    ContactMainComponent
  ]
})
export class ContactModule {
}

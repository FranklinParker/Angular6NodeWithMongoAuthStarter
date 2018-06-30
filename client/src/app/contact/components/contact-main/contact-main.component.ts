import {Component, OnInit} from '@angular/core';
import {Contact} from "../../model/contact";
import {ContactService} from "../../service/contact.service";

@Component({
  selector: 'app-contact-main',
  templateUrl: './contact-main.component.html',
  styleUrls: ['./contact-main.component.css']
})
export class ContactMainComponent implements OnInit {
  contact: Contact = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null
  };
  selectedTabIndex = 0;

  constructor(private contactService: ContactService) {
  }

  async ngOnInit() {
    await this.contactService.getContacts();

  }


  goToResultTab() {
    this.selectedTabIndex = 1;

  }

  onEditContact(contact: Contact){
    this.contact = contact;
    this.selectedTabIndex = 1;
  }

}

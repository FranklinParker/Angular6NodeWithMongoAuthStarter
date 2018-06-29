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
    firstName: null,
    lastName: null,
    email: 'test',
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

}

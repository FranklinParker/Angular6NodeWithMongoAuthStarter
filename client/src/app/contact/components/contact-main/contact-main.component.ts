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
    await this.contactService.getContacts(1, 5);

  }

  /**
   * a contact is selected go to edit tab
   *
   *
   * @param {Contact} contact
   */
  onEditContact(contact: Contact){
    this.contact = contact;
    this.selectedTabIndex = 1;
  }

  /**
   *
   *
   */
  onSetToNewContact(){
    this.contact = {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null

    }
    console.log('reset contact',  this.contact)
  }

}

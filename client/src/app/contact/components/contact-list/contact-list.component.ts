import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Contact} from "../../model/contact";
import {ContactService} from "../../service/contact.service";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contactList: Contact[] = [];
  contactListSubs: Subscription;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactListSubs = this.contactService.getContactListObservable()
      .subscribe((contactList: Contact[]) => {
        this.contactList = contactList;
      });
  }

  ngOnDestroy() {
    this.contactListSubs.unsubscribe();
  }

}

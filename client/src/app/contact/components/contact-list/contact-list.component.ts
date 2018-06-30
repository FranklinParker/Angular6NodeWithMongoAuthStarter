import {Component, OnInit, Input, OnDestroy, ViewChild} from '@angular/core';
import {Contact} from "../../model/contact";
import {ContactService} from "../../service/contact.service";
import {Subscription} from "rxjs/index";
import { MatTableDataSource, MatPaginator} from "@angular/material";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contactList: Contact[] = [];
  contactListSubs: Subscription;
  dataSource = new MatTableDataSource<Contact>([]);
  displayedColumns = ['firstName','lastName','email', 'phone'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedContactId: string;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactListSubs = this.contactService.getContactListObservable()
      .subscribe((contactList: Contact[]) => {
        this.contactList = contactList;
        this.dataSource.data = this.contactList;
      });
  }

  ngOnDestroy() {
    this.contactListSubs.unsubscribe();
  }

  edit(contact: Contact){
    console.log('edit contact', contact);
  }

  rowClicked(contact:Contact){
    this.selectedContactId = contact.id;

  }

}

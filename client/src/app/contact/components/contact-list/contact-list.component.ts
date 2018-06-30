import {Component, OnInit, Input, OnDestroy, ViewChild, EventEmitter, Output} from '@angular/core';
import {Contact} from "../../model/contact";
import {ContactService} from "../../service/contact.service";
import {Subscription} from "rxjs/index";
import { MatTableDataSource, MatPaginator, PageEvent} from "@angular/material";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  isLoading = false;
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  contactList: Contact[] = [];
  contactListSubs: Subscription;
  dataSource = new MatTableDataSource<Contact>([]);
  displayedColumns = ['firstName','lastName','email', 'phone'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() editContactEvent = new EventEmitter<Contact>();
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

  /**
   * clicked a row to edit
   *
   * @param {Contact} contact
   */
  edit(contact: Contact){
    this.editContactEvent.emit(contact);
  }

  /**
   * used to highlight a row
   *
   * @param {Contact} contact
   */
  rowClicked(contact:Contact){
    this.selectedContactId = contact.id;
  }

  /**
   * change page
   *
   *
   * @param {PageEvent} pageData
   */
  onChangedPage(pageData: PageEvent) {
    console.log('page data', pageData);
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    console.log('this.postsPerPage:'+ this.postsPerPage);
    this.contactService.getContacts(this.currentPage, this.postsPerPage);

  }

}

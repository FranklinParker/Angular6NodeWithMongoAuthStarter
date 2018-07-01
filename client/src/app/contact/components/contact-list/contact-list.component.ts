import {Component, OnInit, Input, OnDestroy, ViewChild, EventEmitter, Output} from '@angular/core';
import {Contact} from "../../model/contact";
import {ContactService} from "../../service/contact.service";
import {Subscription} from "rxjs/index";
import {MatTableDataSource, MatPaginator, PageEvent, MatSort} from "@angular/material";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  filterAll:String;
  filterLastName: string;
  isLoading = false;
  totalContacts = 10;
  contactsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  contactList: Contact[] = [];
  filteredContactList: Contact[] = [];
  contactListSubs: Subscription;
  dataSource = new MatTableDataSource<Contact>([]);
  displayedColumns = ['firstName','lastName','email', 'phone'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() editContactEvent = new EventEmitter<Contact>();
  selectedContactId: string;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactListSubs = this.contactService.getContactListObservable()
      .subscribe((result:{contacts: Contact[], numberRecords: number}) => {
        this.contactList = result.contacts;
        this.dataSource.data = this.contactList;
        this.totalContacts = result.numberRecords;
      });


  }

  ngOnDestroy() {
    this.contactListSubs.unsubscribe();
  }

  sortField(field:string){
    console.log('this.sort', this.sort);
    console.log('this.sort.active', this.sort.active);
    console.log('this.sort.active', this.sort.direction);

    this.dataSource.sort = this.sort;

  }

  /**
   * clicked a row to edit
   *
   * @param {Contact} contact
   */
  edit(contact: Contact){
    this.editContactEvent.emit(contact);
  }

  /***
   * filter the contact list
   *
   * @param {string} filter
   */
  applyLastNameFilter(filter: string){
    this.filterAll = null;
    if(!filter || filter.length===0){
      this.dataSource.data = this.contactList;
      return;
    }
    this.filteredContactList = this.contactList.filter((contact)=> contact.lastName.startsWith(filter));
    this.dataSource.data = this.filteredContactList;

  }

  /***
   * filter the contact list
   *
   * @param {string} filter
   */
  applyAnyFilter(filter: string){
    this.filterLastName = null;
    this.dataSource.data = this.contactList
    this.dataSource.filter = filter;

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
    this.filterAll = null;
    this.filterLastName = null;
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.contactsPerPage = pageData.pageSize;
    this.contactService.getContacts(this.currentPage, this.contactsPerPage);

  }

}

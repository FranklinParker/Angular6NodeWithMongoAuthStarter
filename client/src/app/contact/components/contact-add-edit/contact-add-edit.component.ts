import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Contact} from "../../model/contact";
import {ContactService} from "../../service/contact.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-contact',
  templateUrl: './contact-add-edit.component.html',
  styleUrls: ['./contact-add-edit.component.css']
})
export class ContactAddEditComponent implements OnInit {
  @Input() contact: Contact;
  constructor(private contactService: ContactService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  /**
   * save a contact-add-edit
   *
   * @param {NgForm} form
   * @returns {Promise<void>}
   */
  async onSubmit(form: NgForm){
    const result: {success:boolean, message?:string} = await this.contactService.saveContact(this.contact);
    if(result.success){
      this.snackBar.open('Contact Saved!','',{
        duration: 5000
      });
    }else{
      this.snackBar.open(result.message,'Error Saving Contact',{
        duration: 9000
      });
    }
  }

  get headerMessage(){
    return this.contact.id === null ? "Adding New Contact": "Editing Contact";
  }

  /***
   * returns true if editing an existing record
   *
   *
   * @returns {boolean}
   */
  get isEditing(): boolean{
    return !!this.contact.id;
  }

}

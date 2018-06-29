import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Contact} from "../../model/contact";
import {ContactService} from "../../service/contact.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact: Contact ={
    firstName: null,
    lastName: null,
    email: null,
    phone: null
  };
  constructor(private contactService: ContactService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  /**
   * save a contact
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

}

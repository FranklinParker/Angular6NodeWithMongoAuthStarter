import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Contact} from "../model/contact";
import {Subject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  getUrl = environment.apiUrl + 'contact';
  postUrl = environment.apiUrl + 'contact';
  contactList: Contact[] = [];
  private contactListSubject = new Subject<Contact[]> ();



  constructor(private http: HttpClient) {
  }

  /**
   * get contact records
   *
   * @returns {Promise<any>}
   */
  async getContacts(pageSize: number, currentPage: number): Promise<any> {

    const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
    const url = this.getUrl + queryParams;
    try {
      const data: Contact[] = await this.http.get<{ success: boolean, records: any }>(url)
        .pipe(map(contactData => {
          return contactData.records.map(contact => {
            return {
              id: contact._id,
              firstName: contact.firstName,
              lastName: contact.lastName,
              email: contact.email,
              phone: contact.phone

            };
          });
        })).toPromise();
      this.contactList = data;
      this.contactListSubject.next(this.contactList);
    } catch (e) {
      console.log('error getting contacts', e);
    }


  }

  /**
   * listens to changes in the contact list subject
   *
   * @returns {Observable<Contact[]>}
   */
  getContactListObservable(){
    return this.contactListSubject.asObservable();
  }

  /**
   *
   *
   * @param {number} currentPage
   * @param pageSize
   */
  // getPosts(currentPage: number, pageSize) {
  //   const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
  //   this.http
  //     .get<{ message: string; posts: any, maxPosts: number }>(BACKEND_URL + queryParams)
  //     .pipe(
  //       map(postData => {
  //         return {
  //           posts: postData.posts.map(post => {
  //             return {
  //               title: post.title,
  //               content: post.content,
  //               id: post._id,
  //               imagePath: post.imagePath,
  //               creator: post.creator
  //             };
  //           }),
  //           maxPosts: postData.maxPosts
  //         };
  //       })
  //     ).subscribe(transformedPosts => {
  //     this.posts = transformedPosts.posts;
  //     this.postsUpdated.next({posts: [...this.posts], postCount: transformedPosts.maxPosts});
  //   });
  // }


  /**
   *
   * save a new contact
   *
   * @param {Contact} contact
   * @returns {Promise<any>}
   */
  async saveNewContact(contact: Contact): Promise<{ success: boolean, message?: string }> {
    try {
      const result = await this.http.post<any>(this.postUrl,
        contact
      )
        .pipe(map(result => {
          return result;
        })).toPromise();
      console.log('contact new save result', result);
      return result;
    } catch (e) {
      console.log('error saving contact-add-edit', e);
      return {
        success: false,
        message: 'System Error Saving Record'
      };

    }
  }


  /**
   *
   * updates an existing contact
   *
   * @param {Contact} contact
   * @returns {Promise<any>}
   */
  async updateExistingContact(contact: Contact): Promise<{ success: boolean, message?: string }> {
    try {
      const result = await this.http.put<any>(this.postUrl,
        contact
      )
        .pipe(map(result => {
          return result;
        })).toPromise();
      console.log('contact update save result', result);
      return result;
    } catch (e) {
      console.log('error saving contact', e);
      return {
        success: false,
        message: 'System Error Saving Record'
      };

    }
  }
}

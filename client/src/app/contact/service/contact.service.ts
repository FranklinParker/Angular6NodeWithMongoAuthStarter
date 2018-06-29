import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Contact} from "../model/contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  getUrl = environment.apiUrl + 'contact';
  postUrl = environment.apiUrl + 'contact';



  constructor(private http: HttpClient) {
  }

  /**
   * get contact records
   *
   * @returns {Promise<any>}
   */
  async getContacts(): Promise<any> {
    try {
      const data: Contact[] = await this.http.get<{ success: boolean, records: any }>(this.getUrl)
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
      console.log('data ', data);
    } catch (e) {
      console.log('error getting contacts', e);
    }


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
   * save a contact-add-edit
   *
   * @param {Contact} contact
   * @returns {Promise<any>}
   */
  async saveContact(contact: Contact): Promise<{ success: boolean, message?: string }> {
    try {
      const result = await this.http.post<any>(this.postUrl,
        contact
      )
        .pipe(map(result => {
          return result;
        })).toPromise();
      console.log('contact-add-edit save result', result);
      return result;
    } catch (e) {
      console.log('error saving contact-add-edit', e);
      return {
        success: false,
        message: 'System Error Saving Record'
      };

    }
  }
}

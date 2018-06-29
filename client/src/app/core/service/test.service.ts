import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TestService {
  getUrl = environment.apiUrl + 'test';
  postUrl = environment.apiUrl + 'testpost';


  constructor(private http: HttpClient) {
  }

  async getData(): Promise<any> {

      const data = await this.http.get<{ success: boolean,records: any }>(this.getUrl
        + '?name=test')
        .pipe(map(result => {
          return result.records;
        })).toPromise();
      return data;



  }

  async postData(data): Promise<any> {

    try {
      const result = await this.http.post<any>(this.postUrl,
        data
      )
        .pipe(map(result => {
          console.log('result', result);
          return result;
        })).toPromise();
      return result;
    } catch (e) {
      return {
        success: false,
        error: e.getMessages()
      };

    }
  }

}

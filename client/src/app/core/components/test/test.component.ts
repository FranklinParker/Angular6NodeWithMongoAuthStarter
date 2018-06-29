import {Component, OnInit} from '@angular/core';
import {TestService} from "../../service/test.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  isLoading = false;
  result = 'no data';

  constructor(private testService: TestService) {
  }

  ngOnInit() {
  }

  async testApi() {
    const data = await this.testService.getData();
    this.result = JSON.stringify(data);
  }

  async testPost(){
    const data = await this.testService.postData({test: 'fparker'});
    this.result = JSON.stringify(data);

  }

}

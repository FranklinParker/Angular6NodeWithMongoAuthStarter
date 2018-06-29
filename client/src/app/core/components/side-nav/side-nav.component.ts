import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {AuthService} from "../../../auth/service/auth.service";
import {LoggedInUser} from "../../../auth/model/loggedInUser";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  @Output('closeSideNav') closeSideNav = new EventEmitter();
  userLoggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserLoggedInUserObservable()
      .subscribe((loggedInUser:LoggedInUser)=>{
        this.userLoggedIn = !!loggedInUser;
        console.log('userLoggedIn:' + this.userLoggedIn);
      });

  }

  ngOnDestroy(){
    console.log('side nav destroyed');
  }


  onSidenavClose(){
    this.closeSideNav.emit();
  }

  onLogout(){
    this.authService.logout();
    this.onSidenavClose();
  }

}

import { Component, OnInit } from '@angular/core';

import { SocialAuthService, GoogleLoginProvider, SocialUser, MicrosoftLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rpl-frontend';
  user: SocialUser;
  loggedIn: boolean;

  constructor(private readonly _authService: SocialAuthService) { 
    this._authService.authState.subscribe((user) => {
          this.signInWithMicrosoft()
          this.user = user;
        });
  }
 
  ngAfterViewInit() {
     
  }

  ngOnInit() {
  }
  signInWithMicrosoft(): void {
    this._authService.signIn(MicrosoftLoginProvider.PROVIDER_ID);
  }


}



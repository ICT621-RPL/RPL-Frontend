import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rpl-frontend';
  isAdmin = false;
  url = ""
  constructor(private router: ActivatedRoute) {
    this.url = window.location.pathname
    const pathname = this.url.split('/').filter(Boolean)
    if(this.url.split('/').filter(Boolean).length > 1){
       this.isAdmin = this.url.split('/').filter(Boolean)[0] === 'admin'
    }
    else {
       this.isAdmin = this.url.split('/').filter(Boolean).pop() === 'admin'
    }

  }

  ngOnInit() {
  }
}

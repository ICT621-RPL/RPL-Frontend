import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-murdoch-navbar',
  templateUrl: './murdoch-navbar.component.html',
  styleUrls: ['./murdoch-navbar.component.scss']
})
export class MurdochNavbarComponent implements OnInit {
  @Input() isAdmin: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickTracker(): void {
    this.router.navigate(['/tracker'])
  }
}

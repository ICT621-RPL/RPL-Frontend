import { Component, OnInit } from '@angular/core';
import { AddExperienceComponent } from './../add-experience/add-experience.component';

import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-rpl-forms',
  templateUrl: './rpl-forms.component.html',
  styleUrls: ['./rpl-forms.component.scss']
})
export class RplFormsComponent implements OnInit {

  public closeResult = '';
  constructor(private modalService: MatDialog) { }

  ngOnInit(): void {
  }

  public openModal(): void {
    this.modalService.open(AddExperienceComponent, {
       position: {
        top: '0',
        right: '0',
      },
      width: '500px',
      height: '100%',
    })
	}
}

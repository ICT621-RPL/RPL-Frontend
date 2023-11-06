import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RplFormsComponent } from './rpl-forms.component';

describe('RplFormsComponent', () => {
  let component: RplFormsComponent;
  let fixture: ComponentFixture<RplFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RplFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RplFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MurdochNavbarComponent } from './murdoch-navbar.component';

describe('MurdochNavbarComponent', () => {
  let component: MurdochNavbarComponent;
  let fixture: ComponentFixture<MurdochNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MurdochNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MurdochNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

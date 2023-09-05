import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MurdochFooterComponent } from './murdoch-footer.component';

describe('MurdochFooterComponent', () => {
  let component: MurdochFooterComponent;
  let fixture: ComponentFixture<MurdochFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MurdochFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MurdochFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

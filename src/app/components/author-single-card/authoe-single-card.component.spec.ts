import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoeSingleCardComponent } from './authoe-single-card.component';

describe('AuthoeSingleCardComponent', () => {
  let component: AuthoeSingleCardComponent;
  let fixture: ComponentFixture<AuthoeSingleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthoeSingleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthoeSingleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminCardComponent } from './home-admin-card.component';

describe('HomeAdminCardComponent', () => {
  let component: HomeAdminCardComponent;
  let fixture: ComponentFixture<HomeAdminCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeAdminCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAdminCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

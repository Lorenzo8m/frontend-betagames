import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorUpdateModalComponent } from './author-update-modal.component';

describe('AuthorUpdateModalComponent', () => {
  let component: AuthorUpdateModalComponent;
  let fixture: ComponentFixture<AuthorUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorUpdateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

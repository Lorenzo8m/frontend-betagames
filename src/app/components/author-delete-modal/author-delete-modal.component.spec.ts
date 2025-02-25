import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDeleteModalComponent } from './author-delete-modal.component';

describe('AuthorDeleteModalComponent', () => {
  let component: AuthorDeleteModalComponent;
  let fixture: ComponentFixture<AuthorDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

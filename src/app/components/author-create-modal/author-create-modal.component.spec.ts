import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorCreateModalComponent } from './author-create-modal.component';

describe('AuthorCreateModalComponent', () => {
  let component: AuthorCreateModalComponent;
  let fixture: ComponentFixture<AuthorCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

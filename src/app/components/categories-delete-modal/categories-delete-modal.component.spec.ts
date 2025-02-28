import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDeleteModalComponent } from './categories-delete-modal.component';

describe('CategoriesDeleteModalComponent', () => {
  let component: CategoriesDeleteModalComponent;
  let fixture: ComponentFixture<CategoriesDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesUpdateModalComponent } from './categories-update-modal.component';

describe('CategoriesUpdateModalComponent', () => {
  let component: CategoriesUpdateModalComponent;
  let fixture: ComponentFixture<CategoriesUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesUpdateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

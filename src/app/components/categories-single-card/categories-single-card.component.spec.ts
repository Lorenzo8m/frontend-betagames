import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSingleCardComponent } from './categories-single-card.component';

describe('CategoriesSingleCardComponent', () => {
  let component: CategoriesSingleCardComponent;
  let fixture: ComponentFixture<CategoriesSingleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesSingleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesSingleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

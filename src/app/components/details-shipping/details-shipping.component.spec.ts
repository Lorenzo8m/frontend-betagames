import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsShippingComponent } from './details-shipping.component';

describe('DetailsShippingComponent', () => {
  let component: DetailsShippingComponent;
  let fixture: ComponentFixture<DetailsShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsShippingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorsCardComponent } from './editors-card.component';

describe('EditorsCardComponent', () => {
  let component: EditorsCardComponent;
  let fixture: ComponentFixture<EditorsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

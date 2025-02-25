import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglegameCardComponent } from './singlegame-card.component';

describe('SinglegameCardComponent', () => {
  let component: SinglegameCardComponent;
  let fixture: ComponentFixture<SinglegameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SinglegameCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglegameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDeleteModalComponent } from './game-delete-modal.component';

describe('GameDeleteModalComponent', () => {
  let component: GameDeleteModalComponent;
  let fixture: ComponentFixture<GameDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

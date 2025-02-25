import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameModifyModalComponent } from './game-modify-modal.component';

describe('GameModifyModalComponent', () => {
  let component: GameModifyModalComponent;
  let fixture: ComponentFixture<GameModifyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameModifyModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameModifyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

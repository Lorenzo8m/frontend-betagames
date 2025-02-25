import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCreateModalComponent } from './game-create-modal.component';

describe('GameCreateModalComponent', () => {
  let component: GameCreateModalComponent;
  let fixture: ComponentFixture<GameCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

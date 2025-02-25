import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorSingleCardComponent } from './editor-single-card.component';

describe('EditorSingleCardComponent', () => {
  let component: EditorSingleCardComponent;
  let fixture: ComponentFixture<EditorSingleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorSingleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorSingleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

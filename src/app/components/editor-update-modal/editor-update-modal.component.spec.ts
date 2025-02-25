import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorUpdateModalComponent } from './editor-update-modal.component';

describe('EditorUpdateModalComponent', () => {
  let component: EditorUpdateModalComponent;
  let fixture: ComponentFixture<EditorUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorUpdateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDeleteModalComponent } from './editor-delete-modal.component';

describe('EditorDeleteModalComponent', () => {
  let component: EditorDeleteModalComponent;
  let fixture: ComponentFixture<EditorDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

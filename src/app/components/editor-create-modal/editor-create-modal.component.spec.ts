import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCreateModalComponent } from './editor-create-modal.component';

describe('EditorCreateModalComponent', () => {
  let component: EditorCreateModalComponent;
  let fixture: ComponentFixture<EditorCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

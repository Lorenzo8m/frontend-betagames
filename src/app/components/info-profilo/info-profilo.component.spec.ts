import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProfiloComponent } from './info-profilo.component';

describe('InfoProfiloComponent', () => {
  let component: InfoProfiloComponent;
  let fixture: ComponentFixture<InfoProfiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoProfiloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoProfiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroestudiantesComponent } from './registroestudiantes.component';

describe('RegistroestudiantesComponent', () => {
  let component: RegistroestudiantesComponent;
  let fixture: ComponentFixture<RegistroestudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroestudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroestudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

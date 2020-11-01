import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionestudiantesComponent } from './sesionestudiantes.component';

describe('SesionestudiantesComponent', () => {
  let component: SesionestudiantesComponent;
  let fixture: ComponentFixture<SesionestudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionestudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionestudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

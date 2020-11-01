import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionmaestrosComponent } from './sesionmaestros.component';

describe('SesionmaestrosComponent', () => {
  let component: SesionmaestrosComponent;
  let fixture: ComponentFixture<SesionmaestrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionmaestrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionmaestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

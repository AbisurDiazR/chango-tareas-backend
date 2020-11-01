import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistromaestrosComponent } from './registromaestros.component';

describe('RegistromaestrosComponent', () => {
  let component: RegistromaestrosComponent;
  let fixture: ComponentFixture<RegistromaestrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistromaestrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistromaestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpDashboardComponent } from './wp-dashboard.component';

describe('WpDashboardComponent', () => {
  let component: WpDashboardComponent;
  let fixture: ComponentFixture<WpDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

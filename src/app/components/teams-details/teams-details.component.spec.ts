import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsDetailsComponent } from './teams-details.component';

describe('TeamsDetailsComponent', () => {
  let component: TeamsDetailsComponent;
  let fixture: ComponentFixture<TeamsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamsDetailsComponent]
    });
    fixture = TestBed.createComponent(TeamsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

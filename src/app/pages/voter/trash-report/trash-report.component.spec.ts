import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashReportComponent } from './trash-report.component';

describe('TrashReportComponent', () => {
  let component: TrashReportComponent;
  let fixture: ComponentFixture<TrashReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrashReportComponent]
    });
    fixture = TestBed.createComponent(TrashReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

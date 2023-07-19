import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoterRoutingModule } from './voter-routing.module';
import { PollComponent } from './poll/poll.component';
import { ReportComponent } from './report/report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TrashReportComponent } from './trash-report/trash-report.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  declarations: [
    PollComponent,
    ReportComponent,
    TrashReportComponent
   ],
  imports: [
    CommonModule,
    VoterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzTableModule,
    NzDatePickerModule
  ]
})
export class VoterModule { }

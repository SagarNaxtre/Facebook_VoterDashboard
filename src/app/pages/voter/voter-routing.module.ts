import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { PollComponent } from './poll/poll.component';
 import { ReportComponent } from './report/report.component';
import { TrashReportComponent } from './trash-report/trash-report.component';
 
const routes: Routes = [
  {path: "poll", component: PollComponent},
  {path : "report", component: ReportComponent},
  {path: "trash-report", component: TrashReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoterRoutingModule { }

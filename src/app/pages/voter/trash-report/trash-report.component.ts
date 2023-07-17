import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import * as moment from 'moment';

@Component({
  selector: 'app-trash-report',
  templateUrl: './trash-report.component.html',
  styleUrls: ['./trash-report.component.scss']
})
export class TrashReportComponent {
  respone: any;
  constructor(private reportService: ReportService, private formBuilder: FormBuilder){} 

  ngOnInit(): void {
    this.responseData();
   
  }

  responseData(){
    this.reportService.responseData().subscribe((res : any) =>{
      this.respone = res.data;
      this.respone.map((item:any) =>{
        item.timestamp1 = moment( new Date(item.timestamp).getTime() + 5 * 30 * 60 * 1000).format("MM-DD-YYYY HH:mm:ss")
      })
      console.log(res);
      
    })
  }
}

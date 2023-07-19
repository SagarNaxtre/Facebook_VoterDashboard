import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { endOfMonth } from 'date-fns';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
 respone : any =[];
 loading = false;
 ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };
 reportForm: FormGroup;
 PageIndex = 1;
 isLoadingOne = false;
 filteredData: any =[];
  AllReport = {
  Id: '',
  Mobile_number: '',
  Reply_text: '',
  timestamp: ''
};
  constructor(private reportService: ReportService, private fb: FormBuilder){
    this.reportForm = fb.group({ 
      date_range: [null, Validators.required], 
      
     })
  }

  ngOnInit(): void {
    this.responseData(); 
  }

  
  responseData(){
    this.reportService.responseData().subscribe((res: any) => {
      this.respone = res.data;
      this.respone = this.respone.filter((item: any) => item.is_deleted == 0);
      this.respone = this.respone.sort((a: any, b: any) => {
        return <any>new Date(b.Date) - <any>new Date(a.Date);
      });
    
       this.respone.forEach((item: any) => {
        item.timestamp = moment(item.timestamp, 'M/D/YYYY, h:mm:ss A').format('YYYY/MM/DD');
      });
    
      this.filteredData = this.respone;
      this.isLoadingOne = false;
    });
  }

  generateExcelFile() {
    let data: any[] = [];
    let genarateObj: any = {};
  
    if (this.filteredData) {
      this.filteredData.map((item: any) => {
        genarateObj.Id = item.id;
        genarateObj.Mobile_number = item.mobile_number;
        genarateObj.Reply_text = item.reply_text;
        genarateObj.Timestamp = moment(item.timestamp).format("YYYY/MM/DD HH:mm:ss");
        data.push(genarateObj);
        genarateObj = {};
      });
    }
  
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "response-1");
  
    XLSX.writeFile(wb, `response.xlsx`);
  }
  
  movetotrash(){
    const reqObj = {
       params : 1,
    } 
    this.reportService.movetotrash(reqObj).subscribe((res : any) =>{
      console.log(res);
      window.location.reload();

    })
  }

  
  filterDataDatewise() {
    console.log(this.reportForm.value.date_range);
    this.PageIndex = 1;
    this.filteredData = this.respone.filter((item: any) =>
      new Date(item.timestamp) >= new Date(this.reportForm.value.date_range[0]) &&
      new Date(item.timestamp) <= new Date(this.reportForm.value.date_range[1])
    );
    console.log(this.filteredData);
    this.generateTotalReport(this.filteredData);
  }
  generateTotalReport(data : any){
    data.map((item: any) => {
       this.AllReport.Id = item.id,
       this.AllReport.Mobile_number = item.mobile_number,
       this.AllReport.Reply_text =  item.reply_text,
       this.AllReport.timestamp = item.timestamp
     
    });
  }
}

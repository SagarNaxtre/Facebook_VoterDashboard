import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
respone : any
checked = false;
loading = false;
indeterminate = false;
listOfData:  readonly any[] = [];
listOfCurrentPageData: readonly any[] = [];
setOfCheckedId = new Set<number>();
 
  constructor(private reportService: ReportService, private formBuilder: FormBuilder){

  }
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
  onCurrentPageDataChange(listOfCurrentPageData: readonly any[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    console.log(requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }

  generateExcelFile() {
    let data: any[] = [];
    let genarateObj: any = {};
  
    if (this.respone) {
      this.respone.map((item: any) => {
        genarateObj.Id = item.id;
        genarateObj.Mobile_number = item.mobile_number;
        genarateObj.Reply_text = item.reply_text;
        genarateObj.Timestamp = moment(item.timestamp1).format("DD/MM/YY HH:mm:ss");
  
        data.push(genarateObj);
        genarateObj = {};
      });
    }
  
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "response-1");
  
    XLSX.writeFile(wb, `response.xlsx`);
  }
  
}

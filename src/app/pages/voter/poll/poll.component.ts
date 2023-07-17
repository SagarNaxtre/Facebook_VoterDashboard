import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { PollService } from 'src/app/services/poll.service';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';


 @Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  pollForm : FormGroup;
  csvRecords: any[] = [];
  header = true;
  isLoadingOne = false;
 constructor(private pollService: PollService , private fb: FormBuilder, private ngxCsvParser: NgxCsvParser){
  this.pollForm = fb.group({
    id : ['']
  })
 }
  ngOnInit(): void {
    
  }

  async fileChangeListener($event: any) {
    const files = await $event.srcElement.files;
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: any) => {
        this.csvRecords = result;
        console.log(this.csvRecords)

      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

  uloadCsvFileData() {
    this.isLoadingOne = true
    this.csvRecords.map((item: any) => {
      item.dtmf = item.dtmf || "";
      item.Agent_No = item.Agent_No|| "";
      item.Call_Start_Time = item.Call_Start_Time || "";
      item.Call_End_Time = item.Call_End_Time || "";
      item.Call_Status1 = item.Call_Status1 || "";
      item.CALLREASON = item.CALLREASON || "";

    })

    // this.MultiRecorduploadService.uploadMultiRecordRawData(this.csvRecords).subscribe((res: any) => {
    //   console.log(res)
    //   this.isLoadingOne = false
    //   this.message.info(`${res?.message}`)
    //   Swal.fire({
    //     icon: "success",
    //     text: `${res?.message}`
    //   })
    // }, (err) => {
    //   console.log(err);
    //   this.isLoadingOne = false
    //   Swal.fire({
    //     icon: "error",
    //     text: "Failed to Upload"
    //   })
    // })
  }
}

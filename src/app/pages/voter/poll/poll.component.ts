import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PollService } from 'src/app/services/poll.service';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import * as XLSX from "xlsx";
import Swal from 'sweetalert2';


@Component({ selector: 'app-poll', templateUrl: './poll.component.html', styleUrls: ['./poll.component.scss'] })
export class PollComponent implements OnInit {

  pollForm: FormGroup;
  csvRecords: any[] = [];
  arrayofnumber : any[] = [];
  header = true;
  isLoadingOne = false;
  arrayBuffer : any;
  data : any;
  constructor(private pollService: PollService, private fb: FormBuilder, private ngxCsvParser: NgxCsvParser) {
    this.pollForm = fb.group({ 
      templateName: [''],
      fileupload : ''
     })
  }
  ngOnInit(): void {}

    async fileChangeListener($event: any) {
    this.csvRecords = []
    console.log($event.target.files[0])
    if ($event.target.files[0].type == 'text/csv') {
      const files = await $event.srcElement.files;
      this.ngxCsvParser.parse(files[0], {
        header: this.header,
        delimiter: ','
      }).pipe().subscribe((result: any) => {
        this.csvRecords = result;
        console.log(this.csvRecords)

      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
    } else {
      const file = $event.target.files[0];

      let fileReader = new FileReader();
      fileReader.onload = e => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);

        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        this.csvRecords = XLSX.utils.sheet_to_json(worksheet, { raw: true })
      };
      fileReader.readAsArrayBuffer(file);
    }
  }

  uloadCsvFileData() {
    this.isLoadingOne = true;
    this.csvRecords.map((item: any) => {
       const mobileNumber = item.Mobile_number;
       this.arrayofnumber.push(mobileNumber);
    });
    this.isLoadingOne = false;
      console.log( this.arrayofnumber);
  }

  sendmessage(){
    const reqObj = {
      "messaging_product": "whatsapp",
      "to": this.arrayofnumber,
      "templateName": this.pollForm.value.templateName,
      "languageCode": "en"
    }
    this.pollService.message(reqObj).subscribe((res : any) => {
      this.data = res.data;
      Swal.fire({
        icon: "success",
        text: "Successfully Send Message"
      })
     }, (err) => {
      console.log(err);
      this.isLoadingOne = false
      Swal.fire({
        icon: "error",
        text: "Failed to Send Message"
      })
    })
    this.pollForm.patchValue({
      templateName : '',
      fileupload : ''
    })

  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-admin-files',
  templateUrl: './admin-files.component.html',
  styleUrls: ['./admin-files.component.scss']
})
export class AdminFilesComponent implements OnInit {
  public dataLoaded: boolean = false;


  displayedColumns: string[] = ['fileName', 'download'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  fetchedData: any; // Define a property to hold fetched data
  // selectedDate: string = '';
  adminId: number = 0;

  constructor(private route: ActivatedRoute, private service: ServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Get adminId from route parameters
      this.adminId = Number(params['id']);
      // const currentDate = new Date();
      // this.selectedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd')!;
      // Fetch data on component initialization
      this.adminFilesDownload(this.adminId);
    });
  }

  adminFilesDownload(adminId: number): void {
    // Assuming you have a property to hold the selected date
    // Replace this.selectedDate with your actual property holding the selected date
    this.service.adminFilesDownload(adminId).subscribe(
      (data) => {
        // if (data.status === 'success') {
        //   if (data.files.length > 0) {
        // Assuming data.files is an array of file paths
        this.dataSource = new MatTableDataSource(data.files);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataLoaded = true;
        //   } else {
        //     this.toastr.error('No data available for the selected date.');
        //     this.dataLoaded = false;
        //   }
        // } else {
        //   console.error('Error retrieving files:', data.message);
        //   this.toastr.error('Error retrieving files: ' + data.message);
        //   this.dataLoaded = false;
        // }
      },
      (error) => {
        console.error(error);
        // this.toastr.error('No data available for the selected date.');
        this.dataLoaded = false;
      }
    );
  }

  // Handle date selection
  // onDateSelected(event: MatDatepickerInputEvent<Date>): void {
  //   const selectedDate = event.value;
  //   if (selectedDate) {
  //     // Format the selected date as needed ("yyyy/MM/dd")
  //     this.selectedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd')!;
  //     // Fetch data based on the selected date
  //     this.fetchData(this.adminId);
  //   }
  // }

  downloadFile(url: string, fileName: string) {
    this.service.downloadFile(url, fileName).subscribe((response: any) => {
      const blob = new Blob([response], { type: response.type });
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = fileName; // use the passed fileName as the download name
      downloadLink.click();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/shared/service.service';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-katran-images',
  templateUrl: './katran-images.component.html',
  styleUrls: ['./katran-images.component.scss']
})

export class KatranImagesComponent implements OnInit {
  paperCuttingForm!: FormGroup;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);
  dataLoaded = false;
  adminType = localStorage.getItem('adminType');

  constructor(private fb: FormBuilder, private service: ServiceService, private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.paperCuttingForm = this.fb.group({
      k_paper: [''],
      k_date: [''],
      k_important: [false] // Add important filter to the form
    });
    this.allKatranData();

    const state = history.state;
    if (state && state.newpaperCuttingData) {
      this.addNewKatranData(state.newpaperCuttingData);
    }

    if (this.adminType === 'Admin') {
      this.displayedColumns = ['id', 'date', 'paper', 'otherpapername', 'label', 'images', 'newslink', 'medialink', 'mediafile', 'important'];
    } else {
      this.displayedColumns = ['id', 'date', 'paper', 'otherpapername', 'label', 'images', 'newslink', 'medialink', 'mediafile', 'important', 'action'];
    }
  }

  addNewKatranData(newpaperCuttingData: any) {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource<any>([newpaperCuttingData]);
    } else {
      this.dataSource.data = [...this.dataSource.data, newpaperCuttingData];
    }
  }

  allKatranData() {
    this.service.getAllKatrans().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.dataSource = new MatTableDataSource<any>(res.all_katran);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChange(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterByPaper() {
    const selectedPaper = this.paperCuttingForm.get('k_paper')?.value || '';

    if (selectedPaper) {
      // Clear existing data in the table before making the API call
      this.dataSource = new MatTableDataSource<any>([]);
      this.dataLoaded = false;

      this.service.getKatranImagesByPaper(selectedPaper).subscribe(
        data => {
          // Check if data and data.data are defined and are arrays
          if (data && Array.isArray(data.data) && data.data.length > 0) {
            // Display the data if available
            this.dataLoaded = true;
            this.dataSource = new MatTableDataSource<any>(data.data);
          } else {
            // No data found case
            this.dataLoaded = true; // Set to true to show the empty table
            this.dataSource = new MatTableDataSource<any>([]); // Clear table data
          }
        },
        error => {
          // Handle API error
          this.dataLoaded = true;
          this.dataSource = new MatTableDataSource<any>([]); // Clear table data
          this.toastr.error('An error occurred while fetching the data.', 'Error');
        }
      );
    }
  }

  filterByDate() {
    const selectedDate = this.paperCuttingForm.get('k_date')?.value || '';

    if (selectedDate) {
      const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd') || '';
      this.service.getKatranImagesByDate(formattedDate).subscribe(
        data => {
          if (data && data.filtered_katran.length > 0) {
            this.dataLoaded = true;
            this.dataSource = new MatTableDataSource<any>(data.filtered_katran);
          } else {
            this.dataLoaded = false;
            this.dataSource = new MatTableDataSource<any>([]);
            this.toastr.error('No data found for the selected date.', 'Error');
          }
        },
        error => {
          this.dataLoaded = false;
          this.toastr.error('An error occurred while fetching the data.', 'Error');
        }
      );
    }
  }

  filterByImportant() {
    const isImportant = this.paperCuttingForm.get('k_important')?.value;
    if (isImportant) {
      const filteredData = this.dataSource.data.filter(item => item.k_important === 1);
      this.dataSource = new MatTableDataSource<any>(filteredData);
    } else {
      // Re-fetch the full data if "Show Important Only" is unchecked
      this.allKatranData();
    }
  }

  deleteKatran(k_id: number): void {
    this.service.deleteKatran(k_id).subscribe({
      next: () => {
        // Filter the data array within MatTableDataSource
        this.dataSource.data = this.dataSource.data.filter((item: any) => item.k_id !== k_id);
        this.toastr.success('Newspaper Data Deleted Successfully!', 'Success');
      },
      error: (err) => {
        this.toastr.error('Failed to delete the newspaper data. Please try again.');
        console.error(err);
      }
    });
  }
}
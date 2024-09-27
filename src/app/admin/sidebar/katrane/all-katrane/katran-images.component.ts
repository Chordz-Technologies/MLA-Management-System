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
  displayedColumns: string[] = ['id', 'date', 'paper', 'otherpapername', 'label', 'images', 'newslink', 'medialink', 'mediafile', 'important'];
  dataSource = new MatTableDataSource<any>([]);
  dataLoaded = false;

  constructor(private fb: FormBuilder, private service: ServiceService, private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.paperCuttingForm = this.fb.group({
      k_paper: [''],
      k_date: ['']
    });
    this.allKatranData();

    const state = history.state;
    if (state && state.newpaperCuttingData) {
      this.addNewKatranData(state.newpaperCuttingData);
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
      this.service.getKatranImagesByPaper(selectedPaper).subscribe(
        data => {
          if (data && data.data.length > 0) {
            this.dataLoaded = true;
            this.dataSource = new MatTableDataSource<any>(data.data);
          } else {
            this.dataLoaded = false;
            this.dataSource = new MatTableDataSource<any>([]);
            this.toastr.error('No data found for the selected newspaper.', 'Error');
          }
        },
        error => {
          this.dataLoaded = false;
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
}
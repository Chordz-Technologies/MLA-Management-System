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
  displayedColumns: string[] = ['id', 'date', 'paper', 'images'];
  dataSource = new MatTableDataSource([]);
  dataLoaded = false;

  constructor(private fb: FormBuilder, private service: ServiceService, private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.paperCuttingForm = this.fb.group({
      k_paper: [''],
      k_date: ['']
    });
    this.allKatranData();
  }

  allKatranData() {
    this.service.getAllKatrans().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.dataSource = new MatTableDataSource(res.all_katran);
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
            this.dataSource = new MatTableDataSource(data.data);
          } else {
            this.dataLoaded = false;
            this.dataSource = new MatTableDataSource([]);
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
            this.dataSource = new MatTableDataSource(data.filtered_katran);
          } else {
            this.dataLoaded = false;
            this.dataSource = new MatTableDataSource([]);
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

  // filterData() {
  //   const selectedPaper = this.paperCuttingForm.get('k_paper')?.value || '';
  //   const selectedDate = this.paperCuttingForm.get('k_date')?.value || '';

  //   if (selectedPaper && !selectedDate) {
  //     this.service.getKatranImagesByPaper(selectedPaper).subscribe(data => {
  //       this.dataLoaded = true;
  //       this.dataSource = new MatTableDataSource(data.data);
  //     });
  //   } else if (selectedDate && !selectedPaper) {
  //     const formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd') || '';
  //     this.service.getKatranImagesByDate(formattedDate).subscribe(data => {
  //       this.dataLoaded = true;
  //       this.dataSource = new MatTableDataSource(data.filtered_katran);
  //     });
  //   }
  // }
}
// export class KatranImagesComponent implements OnInit {
//   katranImages: any[] = [];
//   filteredImages: any[] = [];
//   paperCuttingForm: FormGroup;

//   constructor(private service: ServiceService, private fb: FormBuilder) {
//     this.paperCuttingForm = this.fb.group({
//       k_paper: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.getAllKatranImages();

//     // Subscribe to value changes for filtering
//     this.paperCuttingForm.get('k_paper')?.valueChanges.subscribe(value => {
//       this.onPaperSelect(value);
//     });
//   }

//   getAllKatranImages(): void {
//     this.service.getAllKatranImages().subscribe(response => {
//       if (response.status === 'success') {
//         this.katranImages = response.all_katran_images;
//         this.filteredImages = this.katranImages.filter((image: any) => image.k_image); // Filter out null images
//       }
//     });
//   }

//   onPaperSelect(paper: string): void {
//     if (paper) {
//       this.service.getKatranImagesByPaper(paper.toLowerCase()).subscribe(response => {
//         if (response.status === 'success') {
//           this.filteredImages = response.data.filter((image: any) => image.k_image); // Filter out null images
//         }
//       });
//     } else {
//       // Reset to show all images
//       this.filteredImages = this.katranImages.filter((image: any) => image.k_image); // Filter out null images
//     }
//   }
// }

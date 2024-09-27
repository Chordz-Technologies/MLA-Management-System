import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-aavak-javak-images',
  templateUrl: './aavak-javak-images.component.html',
  styleUrls: ['./aavak-javak-images.component.scss']
})
export class AavakJavakImagesComponent implements OnInit {
  public dataLoaded: boolean = false;
  displayedColumns: string[] = ['id', 'inward', 'inward_label', 'outward', 'outward_label', 'date', 'photos'];
  dataSource!: MatTableDataSource<any>;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.allAavakJavakData();

    const state = history.state;
    if (state && state.newaavakjavakData) {
      this.newaavakjavakData(state.newaavakjavakData);
    }
  }

  newaavakjavakData(newaavakjavakData: any) {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource([newaavakjavakData]);
    } else {
      this.dataSource.data = [...this.dataSource.data, newaavakjavakData];
    }
  }

  allAavakJavakData() {
    this.service.getAllAavakJavakImages().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.dataSource = new MatTableDataSource(res.all_avakjavak);
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

  downloadInwardReport() {
    this.service.getInwardExcelReport().subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'Inward Report.xlsx';  // Set the desired file name
      link.click();
    });
  }

  downloadOutwardReport() {
    this.service.getOutwardExcelReport().subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'Outward Report.xlsx';  // Set the desired file name
      link.click();
    });
  }
}

// aavakJavakImages!: string[];

// constructor(private service: ServiceService) { }

// ngOnInit(): void {
//   this.getAavakJavakImages();
// }

// getAavakJavakImages() {
//   this.service.getAllAavakJavakImages()
//     .subscribe(response => {
//       if (response.status === 'success') {
//         this.aavakJavakImages = response.all_avakjavak_images.map((image: any) => image.a_photos).filter((image: any) => image); // Filter out null images
//       }
//     });
// }


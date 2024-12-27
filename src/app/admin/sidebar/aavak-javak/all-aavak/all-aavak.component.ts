import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-all-aavak',
  templateUrl: './all-aavak.component.html',
  styleUrls: ['./all-aavak.component.scss']
})
export class AllAavakComponent implements OnInit {
  public dataLoaded: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'contactno', 'subject', 'date', 'photos', 'comment'];
  dataSource!: MatTableDataSource<any>;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.allAavakData();

    const state = history.state;
    if (state && state.newaavakData) {
      this.newaavakData(state.newaavakData);
    }
  }

  newaavakData(newaavakData: any) {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource([newaavakData]);
    } else {
      this.dataSource.data = [...this.dataSource.data, newaavakData];
    }
  }

  allAavakData() {
    this.service.getAllAavak().subscribe({
      next: (res: any) => {
        this.dataLoaded = true;
        this.dataSource = new MatTableDataSource(res.all_avak);
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
      link.download = 'आवक रिपोर्ट.xlsx';  // Set the desired file name
      link.click();
    });
  }
}


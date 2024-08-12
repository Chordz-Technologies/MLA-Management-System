import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-katran-images',
  templateUrl: './katran-images.component.html',
  styleUrls: ['./katran-images.component.scss']
})
export class KatranImagesComponent implements OnInit {
  katranImages: any[] = [];
  filteredImages: any[] = [];
  paperCuttingForm: FormGroup;

  constructor(private service: ServiceService, private fb: FormBuilder) {
    this.paperCuttingForm = this.fb.group({
      k_paper: ['']
    });
  }

  ngOnInit(): void {
    this.getAllKatranImages();

    // Subscribe to value changes for filtering
    this.paperCuttingForm.get('k_paper')?.valueChanges.subscribe(value => {
      this.onPaperSelect(value);
    });
  }

  getAllKatranImages(): void {
    this.service.getAllKatranImages().subscribe(response => {
      if (response.status === 'success') {
        this.katranImages = response.all_katran_images;
        this.filteredImages = this.katranImages.filter((image: any) => image.k_image); // Filter out null images
      }
    });
  }

  onPaperSelect(paper: string): void {
    if (paper) {
      this.service.getKatranImagesByPaper(paper.toLowerCase()).subscribe(response => {
        if (response.status === 'success') {
          this.filteredImages = response.data.filter((image: any) => image.k_image); // Filter out null images
        }
      });
    } else {
      // Reset to show all images
      this.filteredImages = this.katranImages.filter((image: any) => image.k_image); // Filter out null images
    }
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  constructor(
    private gifsService: GifsService
  ) {}

  // Usamos el decorador ViewChild para seleccionar un elemento html de la vista ocupando su referencia local
  @ViewChild('searchInput')
  public searchInput!: ElementRef<HTMLInputElement>;

  searchTag(): void {
    const value = this.searchInput.nativeElement.value;
    
    //Add new tag to records and makes a search
    this.gifsService.searchTag(value);
    
    //Clean input
    this.searchInput.nativeElement.value = ''; 
  }
}

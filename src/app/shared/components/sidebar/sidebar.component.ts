import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'app-shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(
    private gifsService: GifsService
  ) {}

  get gifsRecords(): string[] {
    return this.gifsService.tagsRecord;
  }

  searchTag(query: string): void {
    this.gifsService.searchTag(query);
  }

  clearAll() {
    this.gifsService.clearRecords();
  }
}

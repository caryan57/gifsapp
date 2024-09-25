import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string;

  public loaded: boolean = false;

  ngOnInit(): void {
    if(!this.url) throw new Error('Image url property is required.');
  }

  //Method tha activates when images has loaded
  isLoaded(): void {
    this.loaded = true;    
  }
}

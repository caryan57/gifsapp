import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'app-gifs-list-card',
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.css'
})
export class ListCardComponent implements OnInit {
  
  @Input()
  public gif!: Gif;

  // OnInit: A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {
    if(!this.gif) throw new Error('Error, gif is required');
  }
}

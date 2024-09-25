import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { HomePageComponent } from './pages/home/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ListComponent } from './components/list/list.component';
import { ListCardComponent } from './components/list-card/list-card.component';



@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    ListComponent,
    ListCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class GifsModule { }
